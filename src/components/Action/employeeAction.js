
import * as actionTypes from './actiontype';

export const createEmployee = (employee) => {
    return {
      type: actionTypes.CREATE_NEW_EMPLOYEE,
      employee: employee
    }
  };

export const deleteEmployee = (id) => {
    return {
        type: actionTypes.REMOVE_EMPLOYEE,
        id: id
    }
}