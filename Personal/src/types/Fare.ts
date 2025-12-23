// CheapestFares Component (Enhanced)
export interface FareCardProps {
  image: string;
  city: string;
  state: string;
  date: string;
  price: string;
}

export const fares = [
    {
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400",
      city: "Bathinda",
      state: "Punjab",
      date: "Sun, 25 Jan",
      price: "1,680",
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      city: "Hissar",
      state: "Haryana",
      date: "Sun, 25 Jan",
      price: "1,949",
    },
    {
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
      city: "Gwalior",
      state: "Madhya Pradesh",
      date: "Wed, 07 Jan",
      price: "2,068",
    },
    {
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400",
      city: "Leh",
      state: "Ladakh",
      date: "Sat, 13 Dec",
      price: "2,460",
    },
    {
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400",
      city: "Dehradun",
      state: "Uttarakhand",
      date: "Tue, 13 Jan",
      price: "2,750",
    },
  ];