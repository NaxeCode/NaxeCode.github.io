'use client';

import { motion } from 'framer-motion';
import { Badge } from '@stargazers-stella/cosmic-ui';
import type { SkillsCategory } from '@/types/skill';

export function SkillsVisualization({ categories }: { categories: SkillsCategory[] }) {
  return (
    <div className="grid gap-8">
      {categories.map((category, i) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-foreground">{category.category}</h3>
          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className="bg-primary/20 text-primary border-primary/30 cursor-pointer text-base py-2 px-4"
                  title={skill.description || skill.name}
                >
                  {skill.icon && <span className="mr-2">{skill.icon}</span>}
                  {skill.name}
                  {skill.proficiency && (
                    <span className="ml-2 opacity-70 text-sm">
                      {'★'.repeat(skill.proficiency)}
                    </span>
                  )}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
