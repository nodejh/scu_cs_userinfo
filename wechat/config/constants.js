 module.exports = {
  // database
  // 规则：表名_字段名_状态
   USERS_STATUS_OK: 0, // 用户表信息合法
   USERS_STATUS_DELETE: 1, // 用户取消绑定
   USERS_STATUS_ILLEGAL: 2, // 用户非法

  // wechat
   WECHAT_DEFAULT: '欢迎使用计算机学院微信公众平台！您可以回复：\n' +
  '[学号+密码] 绑定教务系统（如 2014141400000+000000）\n' +
  '[1] 个人信息填写\n' +
  '[2] 排名查询\n' +
  '[3] 本学期成绩查询\n' +
  '[4] 所有学期成绩查询\n' +
  '[5] 考表查询\n' +
  '[6] 个人信息查询\n' +
  '也可以回复 成绩、排名等关键字，我也会聊天哦～',
   WECHAT_NOT_BIND: '您还没绑定教务系统哦～\n请回复 [学号+密码]（如 2014141400000+000000）绑定',
   WECHAT_IS_BIND: '您已经绑定了教务系统哦，无需再次绑定~\n解绑请回复 unbind',

  // USER INFO FORM
   FORM_INFO: {
     name: {
       key: 'name',
       label: '姓名',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     key: {
       key: 'gender',
       label: '性别',
       type: 'select',
       group: '基本信息',
       value: '',
       options: [
         {
           label: '男',
           value: '男',
         }, {
           label: '女',
           value: '女',
         },
       ],
     },
     class: {
       key: 'class',
       label: '班级',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     number: {
       key: 'number',
       label: '学号',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     native_place: {
       key: 'native_place',
       label: '籍贯',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     birthday: {
       key: 'birthday',
       label: '出生日期',
       type: 'date',
       group: '基本信息',
       value: '',
     },
     ethnicity: {
       key: 'ethnicity',
       label: '名族',
       type: 'input',
       value: '',
       group: '基本信息',
     },
     identity_card: {
       key: 'identity_card',
       label: '身份证',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     political_status: {
       key: 'political_status',
       label: '政治面貌',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     hobby: {
       key: 'hobby',
       label: '特长爱好',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     phone: {
       key: 'phone',
       label: '移动电话',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     dormitory: {
       key: 'dormitory',
       label: '宿舍',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     students_species: {
       key: 'students_species',
       label: '生源种类',
       type: 'select',
       group: '基本信息',
       options: [
         {
           label: '统招',
           value: '统招',
         }, {
           label: '国防生',
           value: '国防生',
         }, {
           label: '自主招生',
           value: '自主招生',
         }, {
           label: '预科直升',
           value: '预科直升',
         }, {
           label: '定向',
           value: '定向',
         }, {
           label: '其他',
           value: '其他',
         },
       ],
       value: '',
     },
     family_address: {
       key: 'family_address',
       label: '家庭住址',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     family_phone: {
       key: 'family_phone',
       label: '家庭电话',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     contact_address: {
       key: 'contact_address',
       label: '通信地址',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     zip_code: {
       key: 'zip_code',
       label: '邮编',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     professional_volunteer: {
       key: 'professional_volunteer',
       label: '专业志愿',
       type: 'input',
       group: '基本信息',
       value: '',
     },
     father_name: {
       key: 'father_name',
       label: '父亲姓名',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     father_wokr_unit: {
       key: 'father_wokr_unit',
       label: '工作单位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     father_job: {
       key: 'father_job',
       label: '职位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     father_phone: {
       key: 'father_phone',
       label: '联系电话',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     father_qq: {
       key: 'father_qq',
       label: 'QQ',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     mother_name: {
       key: 'mother_name',
       label: '母亲姓名',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     mother_wokr_unit: {
       key: 'mother_wokr_unit',
       label: '工作单位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     mother_job: {
       key: 'mother_job',
       label: '工作单位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     mother_phone: {
       key: 'mother_phone',
       label: '联系电话',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     mother_qq: {
       key: 'mother_qq',
       label: 'QQ',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_1_name: {
       key: 'familier_1_name',
       label: '其他成员1',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_1_wokr_unit: {
       key: 'familier_1_wokr_unit',
       label: '工作单位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_1_appellation: {
       key: 'familier_1_appellation',
       label: '称呼',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_1_phone: {
       key: 'familier_1_phone',
       label: '联系电话',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_2_name: {
       key: 'familier_2_name',
       label: '其他成员2',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_2_wokr_unit: {
       key: 'familier_2_wokr_unit',
       label: '工作单位',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_2_appellation: {
       key: 'familier_2_appellation',
       label: '称呼',
       type: 'input',
       group: '家庭信息',
       value: '',
     },
     familier_2_phone: {
       key: 'familier_2_phone',
       label: '联系电话',
       type: 'input',
       group: '家庭信息',
       value: '',
     },

    // 经济情况
     source_of_income: {
       key: 'source_of_income',
       label: '收入来源',
       type: 'input',
       group: '经济情况',
       value: '',
     },
     household_income: {
       key: 'household_income',
       label: '家庭收入',
       type: 'input',
       placeholder: '家庭收入 (元/年)',
       value: '',
       group: '经济情况',
     },
     family_number: {
       key: 'family_number',
       label: '供养人口',
       type: 'input',
       group: '经济情况',
       value: '',
     },
     student_number: {
       key: 'student_number',
       label: '在校学生',
       type: 'input',
       group: '经济情况',
       value: '',
     },
     alimony: {
       key: 'alimony',
       label: '月生活费',
       type: 'input',
       group: '经济情况',
       value: '',
     },
     is_loan: {
       key: 'is_loan',
       label: '申请助贷款',
       type: 'select',
       value: '',
       options: [{
         label: '是',
         value: '是',
       }, {
         label: '否',
         value: '否',
       }],
     },
     supplement: {
       key: 'supplement',
       label: '补充说明',
       type: 'input',
       group: '经济情况',
       value: '',
     },

    // 学习情况
     college_entrance_grade: {
       key: 'college_entrance_grade',
       label: '高考总分',
       type: 'input',
       group: '学习情况',
       value: '',
     },
     english_grade: {
       value: '',
       key: 'english_grade',
       label: '英语分数',
       type: 'input',
       group: '学习情况',
     },
     math_grade: {
       key: 'math_grade',
       label: '数学分数',
       type: 'input',
       value: '',
       group: '学习情况',
     },
     synthesize_grade: {
       key: 'synthesize_grade',
       label: '综合分数',
       type: 'input',
       value: '',
       group: '学习情况',
     },
     senior_awards: {
       key: 'senior_awards',
       label: '高中职务',
       type: 'textarea',
       row: 3,
       value: '',
       group: '学习情况',
     },
     senior_senior: {
       key: 'senior_senior',
       label: '高中奖项',
       type: 'textarea',
       row: 3,
       group: '学习情况',
       value: '',
     },
     senior_self_assessment: {
       key: 'senior_self_assessment',
       label: '高中阶段自我总结',
       type: 'textarea',
       row: 4,
       group: '学习情况',
       value: '',
     },
   },
 };
