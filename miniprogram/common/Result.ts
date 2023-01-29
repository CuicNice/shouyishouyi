import { ResultCodeEnum, ResultMessageEnum } from "../enums/ResultEnums";

/**
 * @Author Gorit
 * @Date 2022年9月20日
 */
export class Result<T> {
    private code: ResultCodeEnum;
    private msg: ResultMessageEnum | string;
    private data: T | object | string;

    constructor(code: number, msg: ResultMessageEnum | string, data?: T | object) {
        this.code = code;
        this.msg = msg;
        this.data = data ?? "";
    }

    set setCode(code: number) {
        this.code = code;
    }

    set setData(data: T) {
        this.data = data;
    }

    set setMsg(msg: ResultMessageEnum | string) {
        this.msg = msg;
    }

    public static mockSuccess (data: any) {
      return new Result(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS, data);
    }

    // 网络错误，给予默认数据
    public static requestError (data: any) {
      return new Result(ResultCodeEnum.BAD_REQUEST, ResultMessageEnum.BAD_REQUEST, data);
    }

    public static error (errMsg: ResultMessageEnum) {
        return new Result(ResultCodeEnum.ERROR, errMsg);
    }

    public static paramsError () {
        return new Result(ResultCodeEnum.REQUEST_PARAMS_ERROR, ResultMessageEnum.REQUEST_PARAMS_ERROR);
    }

    public toString() {
        return {
            code: this.code,
            msg: this.msg,
            data: this.data
        }
    }
}
