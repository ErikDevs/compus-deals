interface ItemsList {
  id: number;
  title: string;
  price: number;
  location: string;
  description: string;
  image: string;
  status: [];
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  campusName: string;
  location: string;
  phoneNumber: string;
  profilePhoto: string;
}
