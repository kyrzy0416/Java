import torch
import torch.nn as nn
import torch.utils.data
from torchvision import transforms, datasets
import json
import os
from tqdm import tqdm
import torch.optim as optim
from model import efficientnetv2_s

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print("using {} device.".format(device))

img_size = {"s": [300, 384],  # train_size, val_size
            "m": [384, 480],
            "l": [384, 480]}
num_model = "s"

data_transform = {
    "train": transforms.Compose([transforms.RandomResizedCrop(img_size[num_model][0]),
                                 transforms.RandomHorizontalFlip(),
                                 transforms.ToTensor(),
                                 transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])]),
    "val": transforms.Compose([transforms.Resize(img_size[num_model][1]),
                               transforms.CenterCrop(img_size[num_model][1]),
                               transforms.ToTensor(),
                               transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])}

# find data
data_root = os.path.abspath(os.path.join(os.getcwd(), '../'))
image_path = os.path.join(data_root, "datasets", "flower_data")
train_dataset = datasets.ImageFolder(root=image_path + '/train',
                                     transform=data_transform['train'])
train_num = len(train_dataset)
# save data to json
flower_data = train_dataset.class_to_idx
cla_dict = dict((val, key) for key, val in flower_data.items())
json_str = json.dumps(cla_dict, indent=4)
with open('class_indices.json', 'w') as json_file:
    json_file.write(json_str)

# load data
batch_size = 16
# windows
train_loader = torch.utils.data.DataLoader(train_dataset,
                                           batch_size=batch_size,
                                           pin_memory=True,
                                           shuffle=True,
                                           num_workers=0)

validate_dataset = datasets.ImageFolder(root=image_path + '/val',
                                        transform=data_transform['val'])
val_num = len(validate_dataset)
validate_loader = torch.utils.data.DataLoader(validate_dataset,
                                              batch_size=batch_size,
                                              pin_memory=True,
                                              shuffle=False,
                                              num_workers=0)
# Linux
# nw = min([os.cpu_count(), batch_size if batch_size > 1 else 0, 8])  # number of workers
# print('Using {} dataloader workers every process'.format(nw))
#
# train_loader = torch.utils.data.DataLoader(train_dataset,
#                                            batch_size=batch_size, shuffle=True,
#                                            num_workers=nw)
#
# validate_dataset = datasets.ImageFolder(root=os.path.join(image_path, "val"),
#                                         transform=data_transform["val"])
# val_num = len(validate_dataset)
# validate_loader = torch.utils.data.DataLoader(validate_dataset,
#                                               batch_size=batch_size, shuffle=False,
#                                               num_workers=nw)

print("using {} images for training, {} images for validation.".format(train_num, val_num))

# ------------------------------------------迁移学习------------------------------------------
net = efficientnetv2_s(num_classes=5)  # 实例化后有1000个节点
model_weight_path = "./pre_efficientnetv2-s.pth"
if os.path.exists(model_weight_path):
    weights_dict = torch.load(model_weight_path, map_location=device)
    load_weights_dict = {k: v for k, v in weights_dict.items() if net.state_dict()[k].numel() == v.numel()}
    print(net.load_state_dict(load_weights_dict, strict=False))
else:
    raise FileNotFoundError("not found weights file: {}".format(model_weight_path))
# 冻结权重
for name, para in net.named_parameters():
    # 除最后的全连接层外，其他权重全部冻结
    if "classifier" not in name:
        para.requires_grad_(False)
net.to(device)

# loss
loss_function = nn.CrossEntropyLoss()

# optimizer
params = [p for p in net.parameters() if p.requires_grad]
optimizer = optim.SGD(params, lr=0.01, momentum=0.9, weight_decay=4E-5)

# train
epochs = 30
best_acc = 0.0
save_path = './EfficientNet_v2_s.pth'
train_steps = len(train_loader)
for epoch in range(epochs):
    # train mode
    net.train()
    running_loss = 0.0
    train_bar = tqdm(train_loader)
    for step, data in enumerate(train_bar):
        images, labels = data
        optimizer.zero_grad()
        outputs = net(images.to(device))
        loss = loss_function(outputs, labels.to(device))
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

        train_bar.desc = 'train epoch[{}/{}] loss:{:.3f}'.format(epoch + 1, epochs, loss)

    # validate mode
    net.eval()
    acc = 0.0
    with torch.no_grad():
        val_bar = tqdm(validate_loader)
        for val_data in val_bar:
            val_images, val_labels = val_data
            outputs = net(val_images.to(device))
            predict_y = torch.max(outputs, dim=1)[1]
            acc += torch.eq(predict_y, val_labels.to(device)).sum().item()

    val_accurate = acc / val_num

    print('[epoch %d] train_loss: %.3f  val_accuracy: %.3f' %
          (epoch + 1, running_loss / train_steps, val_accurate))

    if val_accurate > best_acc:
        best_acc = val_accurate
        torch.save(net.state_dict(), save_path)

print('Finished Training')