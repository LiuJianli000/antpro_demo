import { parse } from 'url';
import Mock from 'mockjs'

// mock tableListDataSource
// const genList = (current, pageSize) => {
//   const tableListDataSource = [];

//   for (let i = 0; i < pageSize; i += 1) {
//     const index = (current - 1) * 10 + i;
//     tableListDataSource.push({
//       id: index,
//       name: `我是编号 ${index}`,
//       desc: '这是一段描述',
//       updatedAt: new Date(),
//       createdAt: new Date(),
//     });
//   }

//   tableListDataSource.reverse();
//   return tableListDataSource;
// };

// let tableListDataSource = genList(1, 100);

let tableListDataSource = Mock.mock({
  "data|20": [
    {
      "id|+1": 0, 
      'name': '@cname()',
      'desc': "@csentence(20,50)",
      "createdAt": "@date('yyyy-MM-dd')",
      "updatedAt": "@date('yyyy-MM-dd')",
    }
  ],
}).data.reverse()

function getList(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;
  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.includes(params.name || ''));
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

function postRule(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id != item.id);
      break;

    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          id: tableListDataSource.length,
          name,
          desc,
          updatedAt: new Date(),
          createdAt: new Date(),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();

      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map(item => {
          if (item.id === id) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }

          return item;
        });
        return res.json(newRule);
      })();

      return;

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  res.json(result);
}

export default {
  'GET /api/test': getList,
  'POST /api/test': postRule,
}