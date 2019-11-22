const _ = require('lodash');
const moment = require('moment');

// 参加技术分享的所有人名
const speakers = ['张三', '李四', '王五', '赵六', '孙七', '黄八'];

// 本周最后一个演讲的人名.
// 为了更人性化,本周最后一个人不能是下周第一个，不然那个宝宝会哭的
const currentWeekLastSpeaker = '黄八';

// 结果是否携带具体的日期
const addTimeInTheRes = true; 
// 下周演讲是第几轮
const nextSpeakTimes = '第四轮';
// 下一轮每个人在周几分享。用于生成某个演讲人的时间。
const speakWeek = '周四';

console.log(generateRandomSpeakers());


/**
 * 生成随机的分享者
 * @description 
 * 生成随机或者携带具体分享时间的分享人名序列
 * 例如：
 * '第四轮技术分享顺位
 *  张三 -> 李四 -> 王五 -> 赵六 -> 孙七 -> 黄八'
 * 或者
 *  '第四轮技术分享顺位
 *  张三(1.2) -> 李四(1.9) -> 王五(1.16) -> 赵六(1.23) -> 孙七(1.30) -> 黄八(2.7)'
 * @returns {string}
 */
function generateRandomSpeakers() {
  if (addTimeInTheRes) { // 在结果中携带具体的分享日期
    return _generateSpeakersWithTime();
  } else {
    return _generateSpeakersWithoutTime();
  }
}

/**
 * 生成携带具体分享时间的分享人名序列
 * @returns {string}
 */
function _generateSpeakersWithTime() {
  const randomRes = _getRandomResult();
  const nextWeekDate = _generateSpecialDate();
  let index = 0;
  if (_.isEmpty(randomRes)) {
    return '';
  }
  const speakerRes = randomRes.map((item) => {
    const speakers = item + `(${nextWeekDate[index]})`;
    index++;
    return speakers;
  });

  return _joinRandomSpeakersResult(speakerRes);
}

/**
 * 生成不携带具体分享时间的分享人名序列
 * @returns {string}
 */
function _generateSpeakersWithoutTime() {
  const randomRes = _getRandomResult();
  return _joinRandomSpeakersResult(randomRes);
}

/**
 * 生成随机的结果
 * @returns {array}
 */
function _getRandomResult() {
  let newSpeakers = speakers; 
  let randomSpkeaker;

  for(let index = 0; index < newSpeakers.length; index++) {
    let randIndex = parseInt(Math.random() * newSpeakers.length);
  
    // 第一位不能是上周最后一个演讲的那个人
    if (index === 0 && (newSpeakers[randIndex] === currentWeekLastSpeaker || newSpeakers[index] === currentWeekLastSpeaker)) {
      return;
    }
    if (newSpeakers[0] === currentWeekLastSpeaker) {
      return;
    }

    randomSpkeaker = newSpeakers[randIndex];
    newSpeakers[randIndex] = newSpeakers[index];
    newSpeakers[index] = randomSpkeaker;
  }

  return newSpeakers;
}

/**
 * 拼接生成的随机顺位结果
 * @returns {string}
 */
function _joinRandomSpeakersResult(speakers) {
  if (_.isEmpty(speakers)) {
    return '';
  }

  return `${nextSpeakTimes}技术分享顺位 \n
    ${speakers.join('->')}
  `;
}

/**
 * 生成未来连续多个相同星期数的日期
 * @returns {array}
 */
function _generateSpecialDate() {
  const currentTime = moment().format('YYYY-MM-DD HH:mm');
  const cuttentWeek = moment(currentTime).format('d');

  // 0-6
  const featureWeek = _.indexOf(['周日', '周一', '周二', '周三', '周四', '周五', '周六'], speakWeek);
  const days = featureWeek - cuttentWeek;
  // 本周周几的日期
  const featureWeekDate = moment().add(days, 'days');
  let newWeekDate = featureWeekDate;
  const weeks = [];

  // 生成多个未来相同星期数的日期
  speakers.map((item) => {
    const weekDate = moment(newWeekDate).add(7, 'days');
    weeks.push(moment(weekDate).format('MM-DD'));
    newWeekDate = moment(moment(weekDate).format('YYYY-MM-DD'));
  });

  return weeks;
}