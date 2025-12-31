import CelebrationIcon from "./CelebrationIcon";

interface DetailCardProps {
  title: string;
  date: string;
  receptionTime: string;
  dinnerTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
}

export default function DetailCard({
  title,
  date,
  receptionTime,
  dinnerTime,
  venueName,
  venueAddress,
  venueCity,
}: DetailCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-white via-white to-primary/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-accent/30 hover:shadow-2xl hover:scale-[1.02] hover:border-accent/50 transition-all duration-300 overflow-hidden group">
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-accent/20 rounded-tl-2xl group-hover:border-accent/40 transition-colors" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-accent/20 rounded-tr-2xl group-hover:border-accent/40 transition-colors" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/20 rounded-bl-2xl group-hover:border-accent/40 transition-colors" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent/20 rounded-br-2xl group-hover:border-accent/40 transition-colors" />

      {/* Small decorative sparkles in corners */}
      <div className="absolute top-2 left-2 text-accent/30 text-sm group-hover:text-accent/50 transition-colors">✦</div>
      <div className="absolute top-2 right-2 text-accent/30 text-sm group-hover:text-accent/50 transition-colors">✦</div>
      <div className="absolute bottom-2 left-2 text-accent/30 text-sm group-hover:text-accent/50 transition-colors">✦</div>
      <div className="absolute bottom-2 right-2 text-accent/30 text-sm group-hover:text-accent/50 transition-colors">✦</div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6">
          {/* Icon with glow effect */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full group-hover:bg-primary/20 transition-colors" />
              <CelebrationIcon className="relative w-20 h-20" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-pinyon text-3xl font-bold text-primary mb-3">
            {title}
          </h3>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-accent/40" />
            <span className="text-accent/60">❀</span>
            <div className="h-px w-8 bg-accent/40" />
          </div>

          {/* Date */}
          <p className="font-pinyon text-2xl text-primary/80">
            {date}
          </p>
        </div>

        {/* Details Section */}
        <div className="space-y-5 text-center">
          {/* Reception Time */}
          <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5 font-medium">
              Đón Khách
            </p>
            <p className="font-serif text-lg text-foreground font-semibold">
              {receptionTime}
            </p>
          </div>

          {/* Dinner Time */}
          <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1.5 font-medium">
              Khai Tiệc
            </p>
            <p className="font-serif text-lg text-foreground font-semibold">
              {dinnerTime}
            </p>
          </div>

          {/* Venue */}
          <div className="pt-4 border-t-2 border-accent/20">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3 font-medium">
              Địa Điểm
            </p>
            <p className="font-serif text-xl text-primary font-bold mb-2">
              {venueName}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {venueAddress}
            </p>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              {venueCity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
