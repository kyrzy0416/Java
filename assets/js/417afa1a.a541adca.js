"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1870],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(r),f=a,m=d["".concat(i,".").concat(f)]||d[f]||p[f]||o;return r?n.createElement(m,l(l({ref:t},u),{},{components:r})):n.createElement(m,l({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},16505:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(87462),a=(r(67294),r(3905));const o={},l="\u529b\u6263\u94fe\u8868\u4e13\u9898\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5",c={unversionedId:"Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6",id:"Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6",title:"\u529b\u6263\u94fe\u8868\u4e13\u9898\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5",description:"\u5feb\u6162\u6307\u9488\u627e\u4e2d\u95f4\u4f4d\u7f6e",source:"@site/docs/Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6.md",sourceDirName:"Java/leetcode/src/\u5251\u6307offer",slug:"/Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6",permalink:"/Computer-Science-Learn-Notes/docs/Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6",draft:!1,editUrl:"https://github.com/zhiyu1998/Computer-Science-Learn-Notes/edit/master/docs/Java/leetcode/src/\u5251\u6307offer/\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5\u5408\u96c6.md",tags:[],version:"current",frontMatter:{},sidebar:"sidebars",previous:{title:"\u5251\u6307 Offer 58 - II. \u5de6\u65cb\u8f6c\u5b57\u7b26\u4e32",permalink:"/Computer-Science-Learn-Notes/docs/Java/leetcode/src/\u5251\u6307offer/II \u5de6\u65cb\u8f6c\u5b57\u7b26\u4e32"},next:{title:"\u5de5\u4f5c\u4e2d\u9047\u5230\u7684\u95ee\u9898\u53ca\u89e3\u51b3\u65b9\u6848",permalink:"/Computer-Science-Learn-Notes/docs/others/personal_tech"}},i={},s=[{value:"\u5feb\u6162\u6307\u9488\u627e\u4e2d\u95f4\u4f4d\u7f6e",id:"\u5feb\u6162\u6307\u9488\u627e\u4e2d\u95f4\u4f4d\u7f6e",level:2},{value:"\u53cd\u8f6c\u94fe\u8868",id:"\u53cd\u8f6c\u94fe\u8868",level:2},{value:"\u540e\u5e8f\u904d\u5386",id:"\u540e\u5e8f\u904d\u5386",level:2},{value:"\u8ba1\u7b97\u6700\u5927\u6df1\u5ea6",id:"\u8ba1\u7b97\u6700\u5927\u6df1\u5ea6",level:2},{value:"\u5224\u65ad\u662f\u5426\u662f\u5e73\u8861\u4e8c\u53c9\u6811",id:"\u5224\u65ad\u662f\u5426\u662f\u5e73\u8861\u4e8c\u53c9\u6811",level:2},{value:"\u5982\u679c\u8981\u7528HashMap\u7edf\u8ba1\u4e2a\u6570",id:"\u5982\u679c\u8981\u7528hashmap\u7edf\u8ba1\u4e2a\u6570",level:2}],u={toc:s};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u529b\u6263\u94fe\u8868\u4e13\u9898\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5"},"\u529b\u6263\u94fe\u8868\u4e13\u9898\u5e38\u7528\u65b9\u6cd5\u5c01\u88c5"),(0,a.kt)("h2",{id:"\u5feb\u6162\u6307\u9488\u627e\u4e2d\u95f4\u4f4d\u7f6e"},"\u5feb\u6162\u6307\u9488\u627e\u4e2d\u95f4\u4f4d\u7f6e"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"private ListNode endOfFirstHalf(ListNode head) {\n    ListNode slow = head, fast = head.next;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n    return slow;\n}\n")),(0,a.kt)("h2",{id:"\u53cd\u8f6c\u94fe\u8868"},"\u53cd\u8f6c\u94fe\u8868"),(0,a.kt)("p",null,"\u8fd9\u91cc\u7528\u7684\u662f\u529b\u6263\u5b98\u65b9\u7684\u4ee3\u7801\uff0c\u6211\u7684\u58f0\u660e\u7684\u53d8\u91cf\u7a0d\u5fae\u6709\u70b9\u591a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"private ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}\n")),(0,a.kt)("h2",{id:"\u540e\u5e8f\u904d\u5386"},"\u540e\u5e8f\u904d\u5386"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"public void postorder(TreeNode root, List<Integer> res) {\n    if (root == null) {\n        return;\n    }\n    postorder(root.left, res);\n    postorder(root.right, res);\n    res.add(root.val);\n}\n")),(0,a.kt)("h2",{id:"\u8ba1\u7b97\u6700\u5927\u6df1\u5ea6"},"\u8ba1\u7b97\u6700\u5927\u6df1\u5ea6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"private int dfs(TreeNode node) {\n    if (node == null) {\n        return 0;\n    }\n    int l = dfs(node.left) + 1;\n    int r = dfs(node.right) + 1;\n    return Math.max(l, r);\n}\n")),(0,a.kt)("h2",{id:"\u5224\u65ad\u662f\u5426\u662f\u5e73\u8861\u4e8c\u53c9\u6811"},"\u5224\u65ad\u662f\u5426\u662f\u5e73\u8861\u4e8c\u53c9\u6811"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"public boolean isBalanced(TreeNode root) {\n        if (root == null) return true;\n        return Math.abs(depth(root.left) - depth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);\n    }\n")),(0,a.kt)("h2",{id:"\u5982\u679c\u8981\u7528hashmap\u7edf\u8ba1\u4e2a\u6570"},"\u5982\u679c\u8981\u7528HashMap\u7edf\u8ba1\u4e2a\u6570"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"HashMap<Integer, Integer> map = new HashMap<>();\n// \u904d\u5386\u6570\u7ec4\uff0c\u7edf\u8ba1\u6bcf\u4e2a\u6570\u5b57\u51fa\u73b0\u7684\u6b21\u6570\nfor (int num : nums) {\n    int count = map.getOrDefault(num, 0);\n    map.put(num, count + 1);\n}\n")))}p.isMDXComponent=!0}}]);