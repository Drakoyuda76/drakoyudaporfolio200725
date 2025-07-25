import { supabase } from '@/integrations/supabase/client';
import type { Solution } from '@/types/solution';

export const getSolutionsFromDB = async (): Promise<Solution[]> => {
  const { data, error } = await supabase
    .from('solutions')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching solutions:', error);
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || '',
    description: item.description,
    problemSolution: item.problem_solution || '',
    humanImpact: item.human_impact || '',
    sustainabilityImpact: item.sustainability_impact || '',
    businessAreaImpact: (item.business_area_impact || []) as any,
    sdgGoals: item.sdg_goals || [],
    images: (item.images || []).map(url => ({ id: crypto.randomUUID(), title: '', description: '', imageUrl: url })),
    timesSaved: parseInt(item.times_saved) || 0,
    usersImpacted: parseInt(item.users_impacted) || 0,
    status: (item.status as any) || 'conceito',
    createdAt: new Date(item.created_at),
    updatedAt: new Date(item.updated_at),
  }));
};

export const saveSolutionToDB = async (solution: Solution): Promise<boolean> => {
  try {
    const solutionData = {
      id: solution.id,
      title: solution.title,
      subtitle: solution.subtitle,
      description: solution.description,
      problem_solution: solution.problemSolution,
      human_impact: solution.humanImpact,
      sustainability_impact: solution.sustainabilityImpact,
      business_area_impact: solution.businessAreaImpact,
      sdg_goals: solution.sdgGoals,
      images: solution.images.map(img => img.imageUrl),
      times_saved: solution.timesSaved.toString(),
      users_impacted: solution.usersImpacted.toString(),
      status: solution.status,
    };

    const { error } = await supabase
      .from('solutions')
      .upsert(solutionData);

    if (error) {
      console.error('Error saving solution:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving solution:', error);
    return false;
  }
};

export const deleteSolutionFromDB = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('solutions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting solution:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting solution:', error);
    return false;
  }
};