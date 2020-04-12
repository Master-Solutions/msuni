class ResourceInfo {
   readonly id: string;
   readonly type: string;
   readonly value: any;
   readonly options: any;

   constructor(id: string, type: string, value: any, options: any = {}) {
      this.id = id;
      this.type = type;
      this.value = value;
      this.options = options;
   }
}

export default ResourceInfo;
