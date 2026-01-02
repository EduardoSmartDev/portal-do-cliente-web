export interface HomePageList{
      id: number,
      title: string,
      description: string,
      icon: React.ComponentType,
      color: string,
      link: string,
      tags: string[],
      admin: boolean,
      unlocked: boolean
}