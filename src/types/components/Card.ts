interface ICard {
  description?: string;
  image?: string;
  price: number;
  title: string;
  category?: string;
}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}


