const logs = [
  { user: "A", action: "click", date: "2025-08-01" },
  { user: "B", action: "view", date: "2025-08-01" },
  { user: "A", action: "view", date: "2025-08-01" },
  { user: "C", action: "click", date: "2025-08-02" },
  { user: "A", action: "purchase", date: "2025-08-02" },
  { user: "B", action: "click", date: "2025-08-03" },
];

// Reduce log analysis
const analytics = logs.reduce(
  (acc, log) => {
    acc.users.add(log.user);

    acc.actions[log.action] = (acc.actions[log.action] || 0) + 1;

    acc.dates[log.date] = (acc.dates[log.date] || 0) + 1;

    return acc;
  },
  { users: new Set(), actions: {}, dates: {} }
);

// सबसे ज्यादा action
const topAction = Object.entries(analytics.actions).reduce(
  (max, [action, count]) => (count > max.count ? { action, count } : max),
  { action: null, count: 0 }
);

// सबसे ज्यादा activity वाला दिन
const topDay = Object.entries(analytics.dates).reduce(
  (max, [day, count]) => (count > max.count ? { day, count } : max),
  { day: null, count: 0 }
);

console.log("👥 Unique Users:", analytics.users.size);
console.log("🔥 Top Action:", topAction);
console.log("📅 Busiest Day:", topDay);
