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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-accent/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <CelebrationIcon className="w-20 h-20" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-primary mb-2">
          {title}
        </h3>
        <p className="font-serif text-lg text-foreground italic">
          {date}
        </p>
      </div>

      <div className="space-y-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            Reception
          </p>
          <p className="font-serif text-lg text-foreground font-semibold">
            {receptionTime}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
            Dinner
          </p>
          <p className="font-serif text-lg text-foreground font-semibold">
            {dinnerTime}
          </p>
        </div>

        <div className="pt-4 border-t border-accent/20">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            Venue
          </p>
          <p className="font-serif text-lg text-primary font-bold mb-1">
            {venueName}
          </p>
          <p className="text-sm text-muted-foreground">
            {venueAddress}
          </p>
          <p className="text-sm text-muted-foreground">
            {venueCity}
          </p>
        </div>
      </div>
    </div>
  );
}
