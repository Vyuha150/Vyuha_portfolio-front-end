import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberCardProps {
  name: string;
  position: string;
  email: string;
  number: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  position,
  email,
  number,
  image,
}) => {
  return (
    <Card className="bg-black/80 border border-orange-500 hover:shadow-lg hover:shadow-orange-500/50 hover:border-orange-400 hover:bg-black/90 text-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group">
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-28 h-28 mb-4 relative rounded-lg overflow-hidden border-4 border-orange-500 group-hover:border-orange-400 transition-colors duration-300 group-hover:scale-110">
          <Image
            src={image + ".jpg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="112px"
          />
        </div>
        <h3 className="text-xl font-bold text-orange-500 mb-1 text-center group-hover:text-orange-400 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-gray-300 mb-2 text-center group-hover:text-white transition-colors duration-300">
          {position}
        </p>
        {/* <p className="text-xs text-gray-400 mb-1 text-center group-hover:text-gray-300 transition-colors duration-300">
          {email}
        </p>
        <p className="text-xs text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
          {number}
        </p> */}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
