const { query } = require('./../utils/mysql');
const  crypto = require('crypto');
const {checkEmail}=require('./../utils/myFun');
const { readXLSX, xlsxSheetOneToObject } = require('./../utils/xlsx');

const gradeList = async (ctx) => {
  const result = { success: false };
  try {
    const sql = 'select * from grade';
    const list = await query(sql);
    result.success = true;
    result.list = list;
  } catch (e) {
    result.message(e.message || '查询成绩列表失败');
  } finally {
    ctx.body = result;
  }
};

const login=async(ctx)=>{
    const result = {
        success:false
    };
    try {
         const formData=ctx.request.body;
         const mail=formData.mail;
         if(!checkEmail(mail))
         {
             ctx.body = result;
             return;
         }
        const md5 = crypto.createHash('md5');
        const password = md5.update(formData.password).digest('hex');
        const value=[mail,password];

        const sql = 'select * from user  where mail=? and password=?';
        const row = await query(sql,value);
        console.log(row.length);
        if ( row.length!=0) {
            console.log(row[0].mail);
            if ( formData.mail === row[0].mail) {
                result.success = true;
            }
            else {
                result.message = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
                result.code = 2001;
            }
        }

        else {
               result.code = 2002,
                result.message = 'FAIL_USER_NO_EXIST'
        }
    } catch (e) {
        result.message=e.message || '登录失败';
    } finally {
        ctx.body = result;
    }
};

const submit=async(ctx)=> {
    const result = {
        success: false
    };
    const reqData = ctx.request.body;
    console.log(reqData);
    try {
        const workbook = readXLSX(reqData.saveTo);
        const sheetObject = xlsxSheetOneToObject(workbook);
        const sql = 'INSERT INTO grade (number, average_grade, average_credit, average_credit_grade, ranking,grade,class) VALUES ?';
        const values = sheetObject.map((item) => {
            const keys = Object.keys(item);
            return [
                parseInt(item[keys[1]].replace(/\s+/g, ''), 10),
                parseFloat(item[keys[2]].replace(/\s+/g, '')),
                parseFloat(item[keys[3]].replace(/\s+/g, '')),
                parseFloat(item[keys[4]].replace(/\s+/g, '')),
                parseInt(item[keys[5]].replace(/\s+/g, ''), 10),
                reqData.grade,
                reqData.class,
            ];
        });
        const res= await query(sql, [values]);
        console.log(res);
        if (res != null) {
            result.success = true;
        }
    }
    catch (e) {
        // console.log('e: ', e);
        result.error = e;
        result.message = e.message || '提交失败，请重试';
    } finally {
        console.log(result);
        ctx.body = result;
    }
};
const signed=async(ctx)=>{
    const result = {
        success: false
    };
    const reqData = ctx.request.body;
    console.log(reqData);
    try {
       const vacation_name=reqData.vacation_name;
        const vacation_data=reqData.vacation_data;
        const vacation_grade=reqData.vacation_grade;
        var nowTime=new Data();

        const sql = 'INSERT INTO grade (number, average_grade, average_credit, average_credit_grade, ranking,grade,class) VALUES ?';
        const values = sheetObject.map((item) => {
            const keys = Object.keys(item);
            return [
                parseInt(item[keys[1]].replace(/\s+/g, ''), 10),
                parseFloat(item[keys[2]].replace(/\s+/g, '')),
                parseFloat(item[keys[3]].replace(/\s+/g, '')),
                parseFloat(item[keys[4]].replace(/\s+/g, '')),
                parseInt(item[keys[5]].replace(/\s+/g, ''), 10),
                reqData.grade,
                reqData.class,
            ];
        });
        const res= await query(sql, [values]);
        console.log(res);
        if (res != null) {
            result.success = true;
        }
    }
    catch (e) {
        // console.log('e: ', e);
        result.error = e;
        result.message = e.message || '提交失败，请重试';
    } finally {
        console.log(result);
        ctx.body = result;
    }

}

module.exports = {
  gradeList,login,submit
};
