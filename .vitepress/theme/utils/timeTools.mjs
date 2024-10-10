import dayjs from "dayjs";

/**
 * 获取时间剩余的函数
 * @return {Object} 包含day、week、month和year的剩余时间信息
 */
export const getTimeRemaining = () => {
  const now = dayjs();
  const dayText = {
    day: "今日",
    week: "本周",
    month: "本月",
    year: "本年",
  };
  /**
   * 计算时间差的函数
   * @param {String} unit 时间单位，可以是 'day', 'week', 'month', 'year'
   */
  const getDifference = (unit) => {
    // 获取当前时间单位的开始时间
    const start = now.startOf(unit);
    // 获取当前时间单位的结束时间
    const end = now.endOf(unit);
    // 计算总的天数或小时数
    const total = end.diff(start, unit === "day" ? "hour" : "day") + 1;
    // 计算已经过去的天数或小时数
    let passed;
    if (unit === "week" && now.day() === 0) {
      // 如果是星期日
      passed = total - 1;
    } else {
      passed = now.diff(start, unit === "day" ? "hour" : "day");
    }
    const remaining = total - passed;
    const percentage = (passed / total) * 100;
    // 返回数据
    return {
      name: dayText[unit],
      total: total,
      passed: passed,
      remaining: remaining,
      percentage: percentage.toFixed(2),
    };
  };
  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};

/**
 * 计算当前日期距离指定日期的天数
 * @param {string} dateStr - 指定的日期，格式为 'YYYY-MM-DD'
 * @return {number} 返回的天数
 */
export const getDaysUntil = (dateStr) => {
  const now = dayjs();
  const targetDate = dayjs(dateStr);
  const daysUntil = targetDate.diff(now, "day");
  return daysUntil;
};

/**
 * 格式化日期字符串。
 * 如果日期与当前年份相同，则返回 "月/日" 格式
 * 如果日期不与当前年份相同，则返回 "年/月/日" 格式
 * @param {string} dateString - 需要转换的日期字符串，格式为 "YYYY/MM/DD" 或 "YYYY-MM-DD"
 * @returns {string} 格式化后的日期。
 */
export const formatDate = (dateString) => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  // 解析传入的日期字符串
  const date = new Date(dateString.replace(/-/g, "/"));
  // 检查年份是否相同，并且格式化日期
  return date.getFullYear() === currentYear
    ? `${date.getMonth() + 1}/${date.getDate()}`
    : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
