export const parse = (data) => {
  const {
    bedrooms,
    city: {
      location: {
        latitude,
        longitude,
        zoom,
      },
      name,
    },
    description,
    goods,
    host: {
      avatar_url: hostAvatar,
      id,
      is_pro: pro,
      name: hostName,
    },
    id: offerId,
    images,
    is_favorite: favourite,
    is_premium: isPremium,
    location: {
      latitude: offerLatitude,
      longitude: offerLongitude,
      zoom: offerZoom,
    },
    max_adults: maxAdults,
    preview_image: previewImage,
    price,
    rating,
    title,
    type,

  } = data;

  return ({
    bedrooms,
    conveniences: goods,
    coordinates: [offerLatitude, offerLongitude],
    zoom: offerZoom,
    cost: price,
    description: [description],
    guests: maxAdults,
    id: offerId,
    owner: {
      avatar: hostAvatar,
      name: hostName,
      pro,
      id,
    },
    pictures: images,
    previewImage,
    premium: isPremium,
    favourite,
    rating,
    title,
    type,
  });
};

export const groupBy = () => {

};
