/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 *  GET /v1_0/mp/articles   status(1, 2)  channel_id page per_page
 */

/**
 * 目标2：筛选文章列表
 *  2.1 设置频道列表数据
 *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
 *  2.3 点击筛选时，传递查询参数对象到服务器
 *  2.4 获取匹配数据，覆盖到页面展示
 */

/**
 * 目标3：分页功能
 *  3.1 保存并设置文章总条数
 *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
 *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
 */

/**
 * 目标4：删除功能
 *  4.1 关联文章 id 到删除图标
 *  4.2 点击删除时，获取文章 id
 *  4.3 调用删除接口，传递文章 id 到服务器
 *  4.4 重新获取文章列表，并覆盖展示
 *  4.5 删除最后一页的最后一条，需要自动向前翻页
 *  DELETE /v1_0/mp/articles/:id
 */

// 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去

var totalCount
const queryParams = {
  status: '',
  channel_id: '',
  page: 1,
  per_page: 2
}

getChannels()
getArticles()

document.querySelector('.sel-form').addEventListener('change', e => {
  if (e.target.tagName === 'INPUT' && e.target.parentNode.classList.contains('form-check')) {
    queryParams.status = e.target.value
  }
  if (e.target.tagName === 'SELECT' && e.target.classList.contains('form-select')) {
    queryParams.channel_id = e.target.value
  }
})

document.querySelector('.sel-btn').addEventListener('click', e => {
  queryParams.page = 1
  getArticles()
})

document.querySelector('.next').addEventListener('click', e => {
  if (queryParams.page >= Math.ceil(totalCount / queryParams.per_page) ) return
  queryParams.page++
  getArticles()
})

document.querySelector('.last').addEventListener('click', e => {
  if (queryParams.page <= 1) return
  queryParams.page--
  getArticles()
})

document.querySelector('.art-list').addEventListener('click', async e => {
  if (e.target.classList.contains('del')) {
    if (!confirm('确定要删除吗？')) return
    const id = e.target.parentNode.parentNode.dataset.id
    await axios({
      url: `/v1_0/mp/articles/${id}`,
      method: 'DELETE'
    })
    if (document.querySelector('.art-list').children.length == 1 && queryParams.page > 1) {
      queryParams.page--
    }
    getArticles()
  }

  if (e.target.classList.contains('edit')) {
    const id = e.target.parentNode.parentNode.dataset.id
    location.href = `../publish/index.html?id=${id}`
  }
})

async function getChannels() {
  const res = await axios({url: '/v1_0/channels'})
  document.querySelector('.form-select').innerHTML = '<option value="" selected="">请选择文章频道</option>' +
    res.channels.map(channel => `<option value="${channel.id}">${channel.name}</option>`).join('')
}

async function getArticles() {
  const res = await axios({
    url: '/v1_0/mp/articles',
    params: queryParams,
  })
  document.querySelector('.art-list').innerHTML = res.results.map(article => `
    <tr data-id="${article.id}">
      <td>
        <img src="${article.cover?.type ? article.cover.images[0] : 'https://img2.baidu.com/it/u=2640406343,1419332367&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=708&amp;h=500'}" alt="">
      </td>
      <td>${article.title}</td>
      <td>
        ${article.status === 1 ? '<span class="badge text-bg-primary">待审核</span>' : '<span class="badge text-bg-success">审核通过</span>'}
      </td>
      <td>
        <span>${article.pubdate}</span>
      </td>
      <td>
        <span>${article.read_count}</span>
      </td>
      <td>
        <span>${article.comment_count}</span>
      </td>
      <td>
        <span>${article.like_count}</span>
      </td>
      <td>
        <i class="bi bi-pencil-square edit"></i>
        <i class="bi bi-trash3 del"></i>
      </td>
    </tr>
  `)
  totalCount = res.total_count
  document.querySelector('.total-count').innerText = `共${totalCount}条`
  document.querySelector('.page-now').innerText = `第${queryParams.page}页`
}