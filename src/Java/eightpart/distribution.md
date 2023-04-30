---

order: 8
author: zhiyu1998
title: 分布式
category:
  - 分布式
  - 八股文
---

## 🔗 分布式

### 理论基础

#### CAP理论

CAP 理论/定理起源于 2000年，由加州大学伯克利分校的Eric Brewer教授在分布式计算原理研讨会（PODC）上提出，因此 CAP定理又被称作 **布鲁尔定理（Brewer’s theorem）**

2年后，麻省理工学院的Seth Gilbert和Nancy Lynch 发表了布鲁尔猜想的证明，CAP理论正式成为分布式领域的定理。

##### 简介

**CAP** 也就是 **Consistency（一致性）**、**Availability（可用性）**、**Partition Tolerance（分区容错性）** 这三个单词首字母组合。

![image-20220726125103940](./personal_images/image-20220726125103940.png)

CAP 理论的提出者布鲁尔在提出 CAP 猜想的时候，并没有详细定义 **Consistency**、**Availability**、**Partition Tolerance** 三个单词的明确定义。

因此，对于 CAP 的民间解读有很多，一般比较被大家推荐的是下面 👇 这种版本的解读。

在理论计算机科学中，CAP 定理（CAP theorem）指出对于一个分布式系统来说，当设计读写操作时，只能同时满足以下三点中的两个：

- **一致性（Consistency）** : 所有节点访问同一份最新的数据副本
- **可用性（Availability）**: 非故障的节点在合理的时间内返回合理的响应（不是错误或者超时的响应）。
- **分区容错性（Partition tolerance）** : 分布式系统出现网络分区的时候，仍然能够对外提供服务。

##### 网络分区

> 分布式系统中，多个节点之前的网络本来是连通的，但是因为某些故障（比如部分节点网络出了问题）某些节点之间不连通了，整个网络就分成了几块区域，这就叫网络分区。

![image-20220726132654526](./personal_images/image-20220726132654526.png)

##### 不是所谓的“3 选 2”

大部分人解释这一定律时，常常简单的表述为：“一致性、可用性、分区容忍性三者你只能同时达到其中两个，不可能同时达到”。实际上这是一个非常具有误导性质的说法，而且在 CAP 理论诞生 12 年之后，CAP 之父也在 2012 年重写了之前的论文。

> **当发生网络分区的时候，如果我们要继续服务，那么强一致性和可用性只能 2 选 1。也就是说当网络分区之后 P 是前提，决定了 P 之后才有 C 和 A 的选择。也就是说分区容错性（Partition tolerance）我们是必须要实现的。**
>
> 简而言之就是：CAP 理论中分区容错性 P 是一定要满足的，在此基础上，只能满足可用性 A 或者一致性 C。

因此，**分布式系统理论上不可能选择 CA 架构，只能选择 CP 或者 AP 架构。** 比如 ZooKeeper、HBase 就是 CP 架构，Cassandra、Eureka 就是 AP 架构，Nacos 不仅支持 CP 架构也支持 AP 架构。

**为啥不可能选择 CA 架构呢？** 举个例子：若系统出现“分区”，系统中的某个节点在进行写操作。为了保证 C， 必须要禁止其他节点的读写操作，这就和 A 发生冲突了。如果为了保证 A，其他节点的读写操作正常的话，那就和 C 发生冲突了。

**选择 CP 还是 AP 的关键在于当前的业务场景，没有定论，比如对于需要确保强一致性的场景如银行一般会选择保证 CP 。**

另外，需要补充说明的一点是： **如果网络分区正常的话（系统在绝大部分时候所处的状态），也就说不需要保证 P 的时候，C 和 A 能够同时保证。**

##### CAP 实际应用案例

我这里以注册中心来探讨一下 CAP 的实际应用。考虑到很多小伙伴不知道注册中心是干嘛的，这里简单以 Dubbo 为例说一说。

下图是 Dubbo 的架构图。**注册中心 Registry 在其中扮演了什么角色呢？提供了什么服务呢？**

注册中心负责服务地址的注册与查找，相当于目录服务，服务提供者和消费者只在启动时与注册中心交互，注册中心不转发请求，压力较小。

![image-20220726132721865](./personal_images/image-20220726132721865.png)

常见的可以作为注册中心的组件有：ZooKeeper、Eureka、Nacos...。

1. **ZooKeeper 保证的是 CP。** 任何时刻对 ZooKeeper 的读请求都能得到一致性的结果，但是， ZooKeeper 不保证每次请求的可用性比如在 Leader 选举过程中或者半数以上的机器不可用的时候服务就是不可用的。
2. **Eureka 保证的则是 AP。** Eureka 在设计的时候就是优先保证 A （可用性）。在 Eureka 中不存在什么 Leader 节点，每个节点都是一样的、平等的。因此  Eureka 不会像 ZooKeeper 那样出现选举过程中或者半数以上的机器不可用的时候服务就是不可用的情况。 Eureka  保证即使大部分节点挂掉也不会影响正常提供服务，只要有一个节点是可用的就行了。只不过这个节点上的数据可能并不是最新的。
3. **Nacos 不仅支持 CP 也支持 AP。**



#### Base理论

