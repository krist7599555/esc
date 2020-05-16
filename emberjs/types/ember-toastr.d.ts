// https://www.npmjs.com/package/ember-toastr
interface ToastsServiceOptions {
  closeButton: boolean;
  debug: boolean;
  newestOnTop: boolean;
  progressBar: boolean;
  positionClass: string;
  preventDuplicates: string;
  onclick: any;
  showDuration: string;
  hideDuration: string;
  timeOut: string;
  extendedTimeOut: string;
  showEasing: string;
  hideEasing: string;
  showMethod: string;
  hideMethod: string;
}
interface ToastrService {
  success(msg?:string, title?:string, options?:ToastsServiceOptions): any;
  info(msg?:string, title?:string, options?:ToastsServiceOptions): any;
  warning(msg?:string, title?:string, options?:ToastsServiceOptions): any;
  error(msg?:string, title?:string, options?:ToastsServiceOptions): any;
  clear(toast?:any): any;
  remove(toast?:any): any;
}
declare module '@ember/service' {
  interface Registry {
    toast: ToastrService;
  }
}
