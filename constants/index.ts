export const listings = [
  {
    id: 1,
    title: "Sample Listing 1",
    price: "1000",
    location: "Campus A",
    description: "Well maintained",
    image: "/sofa.png",
    status: ["Available", "Not available"],
  },
  {
    id: 2,
    title: "Sample Listing 2",
    price: "1200",
    location: "Campus B",
    description: "Newly refurbished",
    image: "/sofa.png",
    status: ["Available", "Not available"],
  },
  {
    id: 3,
    title: "Sample Listing 3",
    price: "900",
    location: "Campus C",
    description: "Affordable and clean",
    image: "/sofa.png",
    status: ["Available", "Not available"],
  },
  {
    id: 4,
    title: "Sample Listing 4",
    price: "1500",
    location: "Campus D",
    description: "Luxury item",
    image: "/sofa.png",
    status: ["Available", "Not available"],
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  phoneNumber: "Phone Numner",
  campusName: "Campus Name",
  location: "Location",
  profilePhoto: "Upload your Profile Photo",
  password: "Password",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  phoneNumber: "text",
  location: "text",
  campusName: "text",
  studentLocation: "text",
  profilePhoto: "file",
  password: "password",
};
