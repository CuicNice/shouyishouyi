import {
  myStorage
} from "./newStorage"

const admin = {
  checkadmin: function () {
    var isAdmin = false;
    var adminRes = myStorage.get('adminInfo');
    if (adminRes != null) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    return isAdmin;
  }
}

export {
  admin
}