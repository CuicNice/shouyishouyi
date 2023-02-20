import {
  config
} from "../config/config";
import {
  Http
} from "../utils/http";

class Network {

  static async userLogin(zh, mm) { //用户登录
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/user/get_userInfo",
      header: config.form_header,
      data: {
        zh: zh,
        mm: mm
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getElec(build, qsh) { //获取电费
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/electric/get_electric",
      header: config.form_header,
      data: {
        build: build,
        room: qsh
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async cxLogin(username, password) { //登录学习通
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/chaoxing/login",
      header: config.form_header,
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }


  static async getWork(username, password, type, count) { //获取学习通作业
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/chaoxing/get_all",
      header: config.form_header,
      data: {
        username: username,
        password: password,
        type: type,
        count: count
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getElec(build, qsh) { //获取电费
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/electric/get_electric",
      header: config.form_header,
      data: {
        build: build,
        room: qsh
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getScore(zh, mm) { //获取成绩
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/user/get_userScore",
      header: config.form_header,
      data: {
        zh: zh,
        mm: mm
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getscoreDetail(zh, mm, id, xnm, xqm) { //获取成绩详情
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/user/get_scoreDetails",
      header: config.form_header,
      data: {
        zh: zh,
        mm: mm,
        id: id,
        xnm: xnm,
        xqm: xqm
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getInNews(page) { //获取内网新闻
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/schoolnews/innewslist",
      header: config.form_header,
      data: {
        page: page
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getOutNews(page) { //获取外网新闻
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/schoolnews/outnewslist",
      header: config.form_header,
      data: {
        page: page
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getOutContent(href) { //获取外网新闻详情
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/schoolnews/outnewstext",
      header: config.form_header,
      data: {
        href: href
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getInContent(href) { //获取内网新闻详情
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/schoolnews/innewstext",
      header: config.form_header,
      data: {
        href: href
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async searchNew(page, keyword) { //搜索内网新闻
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/schoolnews/searchinnews",
      header: config.form_header,
      data: {
        page: page,
        keyword: keyword
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async searchBook(page, word) { //搜索图书
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/library/get_searchbook",
      header: config.form_header,
      data: {
        page: page,
        word: word
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async searchOneBook(bookid) { //获取单本图书数据
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/library/get_searchonebook",
      header: config.form_header,
      data: {
        bookid: bookid,
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }
  
  static async getCETs(zh, mm) { //获取四六级
    return await Http.request_post({
      url: config.apiBaseUrl_1 + "/user/get_CETScore",
      header: config.form_header,
      data: {
        zh: zh,
        mm: mm
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async adminLogin(zh, mm) { //管理员登录
    return await Http.request_post({
      url: config.apiBaseUrl_2 + "/admin/admin_login",
      header: config.form_header,
      data: {
        zh: zh,
        mm: mm
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getAllClass(zh, mm, xy_id, nj) { //获取学院下的班级 apiBaseUrl_4
    return await Http.request_post({
      url: config.apiBaseUrl_4 + "/user/getClassList",
      header: config.json_header,
      data: {
        zh: zh,
        mm: mm,
        xy_id: xy_id,
        nj: nj
      }
    }).then(res => {
      console.log(res)
      return res.data
    }).catch(error => {
      console.log(error)
      return null;
    })
  }


  static async getActiveAllDisk() { //获取启动瓷片
    return await Http.request_post({
      url: config.apiBaseUrl_3 + "/api/disk/getActiveAllDisk",
      header: config.form_header,
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getAllLabels() { //获取所有标签
    return await Http.request_get({
      url: config.apiBaseUrl_3 + "/api/label/getOnlineLabel",
      header: config.form_header,
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getArticles(currentPage,index,pageSize,params) {
    return await Http.request_post({
      url: config.apiBaseUrl_3 + "/api/article/getArticle",
      header: config.json_header,
      data: {
        currentPage: currentPage,
        index: index,
        pageSize: pageSize,
        params: params,
        sortColumn: 'publish_date',
        sortMethod: 'desc'
      }
    }).then(res => {
      return res
    }).catch(error => {
      return null;
    })
  }

  static async getResume(userName, userPhone) {
    return await Http.request_post({
      url: "https//shouyijia.gorit.cn/resume/get",
      header: config.form_header,
      data: {
        userName: userName,
        userPhone: userPhone
      }
    }).then(res => {
      console.log(res)
      return res
    }).catch(error => {
      return null;
    })
  }
}

export {
  Network
}