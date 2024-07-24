type KYCCategory = {
  personal: {
    title: string;
    info: string;
    fields: string[];
    optional?: number;
  };
  address: {
    title: string;
    info: string;
    fields: string[];
    optional?: number;
  };
  document: {
    title: string;
    info: any;
    fields?: string[];
    optional?: number;
  };
};

type KYCTFormParams = {
  header: string;
  info: string;
  fields: KYCCategory;
};

type CatKey = "personal" | "address" | "document";

type FormDataTyp = {
  name: string;
  value: any;
  required: boolean;
}[];
