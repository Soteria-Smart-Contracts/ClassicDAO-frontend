// test only
const currentDate = new Date();

function getTimestampXDaysLater(days) {
  const daysLater = currentDate.getTime() + days * 24 * 60 * 60 * 1000;

  return Math.floor(daysLater / 1000);
}

function getTimestampXHoursLater(hours) {
  const hoursLater = currentDate.getTime() + hours * 60 * 60 * 1000;

  return Math.floor(hoursLater / 1000);
}

const testEndDates = [
  getTimestampXDaysLater(2),
  getTimestampXDaysLater(6),
  getTimestampXHoursLater(1),
  getTimestampXHoursLater(2), // ends in two hours
  Math.floor((new Date().getTime() - 0 * 60 * 60 * 1000) / 1000), // has already ended
  getTimestampXDaysLater(1),
];

export const testProposals = [
  {
    title: "Proposal #1",
    proposer: "Sanjay",
    status: "Pending",
    startsIn: getTimestampXDaysLater(3),
    endsIn: testEndDates[0],
    content: "Proposal 1 content",
    options: {
      Yes: 0,
      No: 0,
    },
    multi: {},
  },
  {
    title: "Proposal #2",
    proposer: "Edward",
    status: "Rejected",
    startsIn: getTimestampXHoursLater(1),
    endsIn: testEndDates[1],
    content: "Proposal 2 content",
    options: {
      Yes: 0,
      No: 0,
    },
    multi: {},
  },
  {
    title: "Proposal #3",
    proposer: "Steve",
    status: "Active",
    startsIn: currentDate.getTime() / 1000,
    endsIn: testEndDates[2],
    content: "Proposal 3 content",
    options: {
      Yes: 150001,
      No: 249999,
    },
    multi: {},
  },
  {
    title: "Proposal #4",
    proposer: "Mary",
    status: "Passed",
    startsIn: currentDate.getTime() / 1000,
    endsIn: testEndDates[3],
    content: "Proposal 4 content",
    options: {
      Yes: 150501,
      No: 100000,
    },
    multi: {},
  },
  {
    title: "Proposal #5",
    proposer: "Joan",
    status: "Active",
    startsIn: currentDate.getTime() / 1000,
    endsIn: testEndDates[4],
    content: "Proposal 5 content",
    options: {
      Yes: 120501,
      No: 10000,
    },
    multi: {
      Maybe: 55645,
      Abstain: 8978,
      ["Go 50%"]: 96567,
      ["Go 75%"]: 156567,
    },
  },
  {
    title: "Proposal #6",
    proposer: "Pedro",
    status: "Active",
    startsIn: currentDate.getTime() / 1000,
    endsIn: testEndDates[5],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed nisi lacus sed viverra tellus in. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Convallis a cras semper auctor neque vitae tempus quam. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Imperdiet proin fermentum leo vel orci porta non pulvinar. Bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. A diam maecenas sed enim. Quis viverra nibh cras pulvinar mattis nunc. Vitae congue mauris rhoncus aenean vel elit scelerisque. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Vivamus arcu felis bibendum ut tristique. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Ut tortor pretium viverra suspendisse potenti nullam ac. Auctor elit sed vulputate mi sit. Senectus et netus et malesuada fames ac turpis egestas integer. Donec adipiscing tristique risus nec feugiat. Neque sodales ut etiam sit amet nisl purus in. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Mollis aliquam ut porttitor leo a diam sollicitudin. Lorem mollis aliquam ut porttitor leo a diam. Ut etiam sit amet nisl. Viverra accumsan in nisl nisi scelerisque. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Amet risus nullam eget felis. Tincidunt praesent semper feugiat nibh sed pulvinar proin. Diam donec adipiscing tristique risus. Lacinia quis vel eros donec. Pellentesque sit amet porttitor eget dolor. Porttitor massa id neque aliquam vestibulum. Faucibus pulvinar elementum integer enim neque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Est ultricies integer quis auctor elit sed. Neque convallis a cras semper auctor neque vitae tempus. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Dolor sit amet consectetur adipiscing elit ut aliquam. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Est placerat in egestas erat imperdiet sed euismod nisi. Justo laoreet sit amet cursus. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Et egestas quis ipsum suspendisse. Orci eu lobortis elementum nibh tellus molestie nunc non. Imperdiet proin fermentum leo vel orci porta non pulvinar. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Mattis pellentesque id nibh tortor id. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Dictum at tempor commodo ullamcorper. Tempus quam pellentesque nec nam aliquam sem. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Nec tincidunt praesent semper feugiat nibh. Dictum at tempor commodo ullamcorper a. Ut porttitor leo a diam sollicitudin tempor. Accumsan lacus vel facilisis volutpat est velit egestas dui id. Est ullamcorper eget nulla facilisi etiam. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Volutpat est velit egestas dui id ornare arcu odio ut. Eget arcu dictum varius duis at. Nulla aliquet porttitor lacus luctus. Adipiscing diam donec adipiscing tristique risus. Ac odio tempor orci dapibus. Viverra justo nec ultrices dui sapien eget mi. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Fames ac turpis egestas maecenas. Nisi scelerisque eu ultrices vitae. Orci dapibus ultrices in iaculis nunc sed augue lacus. Scelerisque eu ultrices vitae auctor. Consequat interdum varius sit amet mattis. Sed id semper risus in. Massa vitae tortor condimentum lacinia quis vel eros donec. Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Sit amet porttitor eget dolor morbi. Congue quisque egestas diam in arcu. Aenean sed adipiscing diam donec adipiscing. Accumsan lacus vel facilisis volutpat. Eget gravida cum sociis natoque penatibus. Arcu cursus euismod quis viverra nibh cras pulvinar. Nullam eget felis eget nunc lobortis. Facilisi nullam vehicula ipsum a arcu cursus vitae. Risus nec feugiat in fermentum posuere urna nec. Sit amet commodo nulla facilisi.",
    options: {
      Yes: 230501,
      No: 100000,
    },
    multi: {
      Maybe: 55645,
      Abstain: 8978,
      ["Multi 1"]: 96567,
      ["Multi 2"]: 156567,
      ["Multi 3"]: 226567,
    },
  },
];