[BASE 理论](https://dl.acm.org/doi/10.1145/1394127.1394128)起源于 2008 年， 由eBay的架构师Dan Pritchett在ACM上发表。

##### 简介

**BASE** 是 **Basically Available（基本可用）** 、**Soft-state（软状态）** 和 **Eventually Consistent（最终一致性）** 三个短语的缩写。BASE 理论是对 CAP 中一致性 C 和可用性 A 权衡的结果，其来源于对大规模互联网系统分布式实践的总结，是基于 CAP 定理逐步演化而来的，它大大降低了我们对系统的要求。

##### BASE 理论的核心思想

即使无法做到强一致性，但每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。

> 也就是牺牲数据的一致性来满足系统的高可用性，系统中一部分数据不可用或者不一致时，仍需要保持系统整体“主要可用”。

**BASE 理论本质上是对 CAP 的延伸和补充，更具体地说，是对 CAP 中 AP 方案的一个补充。**

**为什么这样说呢？**

CAP 理论这节我们也说过了：

> 如果系统没有发生“分区”的话，节点间的网络连接通信正常的话，也就不存在 P 了。这个时候，我们就可以同时保证 C 和 A 了。因此，**如果系统发生“分区”，我们要考虑选择 CP 还是 AP。如果系统没有发生“分区”的话，我们要思考如何保证 CA 。**

因此，AP 方案只是在系统发生分区的时候放弃一致性，而不是永远放弃一致性。在分区故障恢复后，系统应该达到最终一致性。这一点其实就是 BASE 理论延伸的地方。

##### BASE 理论三要素

![image-20220726133418075](./personal_images/image-20220726133418075.png)

##### 基本可用

基本可用是指分布式系统在出现不可预知故障的时候，允许损失部分可用性。但是，这绝不等价于系统不可用。

**什么叫允许损失部分可用性呢？**

- **响应时间上的损失**: 正常情况下，处理用户请求需要 0.5s 返回结果，但是由于系统出现故障，处理用户请求的时间变为 3 s。
- **系统功能上的损失**：正常情况下，用户可以使用系统的全部功能，但是由于系统访问量突然剧增，系统的部分非核心功能无法使用。

##### 软状态

软状态指允许系统中的数据存在中间状态（**CAP 理论中的数据不一致**），并认为该中间状态的存在不会影响系统的整体可用性，即允许系统在不同节点的数据副本之间进行数据同步的过程存在延时。

##### 最终一致性

最终一致性强调的是系统中所有的数据副本，在经过一段时间的同步后，最终能够达到一个一致的状态。因此，最终一致性的本质是需要系统保证最终数据能够达到一致，而不需要实时保证系统数据的强一致性。

> 分布式一致性的 3 种级别：
>
> 1. **强一致性** ：系统写入了什么，读出来的就是什么。
> 2. **弱一致性** ：不一定可以读取到最新写入的值，也不保证多少时间之后读取到的数据是最新的，只是会尽量保证某个时刻达到数据一致的状态。
> 3. **最终一致性** ：弱一致性的升级版，系统会保证在一定时间内达到数据一致的状态。
>
> **业界比较推崇是最终一致性级别，但是某些对数据一致要求十分严格的场景比如银行转账还是要保证强一致性。**

那实现最终一致性的具体方式是什么呢? [《分布式协议与算法实战》](http://gk.link/a/10rZM)中是这样介绍：

> - **读时修复** : 在读取数据时，检测数据的不一致，进行修复。比如 Cassandra 的 Read Repair 实现，具体来说，在向 Cassandra 系统查询数据的时候，如果检测到不同节点 的副本数据不一致，系统就自动修复数据。
> - **写时修复** : 在写入数据，检测数据的不一致时，进行修复。比如 Cassandra 的 Hinted Handoff 实现。具体来说，Cassandra 集群的节点之间远程写数据的时候，如果写失败 就将数据缓存下来，然后定时重传，修复数据的不一致性。
> - **异步修复** : 这个是最常用的方式，通过定时对账检测副本数据的一致性，并修复。

比较推荐 **写时修复**，这种方式对性能消耗比较低。

#### Paxos 算法

Paxos 算法是 Leslie Lamport（[莱斯利·兰伯特](https://zh.wikipedia.org/wiki/莱斯利·兰伯特)）在 **1990** 年提出了一种分布式系统 **共识** 算法。这也是第一个被证明完备的共识算法（前提是不存在拜占庭将军问题，也就是没有恶意节点）。

为了介绍 Paxos 算法，兰伯特专门写了一篇幽默风趣的论文。在这篇论文中，他虚拟了一个叫做 Paxos 的希腊城邦来更形象化地介绍 Paxos 算法。

不过，审稿人并不认可这篇论文的幽默。于是，他们就给兰伯特说：“如果你想要成功发表这篇论文的话，必须删除所有 Paxos 相关的故事背景”。兰伯特一听就不开心了：“我凭什么修改啊，你们这些审稿人就是缺乏幽默细胞，发不了就不发了呗！”。

于是乎，提出 Paxos 算法的那篇论文在当时并没有被成功发表。

直到 1998 年，系统研究中心 (Systems Research  Center，SRC）的两个技术研究员需要找一些合适的分布式算法来服务他们正在构建的分布式系统，Paxos  算法刚好可以解决他们的部分需求。因此，兰伯特就把论文发给了他们。在看了论文之后，这俩大佬觉得论文还是挺不错的。于是，兰伯特在 **1998** 年重新发表论文 [《The Part-Time Parliament》](http://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)。

论文发表之后，各路学者直呼看不懂，言语中还略显调侃之意。这谁忍得了，在 **2001** 年的时候，兰伯特专门又写了一篇 [《Paxos Made Simple》](http://lamport.azurewebsites.net/pubs/paxos-simple.pdf)的论文来简化对 Paxos 的介绍，主要讲述两阶段共识协议部分，顺便还不忘嘲讽一下这群学者。

《Paxos Made Simple》这篇论文就 14 页，相比于 《The Part-Time Parliament》的33 页精简了不少。最关键的是这篇论文的摘要就一句话：

> The Paxos algorithm, when presented in plain English, is very simple.

翻译过来的意思大概就是：当我用无修饰的英文来描述时，Paxos 算法真心简单！

有没有感觉到来自兰伯特大佬满满地嘲讽的味道？

兰伯特当时提出的 Paxos 算法主要包含 2 个部分:

- **Basic Paxos 算法** ： 描述的是多节点之间如何就某个值(提案 Value)达成共识。
- **Multi-Paxos 思想** ： 描述的是执行多个 Basic Paxos 实例，就一系列值达成共识。Multi-Paxos 说白了就是执行多次 Basic Paxos ，核心还是 Basic Paxos 。

由于 Paxos 算法在国际上被公认的非常难以理解和实现，因此不断有人尝试简化这一算法。到了2013 年才诞生了一个比 Paxos 算法更易理解和实现的共识算法—[Raft 算法](https://javaguide.cn/distributed-system/theorem&algorithm&protocol/raft-algorithm.html) 。更具体点来说，Raft 是Multi-Paxos的一个变种，其简化了 Multi-Paxos 的思想，变得更容易被理解以及工程实现。

针对没有恶意节点的情况，除了 Raft 算法之外，当前最常用的一些共识算法比如 ZAB 协议、 Fast Paxos 算法都是基于 Paxos 算法改进的。

针对存在恶意节点的情况，一般使用的是工作量证明（POW，Proof-of-Work）、权益证明（PoS，Proof-of-Stake ）等共识算法。这类共识算法最典型的应用就是区块链，就比如说前段时间以太坊官方宣布其共识机制正在从工作量证明(PoW)转变为权益证明(PoS)。

区块链系统使用的共识算法需要解决的核心问题是 **拜占庭将军问题** ，这和我们日常接触到的 ZooKeeper、Etcd、Consul 等分布式中间件不太一样。

下面我们来对 Paxos 算法的定义做一个总结：

- Paxos 算法是兰伯特在 **1990** 年提出了一种分布式系统共识算法。
- 兰伯特当时提出的 Paxos 算法主要包含 2 个部分:Basic Paxos 算法和Multi-Paxos 思想。
- Raft 算法、ZAB 协议、 Fast Paxos 算法都是基于 Paxos 算法改进而来。

##### 一致性（Consistency）与共识（Consensus）

很多人会误把 Paxos 看作是一致性算法，这其实是一个非常大的误区。

⚠️注意：**Paxos 不是一致性算法而是共识算法，一致性和共识并不是一个概念。**

##### Basic Paxos 算法

Basic Paxos 中存在 3 个重要的角色：

1. **提议者（Proposer）**：也可以叫做协调者（coordinator），提议者负责接受客户端发起的提议，然后尝试让接受者接受该提议，同时保证即使多个提议者的提议之间产生了冲突，那么算法都能进行下去；
2. **接受者（Acceptor）**：也可以叫做投票员（voter），负责对提议者的提议投票，同时需要记住自己的投票历史；
3. **学习者（Learner）**：如果有超过半数接受者就某个提议达成了共识，那么学习者就需要接受这个提议，并就该提议作出运算，然后将运算结果返回给客户端。

![image-20220726133642419](./personal_images/image-20220726133642419.png)

##### Multi Paxos 思想

因为兰伯特提到的 Multi-Paxos 思想，缺少代码实现的必要细节(比如怎么选举领导者)，所以在理解上比较难。

⚠️**注意** ： Multi-Paxos 只是一种思想，这种思想的核心就是通过多个 Basic Paxos 实例就一系列值达成共识。

二阶段提交是达成共识常用的方式，Basic Paxos 就是通过二阶段提交的方式来达成共识。Basic Paxos 还支持容错，少于一般的节点出现故障时，集群也能正常工作。

#### Raft 算法

当今的数据中心和应用程序在高度动态的环境中运行，为了应对高度动态的环境，它们通过额外的服务器进行横向扩展，并且根据需求进行扩展和收缩。同时，服务器和网络故障也很常见。

因此，系统必须在正常操作期间处理服务器的上下线。它们必须对变故做出反应并在几秒钟内自动适应；对客户来说的话，明显的中断通常是不可接受的。

幸运的是，分布式共识可以帮助应对这些挑战。

##### 拜占庭将军

在介绍共识算法之前，先介绍一个简化版拜占庭将军的例子来帮助理解共识算法。

> 假设多位拜占庭将军中没有叛军，信使的信息可靠但有可能被暗杀的情况下，将军们如何达成是否要进攻的一致性决定？

解决方案大致可以理解成：先在所有的将军中选出一个大将军，用来做出所有的决定。

举例如下：假如现在一共有 3 个将军 A，B 和  C，每个将军都有一个随机时间的倒计时器，倒计时一结束，这个将军就把自己当成大将军候选人，然后派信使传递选举投票的信息给将军 B 和 C，如果将军 B 和 C 还没有把自己当作候选人（自己的倒计时还没有结束），并且没有把选举票投给其他人，它们就会把票投给将军 A，信使回到将军 A 时，将军 A 知道自己收到了足够的票数，成为大将军。在有了大将军之后，是否需要进攻就由大将军 A  决定，然后再去派信使通知另外两个将军，自己已经成为了大将军。如果一段时间还没收到将军 B 和 C  的回复（信使可能会被暗杀），那就再重派一个信使，直到收到回复。



##### 共识算法

共识是可容错系统中的一个基本问题：即使面对故障，服务器也可以在共享状态上达成一致。

共识算法允许一组节点像一个整体一样一起工作，即使其中的一些节点出现故障也能够继续工作下去，其正确性主要是源于复制状态机的性质：一组`Server`的状态机计算相同状态的副本，即使有一部分的`Server`宕机了它们仍然能够继续运行。

![image-20220726134912102](./personal_images/image-20220726134912102.png)

一般通过使用复制日志来实现复制状态机。每个`Server`存储着一份包括命令序列的日志文件，状态机会按顺序执行这些命令。因为每个日志包含相同的命令，并且顺序也相同，所以每个状态机处理相同的命令序列。由于状态机是确定性的，所以处理相同的状态，得到相同的输出。

因此共识算法的工作就是保持复制日志的一致性。服务器上的共识模块从客户端接收命令并将它们添加到日志中。它与其他服务器上的共识模块通信，以确保即使某些服务器发生故障。每个日志最终包含相同顺序的请求。一旦命令被正确地复制，它们就被称为已提交。每个服务器的状态机按照日志顺序处理已提交的命令，并将输出返回给客户端，因此，这些服务器形成了一个单一的、高度可靠的状态机。

适用于实际系统的共识算法通常具有以下特性：

- 安全。确保在非拜占庭条件（也就是上文中提到的简易版拜占庭）下的安全性，包括网络延迟、分区、包丢失、复制和重新排序。
- 高可用。只要大多数服务器都是可操作的，并且可以相互通信，也可以与客户端进行通信，那么这些服务器就可以看作完全功能可用的。因此，一个典型的由五台服务器组成的集群可以容忍任何两台服务器端故障。假设服务器因停止而发生故障；它们稍后可能会从稳定存储上的状态中恢复并重新加入集群。
- 一致性不依赖时序。错误的时钟和极端的消息延迟，在最坏的情况下也只会造成可用性问题，而不会产生一致性问题。
- 在集群中大多数服务器响应，命令就可以完成，不会被少数运行缓慢的服务器来影响整体系统性能。

##### 节点类型

一个 Raft 集群包括若干服务器，以典型的 5 服务器集群举例。在任意的时间，每个服务器一定会处于以下三个状态中的一个：

- `Leader`：负责发起心跳，响应客户端，创建日志，同步日志。
- `Candidate`：Leader 选举过程中的临时角色，由 Follower 转化而来，发起投票参与竞选。
- `Follower`：接受 Leader 的心跳和日志同步数据，投票给 Candidate。

在正常的情况下，只有一个服务器是 Leader，剩下的服务器是 Follower。Follower 是被动的，它们不会发送任何请求，只是响应来自 Leader 和 Candidate 的请求。

![image-20220726134943719](./personal_images/image-20220726134943719.png)

##### 任期

![image-20220726134951395](./personal_images/image-20220726134951395.png)

如图 3 所示，raft 算法将时间划分为任意长度的任期（term），任期用连续的数字表示，看作当前 term  号。每一个任期的开始都是一次选举，在选举开始时，一个或多个 Candidate 会尝试成为 Leader。如果一个 Candidate  赢得了选举，它就会在该任期内担任 Leader。如果没有选出 Leader，将会开启另一个任期，并立刻开始下一次选举。raft  算法保证在给定的一个任期最少要有一个 Leader。

每个节点都会存储当前的 term 号，当服务器之间进行通信时会交换当前的  term 号；如果有服务器发现自己的 term 号比其他人小，那么他会更新到较大的 term 值。如果一个 Candidate 或者  Leader 发现自己的 term 过期了，他会立即退回成 Follower。如果一台服务器收到的请求的 term  号是过期的，那么它会拒绝此次请求。

##### 日志

- `entry`：每一个事件成为 entry，只有 Leader 可以创建 entry。entry 的内容为`<term,index,cmd>`其中 cmd 是可以应用到状态机的操作。
- `log`：由 entry 构成的数组，每一个 entry 都有一个表明自己在 log 中的 index。只有 Leader 才可以改变其他节点的  log。entry 总是先被 Leader 添加到自己的 log 数组中，然后再发起共识请求，获得同意后才会被 Leader  提交给状态机。Follower 只能从 Leader 获取新日志和当前的 commitIndex，然后把对应的 entry  应用到自己的状态机中。

##### 领导人选举

raft 使用心跳机制来触发 Leader 的选举。

如果一台服务器能够收到来自 Leader 或者 Candidate 的有效信息，那么它会一直保持为 Follower 状态，并且刷新自己的 electionElapsed，重新计时。

Leader 会向所有的 Follower 周期性发送心跳来保证自己的 Leader 地位。如果一个 Follower  在一个周期内没有收到心跳信息，就叫做选举超时，然后它就会认为此时没有可用的 Leader，并且开始进行一次选举以选出一个新的 Leader。

为了开始新的选举，Follower 会自增自己的 term 号并且转换状态为 Candidate。然后他会向所有节点发起 RequestVoteRPC 请求， Candidate 的状态会持续到以下情况发生：

- 赢得选举
- 其他节点赢得选举
- 一轮选举结束，无人胜出

赢得选举的条件是：一个 Candidate 在一个任期内收到了来自集群内的多数选票`（N/2+1）`，就可以成为 Leader。

在 Candidate 等待选票的时候，它可能收到其他节点声明自己是 Leader 的心跳，此时有两种情况：

- 该 Leader 的 term 号大于等于自己的 term 号，说明对方已经成为 Leader，则自己回退为 Follower。
- 该 Leader 的 term 号小于自己的 term 号，那么会拒绝该请求并让该节点更新 term。

由于可能同一时刻出现多个 Candidate，导致没有 Candidate 获得大多数选票，如果没有其他手段来重新分配选票的话，那么可能会无限重复下去。

raft 使用了随机的选举超时时间来避免上述情况。每一个 Candidate 在发起选举后，都会随机化一个新的枚举超时时间，这种机制使得各个服务器能够分散开来，在大多数情况下只有一个服务器会率先超时；它会在其他服务器超时之前赢得选举。

##### 日志复制

一旦选出了 Leader，它就开始接受客户端的请求。每一个客户端的请求都包含一条需要被复制状态机（`Replicated State Mechine`）执行的命令。

Leader 收到客户端请求后，会生成一个 entry，包含`<index,term,cmd>`，再将这个 entry 添加到自己的日志末尾后，向所有的节点广播该 entry，要求其他服务器复制这条 entry。

如果 Follower 接受该 entry，则会将 entry 添加到自己的日志后面，同时返回给 Leader 同意。

如果 Leader 收到了多数的成功响应，Leader 会将这个 entry 应用到自己的状态机中，之后可以成为这个 entry 是 committed 的，并且向客户端返回执行结果。

raft 保证以下两个性质：

- 在两个日志里，有两个 entry 拥有相同的 index 和 term，那么它们一定有相同的 cmd
- 在两个日志里，有两个 entry 拥有相同的 index 和 term，那么它们前面的 entry 也一定相同

通过“仅有 Leader 可以生存 entry”来保证第一个性质，第二个性质需要一致性检查来进行保证。

一般情况下，Leader 和 Follower 的日志保持一致，然后，Leader 的崩溃会导致日志不一样，这样一致性检查会产生失败。Leader 通过强制  Follower 复制自己的日志来处理日志的不一致。这就意味着，在 Follower 上的冲突日志会被领导者的日志覆盖。

为了使得 Follower 的日志和自己的日志一致，Leader 需要找到 Follower 与它日志一致的地方，然后删除 Follower 在该位置之后的日志，接着把这之后的日志发送给 Follower。

`Leader` 给每一个`Follower` 维护了一个 `nextIndex`，它表示 `Leader` 将要发送给该追随者的下一条日志条目的索引。当一个 `Leader` 开始掌权时，它会将 `nextIndex` 初始化为它的最新的日志条目索引数+1。如果一个 `Follower` 的日志和 `Leader` 的不一致，`AppendEntries` 一致性检查会在下一次 `AppendEntries RPC` 时返回失败。在失败之后，`Leader` 会将 `nextIndex` 递减然后重试 `AppendEntries RPC`。最终 `nextIndex` 会达到一个 `Leader` 和 `Follower` 日志一致的地方。这时，`AppendEntries` 会返回成功，`Follower` 中冲突的日志条目都被移除了，并且添加所缺少的上了 `Leader` 的日志条目。一旦 `AppendEntries` 返回成功，`Follower` 和 `Leader` 的日志就一致了，这样的状态会保持到该任期结束。

##### 选举限制

Leader 需要保证自己存储全部已经提交的日志条目。这样才可以使日志条目只有一个流向：从 Leader 流向 Follower，Leader 永远不会覆盖已经存在的日志条目。

每个 Candidate 发送 RequestVoteRPC 时，都会带上最后一个 entry 的信息。所有节点收到投票信息时，会对该 entry 进行比较，如果发现自己的更新，则拒绝投票给该 Candidate。

判断日志新旧的方式：如果两个日志的 term 不同，term 大的更新；如果 term 相同，更长的 index 更新。

##### 节点崩溃

如果 Leader 崩溃，集群中的节点在 electionTimeout 时间内没有收到 Leader 的心跳信息就会触发新一轮的选主，在选主期间整个集群对外是不可用的。

如果 Follower 和 Candidate 崩溃，处理方式会简单很多。之后发送给它的 RequestVoteRPC 和  AppendEntriesRPC 会失败。由于 raft  的所有请求都是幂等的，所以失败的话会无限的重试。如果崩溃恢复后，就可以收到新的请求，然后选择追加或者拒绝 entry。

##### 时间与可用性

raft 的要求之一就是安全性不依赖于时间：系统不能仅仅因为一些事件发生的比预想的快一些或者慢一些就产生错误。为了保证上述要求，最好能满足以下的时间条件：

```
broadcastTime << electionTimeout << MTBF
```

- `broadcastTime`：向其他节点并发发送消息的平均响应时间；
- `electionTimeout`：选举超时时间；
- `MTBF(mean time between failures)`：单台机器的平均健康时间；

`broadcastTime`应该比`electionTimeout`小一个数量级，为的是使`Leader`能够持续发送心跳信息（heartbeat）来阻止`Follower`开始选举；

`electionTimeout`也要比`MTBF`小几个数量级，为的是使得系统稳定运行。当`Leader`崩溃时，大约会在整个`electionTimeout`的时间内不可用；我们希望这种情况仅占全部时间的很小一部分。

由于`broadcastTime`和`MTBF`是由系统决定的属性，因此需要决定`electionTimeout`的时间。

一般来说，broadcastTime 一般为 `0.5～20ms`，electionTimeout 可以设置为 `10～500ms`，MTBF 一般为一两个月。



### 了解RPC吗？

一言蔽之：**RPC （Remote Procedure Call）的出现就是为了让你调用远程方法像调用本地方法一样简单。**

为了能够帮助小伙伴们理解 RPC 原理，我们可以将整个 RPC的 核心功能看作是下面👇 6 个部分实现的：

1. **客户端（服务消费端）** ：调用远程方法的一端。
2. **客户端 Stub（桩）** ： 这其实就是一代理类。代理类主要做的事情很简单，就是把你调用方法、类、方法参数等信息传递到服务端。
3. **网络传输** ： 网络传输就是你要把你调用的方法的信息比如说参数啊这些东西传输到服务端，然后服务端执行完之后再把返回结果通过网络传输给你传输回来。网络传输的实现方式有很多种比如最近基本的 Socket或者性能以及封装更加优秀的 Netty（推荐）。
4. **服务端 Stub（桩）** ：这个桩就不是代理类了。我觉得理解为桩实际不太好，大家注意一下就好。这里的服务端 Stub 实际指的就是接收到客户端执行方法的请求后，去指定对应的方法然后返回结果给客户端的类。
5. **服务端（服务提供端）** ：提供远程方法的一端。

具体原理图如下，后面我会串起来将整个RPC的过程给大家说一下。

![image-20220609151233412](./personal_images/image-20220609151233412.png)

1. 服务消费端（client）以本地调用的方式调用远程服务；
2. 客户端 Stub（client stub） 接收到调用后负责将方法、参数等组装成能够进行网络传输的消息体（序列化）：`RpcRequest`；
3. 客户端 Stub（client stub） 找到远程服务的地址，并将消息发送到服务提供端；
4. 服务端 Stub（桩）收到消息将消息反序列化为Java对象: `RpcRequest`；
5. 服务端 Stub（桩）根据 `RpcRequest`中的类、方法、方法参数等信息调用本地的方法；
6. 服务端 Stub（桩）得到方法执行结果并将组装成能够进行网络传输的消息体：`RpcResponse`（序列化）发送至消费方；
7. 客户端 Stub（client stub）接收到消息并将消息反序列化为Java对象:`RpcResponse` ，这样也就得到了最终结果。over!

相信小伙伴们看完上面的讲解之后，已经了解了 RPC 的原理。

虽然篇幅不多，但是基本把 RPC 框架的核心原理讲清楚了！另外，对于上面的技术细节，我会在后面的章节介绍到。

**最后，对于 RPC 的原理，希望小伙伴不单单要理解，还要能够自己画出来并且能够给别人讲出来。因为，在面试中这个问题在面试官问到 RPC 相关内容的时候基本都会碰到。**



### 有哪些常见的 RPC 框架？

我们这里说的 RPC 框架指的是可以让客户端直接调用服务端方法，就像调用本地方法一样简单的框架，比如我下面介绍的  Dubbo、Motan、gRPC这些。 如果需要和 HTTP 协议打交道，解析和封装 HTTP 请求和响应。这类框架并不能算是“RPC  框架”，比如Feign

#### Dubbo

![image-20220723235648648](./personal_images/image-20220723235648648.png)

Apache Dubbo 是一款微服务框架，为大规模微服务实践提供高性能 RPC 通信、流量治理、可观测性等解决方案， 涵盖 Java、Golang 等多种语言 SDK 实现。

Dubbo 提供了从服务定义、服务发现、服务通信到流量管控等几乎所有的服务治理能力，支持 Triple 协议（基于 HTTP/2 之上定义的下一代 RPC 通信协议）、应用级服务发现、Dubbo Mesh （Dubbo3 赋予了很多云原生友好的新特性）等特性。

![image-20220723235657177](./personal_images/image-20220723235657177.png)

Dubbo 是由阿里开源，后来加入了 Apache 。正式由于 Dubbo 的出现，才使得越来越多的公司开始使用以及接受分布式架构。

Dubbo 算的是比较优秀的国产开源项目了，它的源码也是非常值得学习和阅读的！

- Github ：https://github.com/apache/incubator-dubbo
- 官网：https://dubbo.apache.org/zh/



#### Motan

Motan 是新浪微博开源的一款 RPC 框架，据说在新浪微博正支撑着千亿次调用。不过笔者倒是很少看到有公司使用，而且网上的资料也比较少。

很多人喜欢拿 Motan 和 Dubbo 作比较，毕竟都是国内大公司开源的。笔者在查阅了很多资料，以及简单查看了其源码之后发现：**Motan 更像是一个精简版的 Dubbo，可能是借鉴了 Dubbo 的思想，Motan 的设计更加精简，功能更加纯粹。**

不过，我不推荐你在实际项目中使用 Motan。如果你要是公司实际使用的话，还是推荐 Dubbo ，其社区活跃度以及生态都要好很多。

- 从 Motan 看 RPC 框架设计：http://kriszhang.com/motan-rpc-impl/
- Motan 中文文档：https://github.com/weibocom/motan/wiki/zh_overview



#### gRPC

![image-20220723235737977](./personal_images/image-20220723235737977.png)

gRPC 是 Google 开源的一个高性能、通用的开源 RPC 框架。其由主要面向移动应用开发并基于 HTTP/2 协议标准而设计（支持双向流、消息头压缩等功能，更加节省带宽），基于 ProtoBuf 序列化协议开发，并且支持众多开发语言。

**何谓 ProtoBuf？** [ProtoBuf（ Protocol Buffer）](https://github.com/protocolbuffers/protobuf)

 是一种更加灵活、高效的数据格式，可用于通讯协议、数据存储等领域，基本支持所有主流编程语言且与平台无关。不过，通过 ProtoBuf 定义接口和数据类型还挺繁琐的，这是一个小问题。

![image-20220723235747598](./personal_images/image-20220723235747598.png)

不得不说，gRPC 的通信层的设计还是非常优秀的，[Dubbo-go 3.0](https://dubbogo.github.io/)

 的通信层改进主要借鉴了 gRPC。

不过，gRPC 的设计导致其几乎没有服务治理能力。如果你想要解决这个问题的话，就需要依赖其他组件比如腾讯的 PolarisMesh（北极星）了。

- Github：https://github.com/grpc/grpc
- 官网：https://grpc.io/



#### Thrift

Apache Thrift 是 Facebook 开源的跨语言的 RPC 通信框架，目前已经捐献给 Apache  基金会管理，由于其跨语言特性和出色的性能，在很多互联网公司得到应用，有能力的公司甚至会基于 thrift  研发一套分布式服务框架，增加诸如服务注册、服务发现等功能。

`Thrift`支持多种不同的**编程语言**，包括`C++`、`Java`、`Python`、`PHP`、`Ruby`等（相比于 gRPC 支持的语言更多 ）。

- 官网：https://thrift.apache.org/
- Thrift 简单介绍：https://www.jianshu.com/p/8f25d057a5a9



#### 总结

gRPC 和 Thrift 虽然支持跨语言的 RPC 调用，但是它们只提供了最基本的 RPC 框架功能，缺乏一系列配套的服务化组件和服务治理功能的支撑。

Dubbo 不论是从功能完善程度、生态系统还是社区活跃度来说都是最优秀的。而且，Dubbo在国内有很多成功的案例比如当当网、滴滴等等，是一款经得起生产考验的成熟稳定的 RPC 框架。最重要的是你还能找到非常多的 Dubbo 参考资料，学习成本相对也较低。

下图展示了 Dubbo 的生态系统。

![image-20220723235849004](./personal_images/image-20220723235849004.png)

Dubbo 也是 Spring Cloud Alibaba 里面的一个组件。

![image-20220723235856647](./personal_images/image-20220723235856647.png)

但是，Dubbo 和 Motan 主要是给 Java 语言使用。虽然，Dubbo 和 Motan 目前也能兼容部分语言，但是不太推荐。如果需要跨多种语言调用的话，可以考虑使用 gRPC。

综上，如果是 Java 后端技术栈，并且你在纠结选择哪一种 RPC 框架的话，我推荐你考虑一下 Dubbo



### 了解分布式事务吗？

我接触和了解到的分布式事务大概分为：

- 2pc（两段式提交）
- 3pc（三段式提交）
- TCC（Try、Confirm、Cancel）
- 最大努力通知
- 消息事务
- 本地消息表（ebay研发出的）
- 半消息/最终一致性（RocketMQ）

这里我就介绍下最简单的**2pc（两段式）**，以及大家以后可能比较常用的**半消息事务**也就是**最终一致性**，目的是让大家理解下分布式事务里面**消息中间件的作用**，别的事务都大同小异，都有很多优点。

当然也都有**种种弊端**：

例如**长时间锁定数据库资源**，导致系统的**响应不快**，**并发上不去**。

网络抖动出现**脑裂**情况，导致事物参与者，不能很好地执行协调者的指令，导致**数据不一致**。

**单点故障**：例如事物协调者，在某一时刻宕机，虽然可以通过选举机制产生新的Leader，但是这过程中，必然出现问题，而TCC，只有强悍的技术团队，才能支持开发，**成本太高**。

不多BB了，我们开始介绍这个两个事物吧。

#### ✔️2pc（两段式提交） 

![image-20220617144013552](./personal_images/image-20220617144013552.png)

**2pc（两段式提交）**可以说是分布式事务的最开始的样子了，像极了**媒婆**，就是通过消息中间件协调多个系统，在两个系统操作事务的时候都锁定资源但是不提交事务，等两者都准备好了，告诉消息中间件，然后再分别提交事务。

**但是我不知道大家看到问题所在没有？**

是的你可能已经发现了，如果A系统事务提交成功了，但是B系统在提交的时候网络波动或者各种原因提交失败了，其实还是会失败的。



#### ✔️3PC

3PC 的出现是为了解决 2PC 的一些问题，相比于 2PC 它在**参与者中也引入了超时机制**，并且**新增了一个阶段**使得参与者可以利用这一个阶段统一各自的状态。

让我们来详细看一下。

3PC 包含了三个阶段，分别是**准备阶段、预提交阶段和提交阶段**，对应的英文就是：`CanCommit、PreCommit 和 DoCommit`。

看起来是**把 2PC 的提交阶段变成了预提交阶段和提交阶段**，但是 3PC 的准备阶段协调者只是询问参与者的自身状况，比如你现在还好吗？负载重不重？这类的。

而预提交阶段就是和 2PC 的准备阶段一样，除了事务的提交该做的都做了。

提交阶段和 2PC 的一样，让我们来看一下图。

![image-20220725145659669](./personal_images/image-20220725145659669.png)

不管哪一个阶段有参与者返回失败都会宣布事务失败，这和 2PC 是一样的（当然到最后的提交阶段和 2PC 一样只要是提交请求就只能不断重试）。

我们先来看一下 3PC 的阶段变更有什么影响。

首先**准备阶段的变更成不会直接执行事务**，而是会先去询问此时的参与者是否有条件接这个事务，因此**不会一来就干活直接锁资源**，使得在某些资源不可用的情况下所有参与者都阻塞着。

而**预提交阶段的引入起到了一个统一状态的作用**，它像一道栅栏，表明在预提交阶段前所有参与者其实还未都回应，在预处理阶段表明所有参与者都已经回应了。

假如你是一位参与者，你知道自己进入了预提交状态那你就可以推断出来其他参与者也都进入了预提交状态。

但是多引入一个阶段也多一个交互，因此**性能会差一些**，而且**绝大部分的情况下资源应该都是可用的**，这样等于每次明知可用执行还得询问一次。

我们再来看下参与者超时能带来什么样的影响。

我们知道 2PC 是同步阻塞的，上面我们已经分析了协调者挂在了提交请求还未发出去的时候是最伤的，所有参与者都已经锁定资源并且阻塞等待着。

那么引入了超时机制，参与者就不会傻等了，**如果是等待提交命令超时，那么参与者就会提交事务了**，因为都到了这一阶段了大概率是提交的，**如果是等待预提交命令超时，那该干啥就干啥了，反正本来啥也没干**。

然而超时机制也会带来数据不一致的问题，比如在等待提交命令时候超时了，参与者默认执行的是提交事务操作，但是**有可能执行的是回滚操作，这样一来数据就不一致了**。

当然 3PC 协调者超时还是在的，具体不分析了和 2PC 是一样的。

从维基百科上看，3PC 的引入是为了解决提交阶段 2PC 协调者和某参与者都挂了之后新选举的协调者不知道当前应该提交还是回滚的问题。

新协调者来的时候发现有一个参与者处于预提交或者提交阶段，那么表明已经经过了所有参与者的确认了，所以此时执行的就是提交命令。

所以说 3PC 就是通过引入预提交阶段来使得参与者之间的状态得到统一，也就是留了一个阶段让大家同步一下。

但是这也只能让协调者知道该如果做，但不能保证这样做一定对，这其实和上面 2PC 分析一致，因为挂了的参与者到底有没有执行事务无法断定。

所以说 3PC 通过预提交阶段可以减少故障恢复时候的复杂性，但是不能保证数据一致，除非挂了的那个参与者恢复。

让我们总结一下， 3PC 相对于 2PC 做了一定的改进：引入了参与者超时机制，并且增加了预提交阶段使得故障恢复之后协调者的决策复杂度降低，但整体的交互过程更长了，性能有所下降，并且还是会存在数据不一致问题。

所以 2PC 和 3PC 都不能保证数据100%一致，因此一般都需要有定时扫描补偿机制。

我再说下 3PC 我没有找到具体的实现，所以我认为 3PC 只是纯的理论上的东西，而且可以看到相比于 2PC 它是做了一些努力但是效果甚微，所以只做了解即可。



#### ✔️TCC柔性补偿

1. 启动事务（业务系统）
2. 尝试调不同的服务（接口）
3. 事务具体成功了还是失败了会告诉事务协调器
4. 由事务协调器来调用confirm、cancel

**2PC 和 3PC 都是数据库层面的，而 TCC 是业务层面的分布式事务**，就像我前面说的分布式事务不仅仅包括数据库的操作，还包括发送短信等，这时候 TCC 就派上用场了！

TCC 指的是`Try - Confirm - Cancel`。

- Try 指的是预留，即资源的预留和锁定，**注意是预留**。
- Confirm 指的是确认操作，这一步其实就是真正的执行了。
- Cancel 指的是撤销操作，可以理解为把预留阶段的动作撤销了。

其实从思想上看和 2PC 差不多，都是先试探性的执行，如果都可以那就真正的执行，如果不行就回滚。

比如说一个事务要执行A、B、C三个操作，那么先对三个操作执行预留动作。如果都预留成功了那么就执行确认操作，如果有一个预留失败那就都执行撤销动作。

我们来看下流程，TCC模型还有个事务管理者的角色，用来记录TCC全局事务状态并提交或者回滚事务。

![image-20220913115340867](./personal_images/image-20220913115340867.png)

可以看到流程还是很简单的，难点在于业务上的定义，对于每一个操作你都需要定义三个动作分别对应`Try - Confirm - Cancel`。

因此 **TCC 对业务的侵入较大和业务紧耦合**，需要根据特定的场景和业务逻辑来设计相应的操作。

还有一点要注意，撤销和确认操作的执行可能需要重试，因此还需要保证**操作的幂等**。

相对于 2PC、3PC ，TCC 适用的范围更大，但是开发量也更大，毕竟都在业务上实现，而且有时候你会发现这三个方法还真不好写。不过也因为是在业务上实现的，所以**TCC可以跨数据库、跨不同的业务系统来实现事务**。



#### （了解）最大努力通知

其实我觉得本地消息表也可以算最大努力，事务消息也可以算最大努力。

就本地消息表来说会有后台任务定时去查看未完成的消息，然后去调用对应的服务，当一个消息多次调用都失败的时候可以记录下然后引入人工，或者直接舍弃。这其实算是最大努力了。

事务消息也是一样，当半消息被commit了之后确实就是普通消息了，如果订阅者一直不消费或者消费不了则会一直重试，到最后进入死信队列。其实这也算最大努力。

所以**最大努力通知其实只是表明了一种柔性事务的思想**：我已经尽力我最大的努力想达成事务的最终一致了。

适用于对时间不敏感的业务，例如短信通知。



#### （了解）本地消息表

本地消息表其实就是利用了 **各系统本地的事务**来实现分布式事务。

本地消息表顾名思义就是会有一张存放本地消息的表，一般都是放在数据库中，然后在执行业务的时候 **将业务的执行和将消息放入消息表中的操作放在同一个事务中**，这样就能保证消息放入本地表中业务肯定是执行成功的。

然后再去调用下一个操作，如果下一个操作调用成功了好说，消息表的消息状态可以直接改成已成功。

如果调用失败也没事，会有 **后台任务定时去读取本地消息表**，筛选出还未成功的消息再调用对应的服务，服务更新成功了再变更消息的状态。

这时候有可能消息对应的操作不成功，因此也需要重试，重试就得保证对应服务的方法是幂等的，而且一般重试会有最大次数，超过最大次数可以记录下报警让人工处理。

可以看到本地消息表其实实现的是**最终一致性**，容忍了数据暂时不一致的情况。



#### 消息事务

RocketMQ 就很好的支持了消息事务，让我们来看一下如何通过消息实现事务。

第一步先给 Broker 发送事务消息即半消息，**半消息不是说一半消息，而是这个消息对消费者来说不可见**，然后**发送成功后发送方再执行本地事务**。

再根据**本地事务的结果向 Broker 发送 Commit 或者 RollBack 命令**。

并且 RocketMQ 的发送方会提供一个**反查事务状态接口**，如果一段时间内半消息没有收到任何操作请求，那么 Broker 会通过反查接口得知发送方事务是否执行成功，然后执行 Commit 或者 RollBack 命令。

如果是 Commit 那么订阅方就能收到这条消息，然后再做对应的操作，做完了之后再消费这条消息即可。

如果是 RollBack 那么订阅方收不到这条消息，等于事务就没执行过。

可以看到通过 RocketMQ 还是比较容易实现的，RocketMQ 提供了事务消息的功能，我们只需要定义好事务反查接口即可。

![image-20220725145800448](./personal_images/image-20220725145800448.png)

可以看到消息事务实现的也是最终一致性。



#### 最终一致性

![image-20220617144020576](./personal_images/image-20220617144020576.png)

整个流程中，我们能保证是：

- 业务主动方本地事务提交失败，业务被动方不会收到消息的投递。
- 只要业务主动方本地事务执行成功，那么消息服务一定会投递消息给下游的业务被动方，并最终保证业务被动方一定能成功消费该消息（消费成功或失败，即最终一定会有一个最终态）。

不过呢技术就是这样，**各种极端的情况我们都需要考虑**，也很难有完美的方案，所以才会有这么多的方案**三段式**、**TCC**、**最大努力通知**等等分布式事务方案，大家只需要知道为啥要做，做了有啥好处，有啥坏处，在实际开发的时候都注意下就好好了，**系统都是根据业务场景设计出来的，离开业务的技术没有意义，离开技术的业务没有底气**。

还是那句话：**没有最完美的系统，只有最适合的系统。**



#### 分布式事务比较

* 基于消息事务是强一致性事务（会造成等待），会存在资源浪费
* TCC事务是柔性事务，在try阶段要对资源做预留
* TCC事务在确认或取消阶段释放资源
* 与基于消息事务相比，TCC的时效性要更好



#### 分布式事务注意点

* 不要在分布式事务捕获任何异常
* 使用TCC-Transaction的时候，confirm和cancel的幂等性需要自己代码支持
  * 这就解释了为什么要在confirm和cancel里检查订单状态，而不直接修改为结束状态 ---> 保证幂等性



#### TCC-Transaction框架

![image-20220913170527093](./personal_images/image-20220913170527093.png)



1. 什么时候生成的TRANSACTION_CONTEXT隐式参数
2. 如何判断大事务下有哪些小事务
3. 为什么要有@Compensable注解



### 常见保证幂等的方式

#### 什么是幂等性

幂等是一个数学与计算机学概念，在数学中某一元运算为幂等时，其作用在任一元素两次后会和其作用一次的结果相同。

在计算机中编程中，一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。幂等函数或幂等方法是指可以使用相同参数重复执行，并能获得相同结果的函数。这些函数不会影响系统状态，也不用担心重复执行会对系统造成改变。

#### 什么是接口幂等性

在HTTP/1.1中，对幂等性进行了定义。它描述了一次和多次请求某一个资源对于资源本身应该具有同样的结果（网络超时等问题除外），即第一次请求的时候对资源产生了副作用，但是以后的多次请求都不会再对资源产生副作用。

这里的副作用是不会对结果产生破坏或者产生不可预料的结果。也就是说，其任意多次执行对资源本身所产生的影响均与一次执行的影响相同。

#### 为什么需要实现幂等性

在接口调用时一般情况下都能正常返回信息不会重复提交，不过在遇见以下情况时可以就会出现问题，如：

- **前端重复提交表单：** 在填写一些表格时候，用户填写完成提交，很多时候会因网络波动没有及时对用户做出提交成功响应，致使用户认为没有成功提交，然后一直点提交按钮，这时就会发生重复提交表单请求。
- **用户恶意进行刷单：** 例如在实现用户投票这种功能时，如果用户针对一个用户进行重复提交投票，这样会导致接口接收到用户重复提交的投票信息，这样会使投票结果与事实严重不符。
- **接口超时重复提交：** 很多时候 HTTP 客户端工具都默认开启超时重试的机制，尤其是第三方调用接口时候，为了防止网络波动超时等造成的请求失败，都会添加重试机制，导致一个请求提交多次。
- **消息进行重复消费：** 当使用 MQ 消息中间件时候，如果发生消息中间件出现错误未及时提交消费信息，导致发生重复消费。

使用幂等性最大的优势在于使接口保证任何幂等性操作，免去因重试等造成系统产生的未知的问题。

#### 引入幂等性后对系统的影响

幂等性是为了简化客户端逻辑处理，能放置重复提交等操作，但却增加了服务端的逻辑复杂性和成本，其主要是：

- 把并行执行的功能改为串行执行，降低了执行效率。
- 增加了额外控制幂等的业务逻辑，复杂化了业务功能；

所以在使用时候需要考虑是否引入幂等性的必要性，根据实际业务场景具体分析，除了业务上的特殊要求外，一般情况下不需要引入的接口幂等性。

#### Restful API 接口的幂等性

现在流行的 Restful 推荐的几种 HTTP 接口方法中，分别存在幂等行与不能保证幂等的方法，如下：

- √ 满足幂等

- x 不满足幂等

- \- 可能满足也可能不满足幂等，根据实际业务逻辑有关

  

| 方法类型 | 是否幂等 |                             描述                             |
| :------: | :------: | :----------------------------------------------------------: |
|   Get    |    √     | Get 方法用于获取资源。其一般不会也不应当对系统资源进行改变，所以是幂等的。 |
|   Post   |    ×     | Post 方法一般用于创建新的资源。其每次执行都会新增数据，所以不是幂等的。 |
|   Put    |    -     | Put 方法一般用于修改资源。该操作则分情况来判断是不是满足幂等，更新操作中直接根据某个值进行更新，也能保持幂等。不过执行累加操作的更新是非幂等。 |
|  Delete  |    -     | Delete  方法一般用于删除资源。该操作则分情况来判断是不是满足幂等，当根据唯一值进行删除时，删除同一个数据多次执行效果一样。不过需要注意，带查询条件的删除则就不一定满足幂等了。例如在根据条件删除一批数据后，这时候新增加了一条数据也满足条件，然后又执行了一次删除，那么将会导致新增加的这条满足条件数据也被删除。 |

#### 如何实现幂等性

##### 方案一：数据库唯一主键

**方案描述**

数据库唯一主键的实现主要是利用数据库中主键唯一约束的特性，一般来说唯一主键比较适用于“插入”时的幂等性，其能保证一张表中只能存在一条带该唯一主键的记录。

使用数据库唯一主键完成幂等性时需要注意的是，该主键一般来说并不是使用数据库中自增主键，而是使用分布式 ID 充当主键（可以参考 Java 中分布式 ID 的设计方案 这篇文章），这样才能能保证在分布式环境下 ID 的全局唯一性。

**适用操作：**

- 插入操作
- 删除操作

**使用限制：**

- 需要生成全局唯一主键 ID；

**主要流程：**

![image-20220725150136872](./personal_images/image-20220725150136872.png)

主要流程：

- ① 客户端执行创建请求，调用服务端接口。
- ② 服务端执行业务逻辑，生成一个分布式 ID，将该 ID 充当待插入数据的主键，然后执数据插入操作，运行对应的 SQL 语句。
- ③ 服务端将该条数据插入数据库中，如果插入成功则表示没有重复调用接口。如果抛出主键重复异常，则表示数据库中已经存在该条记录，返回错误信息到客户端。

##### 方案二：数据库乐观锁

**方案描述：**

数据库乐观锁方案一般只能适用于执行“更新操作”的过程，我们可以提前在对应的数据表中多添加一个字段，充当当前数据的版本标识。这样每次对该数据库该表的这条数据执行更新时，都会将该版本标识作为一个条件，值为上次待更新数据中的版本标识的值。

**适用操作：**

- 更新操作

**使用限制：**

- 需要数据库对应业务表中添加额外字段；

**描述示例：**

![image-20220725150153331](./personal_images/image-20220725150153331.png)

例如，存在如下的数据表中：

| id   | name     | price |
| :--- | :------- | :---- |
| 1    | 小米手机 | 1000  |
| 2    | 苹果手机 | 2500  |
| 3    | 华为手机 | 1600  |

为了每次执行更新时防止重复更新，确定更新的一定是要更新的内容，我们通常都会添加一个 version 字段记录当前的记录版本，这样在更新时候将该值带上，那么只要执行更新操作就能确定一定更新的是某个对应版本下的信息。

| id   | name     | price | version |
| :--- | :------- | :---- | :------ |
| 1    | 小米手机 | 1000  | 10      |
| 2    | 苹果手机 | 2500  | 21      |
| 3    | 华为手机 | 1600  | 5       |

这样每次执行更新时候，都要指定要更新的版本号，如下操作就能准确更新 version=5 的信息：

```
UPDATE my_table SET price=price+50,version=version+1 WHERE id=1 AND version=5
```

上面 WHERE 后面跟着条件 id=1 AND version=5 被执行后，id=1 的 version 被更新为 6，所以如果重复执行该条  SQL 语句将不生效，因为 id=1 AND version=5 的数据已经不存在，这样就能保住更新的幂等，多次更新对结果不会产生影响。

##### 方案三：防重 Token 令牌

**方案描述：**

针对客户端连续点击或者调用方的超时重试等情况，例如提交订单，此种操作就可以用  Token 的机制实现防止重复提交。简单的说就是调用方在调用接口的时候先向后端请求一个全局 ID（Token），请求的时候携带这个全局 ID  一起请求（Token 最好将其放到 Headers 中），后端需要对这个 Token 作为 Key，用户信息作为 Value 到 Redis  中进行键值内容校验，如果 Key 存在且 Value 匹配就执行删除命令，然后正常执行后面的业务逻辑。如果不存在对应的 Key 或 Value  不匹配就返回重复执行的错误信息，这样来保证幂等操作。

**适用操作：**

- 插入操作
- 更新操作
- 删除操作

**使用限制：**

- 需要生成全局唯一 Token 串；
- 需要使用第三方组件 Redis 进行数据效验；

**主要流程：**

![image-20220725150246041](./personal_images/image-20220725150246041.png)

- ① 服务端提供获取 Token 的接口，该 Token 可以是一个序列号，也可以是一个分布式 ID 或者 UUID 串。
- ② 客户端调用接口获取 Token，这时候服务端会生成一个 Token 串。
- ③ 然后将该串存入 Redis 数据库中，以该 Token 作为 Redis 的键（注意设置过期时间）。
- ④ 将 Token 返回到客户端，客户端拿到后应存到表单隐藏域中。
- ⑤ 客户端在执行提交表单时，把 Token 存入到 Headers 中，执行业务请求带上该 Headers。
- ⑥ 服务端接收到请求后从 Headers 中拿到 Token，然后根据 Token 到 Redis 中查找该 key 是否存在。
- ⑦ 服务端根据 Redis 中是否存该 key 进行判断，如果存在就将该 key 删除，然后正常执行业务逻辑。如果不存在就抛异常，返回重复提交的错误信息。

> 注意，在并发情况下，执行 Redis 查找数据与删除需要保证原子性，否则很可能在并发下无法保证幂等性。其实现方法可以使用分布式锁或者使用 Lua 表达式来注销查询与删除操作。

##### 方案四:下游传递唯一序列号

**方案描述：**

所谓请求序列号，其实就是每次向服务端请求时候附带一个短时间内唯一不重复的序列号，该序列号可以是一个有序 ID，也可以是一个订单号，一般由下游生成，在调用上游服务端接口时附加该序列号和用于认证的 ID。

当上游服务器收到请求信息后拿取该 序列号 和下游 认证ID 进行组合，形成用于操作 Redis 的 Key，然后到 Redis 中查询是否存在对应的 Key 的键值对，根据其结果：

- 如果存在，就说明已经对该下游的该序列号的请求进行了业务处理，这时可以直接响应重复请求的错误信息。
- 如果不存在，就以该 Key 作为 Redis 的键，以下游关键信息作为存储的值（例如下游商传递的一些业务逻辑信息），将该键值对存储到 Redis 中 ，然后再正常执行对应的业务逻辑即可。

**适用操作：**

- 插入操作
- 更新操作
- 删除操作

**使用限制：**

- 要求第三方传递唯一序列号；
- 需要使用第三方组件 Redis 进行数据效验；

**主要流程：**

![image-20220725150306807](./personal_images/image-20220725150306807.png)

主要步骤：

- ① 下游服务生成分布式 ID 作为序列号，然后执行请求调用上游接口，并附带“唯一序列号”与请求的“认证凭据ID”。
- ② 上游服务进行安全效验，检测下游传递的参数中是否存在“序列号”和“凭据ID”。
- ③ 上游服务到 Redis 中检测是否存在对应的“序列号”与“认证ID”组成的  Key，如果存在就抛出重复执行的异常信息，然后响应下游对应的错误信息。如果不存在就以该“序列号”和“认证ID”组合作为  Key，以下游关键信息作为 Value，进而存储到 Redis 中，然后正常执行接来来的业务逻辑。

> 上面步骤中插入数据到 Redis 一定要设置过期时间。这样能保证在这个时间范围内，如果重复调用接口，则能够进行判断识别。如果不设置过期时间，很可能导致数据无限量的存入 Redis，致使 Redis 不能正常工作。



### 分布式系统接口，如何避免表单的重复提交？

#### 幂等性

**效果：**系统对某接口的多次请求，都应该返回同样的结果！（网络访问失败的场景除外）

**目的：**避免因为各种原因，重复请求导致的业务重复处理

#### 重复请求场景案例

1，客户端第一次请求后，网络异常导致收到请求执行逻辑但是没有返回给客户端，客户端的重新发起请求

2，客户端迅速点击按钮提交，导致同一逻辑被多次发送到服务器

*简单来划分，业务逻辑无非都可以归纳为增删改查！*

**对于查询**，内部不包含其他操作，属于只读性质的那种业务必然符合幂等性要求的。

**对于删除**，重复做删除请求至少不会造成数据杂乱，不过也有些场景更希望重复点击提示的是删除成功，而不是目标不存在的提示。

**对于新增和修改**，这里是今天要重点关注的部分：新增，需要避免重复插入；修改，避免进行无效的重复修改；

#### 幂等性的实现方式

**实现方法：**客户端做某一请求的时候带上识别参数标识，服务端对此标识进行识别，重复请求则重复返回第一次的结果即可。

**举个栗子：**比如添加请求的表单里，在打开添加表单页面的时候，就生成一个AddId标识，这个AddId跟着表单一起提交到后台接口。

后台接口根据这个AddId，服务端就可以进行缓存标记并进行过滤，缓存值可以是AddId作为缓存key，返回内容作为缓存Value，这样即使添加按钮被多次点下也可以识别出来。

这个AddId什么时候更新呢？只有在保存成功并且清空表单之后，才变更这个AddId标识，从而实现新数据的表单提交

### 有几种生成唯一ID的方式？

在复杂分布式系统和庞大数据量的场景下，一般需要对大量数据进行唯一标识。

比如：

- 数据库分库分表后需要用一个唯一ID来标识一条数据。
- nosql中的数据，需要一个唯一ID与其他数据源的数据进行关联

本文对比和总结了常见的几种方式，在座同学可以进行参考。

我在实际项目中经常使用ksuid算法。它简单可靠，还可按时间排序

#### UUID

`UUID （Universally Unique Identifier）`，通用唯一识别码的缩写。UUID是由一组32位数的16进制数字所构成，所以UUID理论上的总数为 `16^32=2^128`，约等于 `3.4 x 10^38`。也就是说若每纳秒产生1兆个UUID，要花100亿年才会将所有UUID用完。

生成的UUID是由 8-4-4-4-12格式的数据组成，其中32个字符和4个连字符' - '，一般我们使用的时候会将连字符删除 uuid.`toString().replaceAll("-","")`。

目前UUID的产生方式有5种版本，每个版本的算法不同，应用范围也不同。

- `基于时间的UUID` - 版本1： 这个一般是通过当前时间，随机数，和本地Mac地址来计算出来，可以通过 org.apache.logging.log4j.core.util包中的 UuidUtil.getTimeBasedUuid()来使用或者其他包中工具。由于使用了MAC地址，因此能够确保唯一性，但是同时也暴露了MAC地址，私密性不够好。
- `DCE安全的UUID` - 版本2 DCE（Distributed Computing Environment）安全的UUID和基于时间的UUID算法相同，但会把时间戳的前4位置换为POSIX的UID或GID。这个版本的UUID在实际中较少用到。
- `基于名字的UUID（MD5）`- 版本3 基于名字的UUID通过计算名字和名字空间的MD5散列值得到。这个版本的UUID保证了：相同名字空间中不同名字生成的UUID的唯一性；不同名字空间中的UUID的唯一性；相同名字空间中相同名字的UUID重复生成是相同的。
- `随机UUID` - 版本4 根据随机数，或者伪随机数生成UUID。这种UUID产生重复的概率是可以计算出来的，但是重复的可能性可以忽略不计，因此该版本也是被经常使用的版本。JDK中使用的就是这个版本。
- `基于名字的UUID（SHA1）` - 版本5 和基于名字的UUID算法类似，只是散列值计算使用SHA1（Secure Hash Algorithm 1）算法。

一般选用V4版本，V1有暴露mac地址的风险，V2特定场景才会用到，V3、V5相同的输入参数得到相同的UUID

优缺点

- 优点：简单可靠
- 缺点：不可排序，不利于检索

#### mysql自增id

适用mysql的自增id机制，满足 递增性、单调性、唯一性。

- 在单机情况下，如果并发量高，mysql的压力会很大。
- 分布式情况下，一般需要设定每台机器初始ID，来避免ID重复。这种方式有局限性，且水平扩展方案复杂，容易 出问题。

优缺点

- 优点：简单可靠，在单机、并发不高、数据量较小的情况下适用
- 缺点：在分库分表、高并发场景下不适用

#### redis

因为Redis是单线程，天生保证原子性，可以使用原子操作INCR和INCRBY来实现

单机和分布式的优缺点与mysql类似

#### snowflake

Snowflake，雪花算法是由Twitter开源的分布式ID生成算法，以划分命名空间的方式将 64-bit位分割成多个部分，每个部分代表不同的含义。而 Java中64bit的整数是Long类型，所以在 Java 中 SnowFlake 算法生成的 ID 就是 long 来存储的。

- **第1位**占用1bit，其值始终是0，可看做是符号位不使用。
- **第2位**开始的41位是时间戳，41-bit位可表示2^41个数，每个数代表毫秒，那么雪花算法可用的时间年限是 `(1L<<41)/(1000L360024*365)`=69 年的时间。
- **中间的10-bit位**可表示机器数，即2^10 = 1024台机器，但是一般情况下我们不会部署这么台机器。如果我们对IDC（互联网数据中心）有需求，还可以将 10-bit 分 5-bit 给 IDC，分5-bit给工作机器。这样就可以表示32个IDC，每个IDC下可以有32台机器，具体的划分可以根据自身需求定义。
- **最后12-bit位**是自增序列，可表示2^12 = 4096个数。

这样的划分之后相当于**在一毫秒一个数据中心的一台机器上可产生4096个有序的不重复的ID**。但是我们 IDC 和机器数肯定不止一个，所以毫秒内能生成的有序ID数是翻倍的。

算法结构

![image-20220709155254210](./personal_images/image-20220709155254210.png)

优势：

- 单机可在一毫秒内生成4096个唯一ID
- 因为最高位是时间戳，所以snowflake生成的ID都是按时间趋势递增
- 因为有 workerId来做区分，所以整个分布式系统内不会产生重复ID

最大的问题：时钟回拨

snowflake非常依赖系统时间的一致性，如果发生系统时间的回调，改变，就可能会发生id的重复

下面是我总结的几种解决方法：

- 简单粗暴，直接抛出错误，让业务层去解决
- 关闭服务器时间同步
- 保存过去一小时，每个毫秒的序号使用情况。如果时间回退到某一毫秒，可以使用这一毫秒的序号，继续生成ID
- 生成ID的时间，不实时跟随服务器时间，当1毫秒内的序号全部用完，才跳到下一毫秒。如果生成ID的并发量不大，就有很大的余量时间没有使用，就算时钟回退了，也是回退到没有被使用的时间。

优缺点

- 优点：生成的ID趋势递增，生成效率高，可保证不重复
- 缺点：时钟回拨问题处理起来复杂，容易出现问题

#### ksuid

算法结构

![image-20220709155341400](./personal_images/image-20220709155341400.png)

ksuid由两部分组成

- **第一部分**

32位的秒级时间戳

- **第二部分**

128 位随机生成载荷

优势：

- 因为最高位是时间戳，所以snowflake生成的ID都是按时间趋势递增
- 而128位的号码空间，在一秒内出现随机碰撞的概率非常之低，1/2^128 约等于明天陨石撞地球的概率
- 没有序号则可以避免snowflake的时钟回拨问题

优缺点

- 优点：生成的ID趋势递增，生成效率高，没有时钟回拨的问题
- 缺点：有随机部分，理论上存在随机碰撞的可能

#### 其他

另外还有：

* 百度-UidGenerator
* 美团Leaf

对比了5种解决方案。在我的业务场景下，我选择简单可靠的ksuid算法来生成唯一ID



### 单点登录

单点登录的英文名叫做：Single Sign On（简称**SSO**）。

在**初学/以前**的时候，一般我们就**单系统**，所有的功能都在同一个系统上。



### Dubbo面试汇总

#### 什么是 Dubbo?

[Apache Dubbo](https://github.com/apache/dubbo)|ˈdʌbəʊ| 是一款高性能、轻量级的开源 Java RPC 框架。

根据 [Dubbo 官方文档](https://dubbo.apache.org/zh/)的介绍，Dubbo 提供了六大核心能力

1. 面向接口代理的高性能RPC调用。
2. 智能容错和负载均衡。
3. 服务自动注册和发现。
4. 高度可扩展能力。
5. 运行期流量调度。
6. 可视化的服务治理与运维。

![image-20220726154002025](./personal_images/image-20220726154002025.png)

简单来说就是： **Dubbo 不光可以帮助我们调用远程服务，还提供了一些其他开箱即用的功能比如智能负载均衡。**



#### Dubbo 的负载均衡策略

在集群负载均衡时，Dubbo 提供了多种均衡策略，默认为 `random` 随机调用。我们还可以自行扩展负载均衡策略（参考Dubbo SPI机制）。

在 Dubbo 中，所有负载均衡实现类均继承自 `AbstractLoadBalance`，该类实现了 `LoadBalance` 接口，并封装了一些公共的逻辑。

```java
public abstract class AbstractLoadBalance implements LoadBalance {

    static int calculateWarmupWeight(int uptime, int warmup, int weight) {
    }

    @Override
    public <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) {
    }

    protected abstract <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation);


    int getWeight(Invoker<?> invoker, Invocation invocation) {

    }
}
```

`AbstractLoadBalance` 的实现类有下面这些：

![image-20220726154345877](./personal_images/image-20220726154345877.png)

官方文档对负载均衡这部分的介绍非常详细，推荐小伙伴们看看，地址：https://dubbo.apache.org/zh/docs/v2.7/dev/source/loadbalance/#m-zhdocsv27devsourceloadbalance

##### RandomLoadBalance

根据权重随机选择（对加权随机算法的实现）。这是Dubbo默认采用的一种负载均衡策略。

` RandomLoadBalance` 具体的实现原理非常简单，假如有两个提供相同服务的服务器 S1,S2，S1的权重为7，S2的权重为3。

我们把这些权重值分布在坐标区间会得到：S1->[0, 7) ，S2->[7, 10)。我们生成[0, 10) 之间的随机数，随机数落到对应的区间，我们就选择对应的服务器来处理请求。

![image-20220726154405163](./personal_images/image-20220726154405163.png)

`RandomLoadBalance` 的源码非常简单，简单花几分钟时间看一下。

> 以下源码来自 Dubbo master 分支上的最新的版本 2.7.9。

```java
public class RandomLoadBalance extends AbstractLoadBalance {

    public static final String NAME = "random";

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {

        int length = invokers.size();
        boolean sameWeight = true;
        int[] weights = new int[length]; 
        int totalWeight = 0;
        // 下面这个for循环的主要作用就是计算所有该服务的提供者的权重之和 totalWeight（），
        // 除此之外，还会检测每个服务提供者的权重是否相同
        for (int i = 0; i < length; i++) {
            int weight = getWeight(invokers.get(i), invocation);
            totalWeight += weight;
            weights[i] = totalWeight;
            if (sameWeight && totalWeight != weight * (i + 1)) {
                sameWeight = false;
            }
        }
        if (totalWeight > 0 && !sameWeight) {
            // 随机生成一个 [0, totalWeight) 区间内的数字
            int offset = ThreadLocalRandom.current().nextInt(totalWeight);
            // 判断会落在哪个服务提供者的区间
            for (int i = 0; i < length; i++) {
                if (offset < weights[i]) {
                    return invokers.get(i);
                }
            }
  
        return invokers.get(ThreadLocalRandom.current().nextInt(length));
    }

}
```



##### LeastActiveLoadBalance

`LeastActiveLoadBalance` 直译过来就是**最小活跃数负载均衡**。

这个名字起得有点不直观，不仔细看官方对活跃数的定义，你压根不知道这玩意是干嘛的。

我这么说吧！初始状态下所有服务提供者的活跃数均为 0（每个服务提供者的中特定方法都对应一个活跃数，我在后面的源码中会提到），每收到一个请求后，对应的服务提供者的活跃数 +1，当这个请求处理完之后，活跃数 -1。

因此，**Dubbo 就认为谁的活跃数越少，谁的处理速度就越快，性能也越好，这样的话，我就优先把请求给活跃数少的服务提供者处理。**

**如果有多个服务提供者的活跃数相等怎么办？**

很简单，那就再走一遍 `RandomLoadBalance` 。

```java
public class LeastActiveLoadBalance extends AbstractLoadBalance {

    public static final String NAME = "leastactive";

    @Override
    protected <T> Invoker<T> doSelect(List<Invoker<T>> invokers, URL url, Invocation invocation) {
        int length = invokers.size();
        int leastActive = -1;
        int leastCount = 0;
        int[] leastIndexes = new int[length];
        int[] weights = new int[length];
        int totalWeight = 0;
        int firstWeight = 0;
        boolean sameWeight = true;
        // 这个 for 循环的主要作用是遍历 invokers 列表，找出活跃数最小的 Invoker
        // 如果有多个 Invoker 具有相同的最小活跃数，还会记录下这些 Invoker 在 invokers 集合中的下标，并累加它们的权重，比较它们的权重值是否相等
        for (int i = 0; i < length; i++) {
            Invoker<T> invoker = invokers.get(i);
            // 获取 invoker 对应的活跃(active)数
            int active = RpcStatus.getStatus(invoker.getUrl(), invocation.getMethodName()).getActive();
            int afterWarmup = getWeight(invoker, invocation);
            weights[i] = afterWarmup;
            if (leastActive == -1 || active < leastActive) {
                leastActive = active;
                leastCount = 1;
                leastIndexes[0] = i;
                totalWeight = afterWarmup;
                firstWeight = afterWarmup;
                sameWeight = true;
            } else if (active == leastActive) {
                leastIndexes[leastCount++] = i;
                totalWeight += afterWarmup;
                if (sameWeight && afterWarmup != firstWeight) {
                    sameWeight = false;
                }
            }
        }
       // 如果只有一个 Invoker 具有最小的活跃数，此时直接返回该 Invoker 即可
        if (leastCount == 1) {
            return invokers.get(leastIndexes[0]);
        }
        // 如果有多个 Invoker 具有相同的最小活跃数，但它们之间的权重不同
        // 这里的处理方式就和  RandomLoadBalance 一致了
        if (!sameWeight && totalWeight > 0) {
            int offsetWeight = ThreadLocalRandom.current().nextInt(totalWeight);
            for (int i = 0; i < leastCount; i++) {
                int leastIndex = leastIndexes[i];
                offsetWeight -= weights[leastIndex];
                if (offsetWeight < 0) {
                    return invokers.get(leastIndex);
                }
            }
        }
        return invokers.get(leastIndexes[ThreadLocalRandom.current().nextInt(leastCount)]);
    }
}
```

活跃数是通过 `RpcStatus` 中的一个 `ConcurrentMap` 保存的，根据 URL 以及服务提供者被调用的方法的名称，我们便可以获取到对应的活跃数。也就是说服务提供者中的每一个方法的活跃数都是互相独立的。

```java
public class RpcStatus {
    
    private static final ConcurrentMap<String, ConcurrentMap<String, RpcStatus>> METHOD_STATISTICS =
            new ConcurrentHashMap<String, ConcurrentMap<String, RpcStatus>>();

   public static RpcStatus getStatus(URL url, String methodName) {
        String uri = url.toIdentityString();
        ConcurrentMap<String, RpcStatus> map = METHOD_STATISTICS.computeIfAbsent(uri, k -> new ConcurrentHashMap<>());
        return map.computeIfAbsent(methodName, k -> new RpcStatus());
    }
    public int getActive() {
        return active.get();
    }

}
```

##### ConsistentHashLoadBalance

`ConsistentHashLoadBalance` 小伙伴们应该也不会陌生，在分库分表、各种集群中就经常使用这个负载均衡策略。

`ConsistentHashLoadBalance` 即**一致性Hash负载均衡策略**。 `ConsistentHashLoadBalance` 中没有权重的概念，具体是哪个服务提供者处理请求是由你的请求的参数决定的，也就是说相同参数的请求总是发到同一个服务提供者。

![image-20220726154509626](./personal_images/image-20220726154509626.png)

另外，Dubbo 为了避免数据倾斜问题（节点不够分散，大量请求落到同一节点），还引入了虚拟节点的概念。通过虚拟节点可以让节点更加分散，有效均衡各个节点的请求量。

![image-20220726154517156](./personal_images/image-20220726154517156.png)

官方有详细的源码分析：https://dubbo.apache.org/zh/docs/v2.7/dev/source/loadbalance/#23-consistenthashloadbalance 。



##### RoundRobinLoadBalance

加权轮询负载均衡。

轮询就是把请求依次分配给每个服务提供者。加权轮询就是在轮询的基础上，让更多的请求落到权重更大的服务提供者上。比如假如有两个提供相同服务的服务器 S1,S2，S1的权重为7，S2的权重为3。

如果我们有 10 次请求，那么 7 次会被 S1处理，3次被 S2处理。

但是，如果是 `RandomLoadBalance` 的话，很可能存在10次请求有9次都被 S1 处理的情况（概率性问题）。

Dubbo 中的 `RoundRobinLoadBalance` 的代码实现被修改重建了好几次，Dubbo-2.6.5 版本的 `RoundRobinLoadBalance` 为平滑加权轮询算法。