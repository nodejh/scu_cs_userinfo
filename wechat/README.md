## 功能呢

- 自动回复
- 绑定教务系统账号
- 成绩查询
- 排名查询
- 考表查询
- 信息填写


```sql
-- auto-generated definition
create table info
(
	name varchar(100) null commnet '姓名',
	gender varchar(10) null commnet '性别',
	class varchar(50) null comment '班级',
  number varchar(50) null comment '学号',
	native_place varchar(100) null comment '籍贯',
	birthday date null comment '出生日期',
	ethnicity varchar(50) null comment '名族',
	identity_card varchar(50) null comment '身份证',
	political_status varchar(50) null comment '政治面貌',
	hobby varchar(255) null comment '特长爱好',
	phone varchar(50) null comment '移动电话',
	dormitory varchar(50) null comment '宿舍',
	students_species int null comment '生源种类',
	family_address varchar(50) null comment '家庭住址',
	family_phone varchar(50) null comment '家庭电话',
	contact_address varchar(255) null comment '通信地址',
	zip_code varchar(50) null comment '邮编',
	professional_volunteer varchar(50) null comment '专业志愿',
	father_name varchar(50) null comment '父亲姓名',
	father_wokr_unit varchar(50) null COMMENT '工作单位',
	father_job varchar(50) null comment '职位',
	father_phone varchar(50) null comment '联系电话',
	father_qq varchar(50) null,
	mother_name varchar(50) null comment '母亲姓名',
	mother_wokr_unit varchar(50) null COMMENT '工作单位',
	mother_job varchar(50) null comment '职位',
	mother_phone varchar(50) null,
	mother_qq varchar(50) null,
	familier_1_name varchar(50) null COMMENT  '其他成员1姓名',
	familier_1_wokr_unit varchar(50) null COMMENT '其他成员1工作单位',
	familier_1_appellation varchar(50) null COMMENT '其他成员1称呼',
	familier_1_phone varchar(50) null COMMENT '其他成员1联系电话',
	familier_2_name varchar(50) null COMMENT  '其他成员2姓名',
	familier_2_wokr_unit varchar(50) null COMMENT '其他成员2工作单位',
	familier_2_appellation varchar(50) null COMMENT '其他成员2称呼',
	familier_2_phone varchar(50) null COMMENT '其他成员2联系电话',
	source_of_income VARCHAR(255) null COMMENT '收入来源',
	household_income VARCHAR(100) NULL COMMENT '家庭收入',
	family_number VARCHAR(50) NULL COMMENT '供养人口',
	student_number VARCHAR(50) NULL COMMENT '在校学生',
	alimony VARCHAR(50) NULL COMMENT '月生活费',
	is_loan VARCHAR(50) NULL COMMENT '申请助贷款',
	supplement VARCHAR(50) NULL COMMENT '补充说明',
	college_entrance_grade VARCHAR(50) NULL COMMENT '高考总分',
	english_grade VARCHAR(50) NULL,
	math_grade VARCHAR(50) NULL,
	synthesize_grade VARCHAR(50) NULL COMMENT '综合分数',
	senior_awards VARCHAR(200) NULL COMMENT '高中职务',
	senior_senior VARCHAR(200) NULL COMMENT '高中奖项',
	senior_self_assessment VARCHAR(1000) COMMENT '自我总结'
)
;
```
