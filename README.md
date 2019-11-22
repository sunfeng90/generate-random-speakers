# generate-random-speakers
生成随机的团队技术分享演讲者

## 描述
团队经常进行内部技术分享是很有必要的，不然团队就是一盆死水。
该Demo是在团队人数固定的情况下，生成每周某一天技术分享的人。

## 使用方法

1. git clone https://github.com/sunfeng90/generate-random-speakers.git；

2. sudo npm i ；

3. node index.js

## 配置
1. 修改index中speakers为你需要随机排序的演讲者姓名；

2. 可选操作：
   
   1. 修改index.js中currentWeekLastSpeaker。该名称为不允许出现在结果序列第一个位置的名称。
   
   2. 修改index.js中nextSpeakTimes为接下来是第几轮技术分享顺位；
   
   3. 修改index.js中speakWeek为未来演讲的日期。如果你不希望结果中出现日期，那么就修改addTimeInTheRes为false。

## 结果
  ```
    第四轮技术分享顺位 

    王五(11-28)->黄八(12-05)->张三(12-12)->赵六(12-19)->李四(12-26)->孙七(01-02)
  ```

  ```
    第四轮技术分享顺位 

    李四->赵六->张三->黄八->王五->孙七
  ```
  
 ## 作者
   Frank
  
 ## 欢迎大佬赏赐一个star
