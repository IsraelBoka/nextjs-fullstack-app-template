export interface RootObject {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign?: any;
  currency?: any;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating?: number;
  category?: string;
  product_type: string;
  tag_list: any[];
  created_at: string;
  updated_at: string;
  product_api_url: string;
  api_featured_image: string;
  product_colors: (Productcolor | Productcolors2)[];
}

export interface Productcolors2 {
  hex_value: string;
  colour_name?: any;
}

export interface Productcolor {
  hex_value: string;
  colour_name: string;
}
