import { prefix } from './../config';
import request from './../utils/request';

const getGrade = async () => {
  const url = `${prefix}/grade`;
  return request(url);
};


// eslint-disable-next-line
const updateGrade = async () => {
  // console.log('a:');
  return null;
};

export {
  getGrade,
  updateGrade,
};
