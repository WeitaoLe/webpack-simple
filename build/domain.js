module.exports = {
  // 开发环境
  development: {
    locals: {
      baseUrl: '',
      login: {
        server: 'https://testark.analysys.cn/fangzhou/auth',
        client: 'https://testark.analysys.cn',
        // paas 项目服务
        paasServer: 'http://arktestdemo.analysys.cn'
      },
      sdk: {
        url: '//ark.analysys.cn/sdk/test/AnalysysFangzhou_JS_SDK.min.js'
      },
      perject: {
        // 银行业
        bank: 'default',
        // 新零售行业
        newRetail: 'backup',
        // 电商行业
        onlineRetailers: 'dynamic',
        // 通用行业
        generalIndustry: 'fangzhou',
        edu: 'educationdemo',
        // 社区demo
        social: 'eguanqianfan515',
        // 证券
        security: 'securitydemo'
      },
      debugMode: 1
    }
  },
  // 生产环境
  production: {
    locals: {
      baseUrl: '/portal',
      login: {
        server: 'https://ark.analysys.cn/fangzhou/auth',
        client: 'https://ark.analysys.cn',
        // paas 项目服务
        paasServer: 'https://growth.analysys.cn'
      },
      sdk: {
        url: '//ark.analysys.cn/sdk/AnalysysFangzhou_JS_SDK.min.js'
      },
      perject: {
        // 银行业
        bank: 'bankdemo',
        // 新零售行业
        newRetail: 'retaildemo',
        // 电商行业
        onlineRetailers: 'ecommercedemo',
        // 通用行业
        generalIndustry: 'commondemo',
        // 社区demo
        social: 'socialdemo',
        // 教育demo
        edu: 'educationdemo',
        // 证券
        security: 'securitydemo'
      },
      debugMode: 2
    }
  },
  // 预发布环境
  staging: {
    locals: {
      baseUrl: '/portal',
      login: {
        //
        server: 'https://testark.analysys.cn/fangzhou/auth',
        //
        client: 'https://testark.analysys.cn',
        // paas 项目服务
        paasServer: 'https://arktestdemo.analysys.cn'
      },
      sdk: {
        url: '//ark.analysys.cn/sdk/test/AnalysysFangzhou_JS_SDK.min.js'
      },
      perject: {
        // 银行业
        bank: 'default',
        // 新零售行业
        newRetail: 'backup',
        // 电商行业
        onlineRetailers: 'dynamic',
        // 通用行业
        generalIndustry: 'fangzhou',
        // 教育demo
        edu: 'educationdemo',
        // 社区demo
        social: 'eguanqianfan515'
      },
      debugMode: 1
    }
  },
  // 测试环境
  test: {
    locals: {
      baseUrl: '/portal',
      login: {
        server: 'https://testark.analysys.cn/fangzhou/auth',
        client: 'https://testark.analysys.cn',
        // paas 项目服务
        paasServer: 'https://arktestdemo.analysys.cn'
      },
      sdk: {
        url: '//ark.analysys.cn/sdk/test/AnalysysFangzhou_JS_SDK.min.js'
      },
      perject: {
        // 银行业
        bank: 'default',
        // 新零售行业
        newRetail: 'retaildemo',
        // 电商行业
        onlineRetailers: 'eguanqianfan515',
        // 通用行业
        generalIndustry: 'paastest',
        // 社区demo
        social: 'dynamic',
        // 教育demo
        edu: 'educationdemo',
        // 证券
        security: 'securitydemo'

      },
      debugMode: 1
    }
  }
}
