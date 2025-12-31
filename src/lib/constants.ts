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
      time: "10:00",
      timezone: "Asia/Ho_Chi_Minh",
      description: "Hôn lễ được cử hành tại TƯ GIA",
      subtitle: "Thành phố Hồ Chí Minh, Việt Nam",
    },
    firstParty: {
      date: "2026-01-18",
      dateDisplay: "Chủ Nhật - 18.01.2026",
      receptionTime: "11:00 - 11:30",
      dinnerTime: "12:00",
    },
    secondParty: {
      date: "2026-01-25",
      dateDisplay: "Chủ Nhật - 25.01.2026",
      receptionTime: "11:00 - 11:30",
      dinnerTime: "12:00",
    },
  },
  venues: {
    francisHoi: {
      name: "Francis Hội Restaurant",
      address: "187 Gia Long, Lái Thiêu",
      city: "Tp. Hồ Chí Minh(Thuận An, Bình Dương cũ), Việt Nam",
      mapUrl: "https://maps.app.goo.gl/qC6mUctkiKM8V2bP7",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.9631919847536!2d106.71851007583384!3d10.936894556096954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9a7b3e8a5a7%3A0x8b5e6e6e6e6e6e6e!2sFrancis%20H%E1%BB%99i%20Restaurant!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s",
    },
    gardenPlaza: {
      name: "Garden Plaza Saigon",
      address: "309B-311, Nguyễn Văn Trỗi ",
      ward: "P. Tân Sơn Hoà",
      city: "Tp. Hồ Chí Minh, Việt Nam",
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
