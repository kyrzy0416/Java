"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6187],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,f=u["".concat(s,".").concat(m)]||u[m]||p[m]||i;return n?r.createElement(f,o(o({ref:t},d),{},{components:n})):r.createElement(f,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},35400:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const i={},o="\u53cd\u8f6c\u94fe\u8868",l={unversionedId:"Java/leetcode/src/LinkedList/\u53cd\u8f6c\u94fe\u8868",id:"Java/leetcode/src/LinkedList/\u53cd\u8f6c\u94fe\u8868",title:"\u53cd\u8f6c\u94fe\u8868",description:"https://leetcode-cn.com/problems/reverse-linked-list/",source:"@site/docs/Java/leetcode/src/LinkedList/206-\u53cd\u8f6c\u94fe\u8868.md",sourceDirName:"Java/leetcode/src/LinkedList",slug:"/Java/leetcode/src/LinkedList/\u53cd\u8f6c\u94fe\u8868",permalink:"/Computer-Science-Learn-Notes/docs/Java/leetcode/src/LinkedList/\u53cd\u8f6c\u94fe\u8868",draft:!1,editUrl:"https://github.com/zhiyu1998/Computer-Science-Learn-Notes/edit/master/docs/Java/leetcode/src/LinkedList/206-\u53cd\u8f6c\u94fe\u8868.md",tags:[],version:"current",sidebarPosition:206,frontMatter:{},sidebar:"sidebars",previous:{title:"\u6392\u5e8f\u94fe\u8868",permalink:"/Computer-Science-Learn-Notes/docs/Java/leetcode/src/LinkedList/\u6392\u5e8f\u94fe\u8868"},next:{title:"\u56de\u6587\u94fe\u8868",permalink:"/Computer-Science-Learn-Notes/docs/Java/leetcode/src/LinkedList/\u56de\u6587\u94fe\u8868"}},s={},c=[{value:"\u95ee\u9898\u63cf\u8ff0",id:"\u95ee\u9898\u63cf\u8ff0",level:2},{value:"\u60f3\u6cd5\uff1a\u76f4\u63a5\u8fed\u4ee3",id:"\u60f3\u6cd5\u76f4\u63a5\u8fed\u4ee3",level:2}],d={toc:c};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u53cd\u8f6c\u94fe\u8868"},"\u53cd\u8f6c\u94fe\u8868"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://leetcode-cn.com/problems/reverse-linked-list/"},"https://leetcode-cn.com/problems/reverse-linked-list/")),(0,a.kt)("h2",{id:"\u95ee\u9898\u63cf\u8ff0"},"\u95ee\u9898\u63cf\u8ff0"),(0,a.kt)("p",null,"\u7ed9\u4f60\u5355\u94fe\u8868\u7684\u5934\u8282\u70b9 ",(0,a.kt)("inlineCode",{parentName:"p"},"head")," \uff0c\u8bf7\u4f60\u53cd\u8f6c\u94fe\u8868\uff0c\u5e76\u8fd4\u56de\u53cd\u8f6c\u540e\u7684\u94fe\u8868\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg",alt:null})),(0,a.kt)("h2",{id:"\u60f3\u6cd5\u76f4\u63a5\u8fed\u4ee3"},"\u60f3\u6cd5\uff1a\u76f4\u63a5\u8fed\u4ee3"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://pic.leetcode-cn.com/7d8712af4fbb870537607b1dd95d66c248eb178db4319919c32d9304ee85b602-%E8%BF%AD%E4%BB%A3.gif",alt:null})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        if (head == null || head.next == null) return head;\n\n        ListNode ans = head;\n        head = head.next;\n        ans.next = null;\n\n        ListNode pre;\n        while (head != null) {\n            pre = head;\n            head = head.next;\n            pre.next = ans;\n            ans = pre;\n        }\n        \n        return ans;\n    }\n}\n")))}p.isMDXComponent=!0}}]);