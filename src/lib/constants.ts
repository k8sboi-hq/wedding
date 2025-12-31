export const WEDDING_DATA = {
  couple: {
    groom: {
      firstName: "Khoa",
      fullName: "Huỳnh Đăng Khoa",
      englishName: "Daniel",
    },
    bride: {
      firstName: "Sương",
      fullName: "Lưu Nguyễn Hồng Sương",
      englishName: "Rachel",
    },
  },
  dates: {
    mainWedding: {
      date: "2026-01-20",
      dateDisplay: "Ngày 20 Tháng 1, 2026",
      time: "18:00",
      timezone: "Asia/Ho_Chi_Minh",
      description: "At our home in Ho Chi Minh City",
      subtitle: "Ceremony with close family",
    },
    firstParty: {
      date: "2026-01-18",
      dateDisplay: "Sunday, January 18, 2026",
      receptionTime: "18:00 - 21:00",
      dinnerTime: "19:00 onwards",
    },
    secondParty: {
      date: "2026-01-25",
      dateDisplay: "Sunday, January 25, 2026",
      receptionTime: "18:00 - 21:00",
      dinnerTime: "19:00 onwards",
    },
  },
  venues: {
    francisHoi: {
      name: "Francis Hội Restaurant",
      address: "187 Gia Long, Lái Thiêu",
      city: "Thuận An, Bình Dương, Vietnam",
      mapUrl: "https://maps.app.goo.gl/qC6mUctkiKM8V2bP7",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.9631919847536!2d106.71851007583384!3d10.936894556096954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9a7b3e8a5a7%3A0x8b5e6e6e6e6e6e6e!2sFrancis%20H%E1%BB%99i%20Restaurant!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s",
    },
    gardenPlaza: {
      name: "Garden Plaza Saigon",
      address: "170 Nguyen Van Troi Street",
      ward: "Ward 8, Phu Nhuan District",
      city: "Ho Chi Minh City, Vietnam",
      mapUrl: "https://maps.app.goo.gl/Edi1Vw3ed3ziP7bJ7",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.239596547837!2d106.67544937583186!3d10.797663589351877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a7c59c91%3A0x6b38b38b38b38b38!2sGarden%20Plaza%20Saigon!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s",
    },
  },
  photos: [
    {
      src: "/assets/wedding-photo-1.webp",
      alt: "Khoa and Sương Wedding Photo 1",
      caption: "Our Beautiful Journey Together",
    },
    {
      src: "/assets/wedding-photo-2.webp",
      alt: "Khoa and Sương Wedding Photo 2",
      caption: "Love in Every Moment",
    },
    {
      src: "/assets/wedding-photo-3.webp",
      alt: "Khoa and Sương Wedding Photo 3",
      caption: "Forever Starts Here",
    },
    {
      src: "/assets/wedding-photo-4.webp",
      alt: "Khoa and Sương Wedding Photo 4",
      caption: "A Promise of Tomorrow",
    },
    {
      src: "/assets/wedding-photo-5.webp",
      alt: "Khoa and Sương Wedding Photo 5",
      caption: "Two Hearts, One Love",
    },
  ],
  musicPlaylist: [
    {
      title: "Hold My Hand",
      artist: "Jess Glynne",
      file: "/assets/hold-my-hand.mp3",
    },
    {
      title: "Marry You",
      artist: "Bruno Mars",
      file: "/assets/marry-you.mp3",
    },
    {
      title: "Never Gonna Give You Up",
      artist: "Rick Astley",
      file: "/assets/never-gonna-give-you-up.mp3",
    },
    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      file: "/assets/a-thousand-years.mp3",
    },
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      file: "/assets/photograph.mp3",
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      file: "/assets/thinking-out-loud.mp3",
    },
    {
      title: "All of Me",
      artist: "John Legend",
      file: "/assets/all-of-me.mp3",
    },
  ],
} as const;

export type WeddingData = typeof WEDDING_DATA;
export type Photo = (typeof WEDDING_DATA.photos)[number];
export type Track = (typeof WEDDING_DATA.musicPlaylist)[number];
