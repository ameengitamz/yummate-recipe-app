import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface RecipeCardProps {
  id: string;
  title: string;
  image?: string;
  cookingTime: number;
  servings: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  cuisine?: string;
  onViewDetails?: (id: string) => void;
  onAddToPlanner?: (id: string) => void;
  className?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  cookingTime,
  servings,
  difficulty,
  cuisine,
  onViewDetails,
  onAddToPlanner,
  className = '',
}) => {
  return (
    <Card 
      variant="default" 
      padding="none" 
      hover={true}
      className={`overflow-hidden bg-white/95 border border-yum-primary/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
      onClick={() => onViewDetails?.(id)}
    >
      {/* Recipe Image */}
      <div className="h-48 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-orange-800 text-3xl font-medium">
            🍽️
          </div>
        )}
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3">
          {difficulty && (
            <Badge 
              variant={difficulty === 'Easy' ? 'success' : difficulty === 'Medium' ? 'warning' : 'error'}
              size="sm"
            >
              {difficulty}
            </Badge>
          )}
        </div>
        
        {cuisine && (
          <div className="absolute top-3 right-3">
            <Badge variant="primary" size="sm">
              {cuisine}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Recipe Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-yum-primary-ec mb-3 line-clamp-2">
          {title}
        </h3>
        
        {/* Recipe Stats */}
        <div className="flex items-center gap-4 text-yum-secondary text-sm mb-6">
          <div className="flex items-center gap-1">
            <span>⏱️</span>
            <span>{cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👥</span>
            <span>{servings} servings</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(id);
            }}
          >
            View Details
          </Button>
          
          {onAddToPlanner && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToPlanner(id);
              }}
            >
              ✅
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
