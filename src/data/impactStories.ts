/**
 * Single source of truth for Impact Stories (until dynamic/CMS backend).
 * Used by both the list page and the story detail component.
 */

export interface ImpactStory {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  location: string;
  category: string;
  author: string;
  authorRole: string;
  content: string;
  isFeatured?: boolean;
}

export const impactStories: ImpactStory[] = [
  {
    id: 1,
    title: "From Subsistence to Success: Women Entrepreneurs Thrive in Kabare",
    excerpt: "Meet the women of Kabare who turned small loans into thriving businesses, creating sustainable income for their families.",
    content: `In the heart of Kabare, a quiet revolution is taking place. What began as a small economic empowerment initiative has blossomed into a network of successful women entrepreneurs transforming their community. Through our microfinance program, women receive not just financial support but also business training and mentorship.\n\nOne such success story is that of Nalongo, a mother of three who started with a small loan of 500,000 UGX. Today, her grocery store employs four other women from the community. "Before this program, I couldn't afford school fees for my children," Nalongo shares. "Now, I'm not just providing for my family, I'm helping others in my community."\n\nThe program focuses on sustainable business models, teaching women how to manage finances, market their products, and reinvest in their businesses. To date, we've helped establish over 200 women-led businesses in Kabare, with a 95% loan repayment rate and an average income increase of 300% among participants.`,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "15 Jun 2024",
    readTime: "6 min read",
    location: "Kabare, Uganda",
    category: "Economic Empowerment",
    author: "Sarah Nalwoga",
    authorRole: "Economic Development Officer",
  },
  {
    id: 2,
    title: "Bridging the Healthcare Gap: Mobile Clinics Reach Remote Villages",
    excerpt: "Our mobile health units are bringing essential medical care to the doorsteps of women and children in Uganda's most remote communities.",
    content: `In the remote villages surrounding Kabare, access to basic healthcare has long been a challenge. Many women would walk for hours, sometimes days, to reach the nearest medical facility. Our mobile clinic initiative is changing this reality, one village at a time.\n\nEach week, our fully equipped mobile units visit different communities, providing prenatal care, vaccinations, family planning services, and health education. The impact has been profound. In the past year alone, we've conducted over 5,000 medical consultations and provided critical care to more than 2,000 women and children.\n\n"Before the mobile clinic came to our village, many women gave birth at home without any medical assistance," explains Nurse Prossy, who leads one of our mobile units. "Now, we're seeing more women accessing prenatal care, and the number of safe deliveries has increased significantly." The program also focuses on health education, teaching communities about nutrition, hygiene, and disease prevention.`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "28 May 2024",
    readTime: "7 min read",
    location: "Rural Kabare, Uganda",
    category: "Health Support",
    author: "Dr. James Ochieng",
    authorRole: "Medical Director",
  },
  {
    id: 3,
    title: "Breaking the Silence: Community-Led GBV Prevention in Kampala",
    excerpt: "How grassroots initiatives are empowering communities to prevent and respond to gender-based violence in urban Uganda.",
    content: `In the bustling neighborhoods of Kampala, a quiet revolution against gender-based violence is gaining momentum. Our community-based GBV prevention program trains local leaders, both men and women, to recognize, prevent, and respond to gender-based violence in their communities.\n\nThe program has established 15 community action groups across the city, each trained in conflict resolution, legal rights, and support services. These groups work closely with local authorities to ensure survivors receive the help they need while working to change the attitudes that perpetuate violence.\n\n"We're not just responding to cases of GBV; we're preventing them before they happen," explains Amina Nalubega, a community mobilizer. Through workshops, community dialogues, and school programs, the initiative has reached over 10,000 people with messages about gender equality and healthy relationships. The results speak for themselves: a 40% reduction in reported GBV cases in participating communities over the past year.`,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    date: "12 May 2024",
    readTime: "8 min read",
    location: "Kampala, Uganda",
    category: "GBV Prevention",
    author: "Grace Nakimera",
    authorRole: "GBV Program Coordinator",
  },
  {
    id: 4,
    title: "Back to School: Keeping Girls in Education Beyond Primary Level",
    excerpt: "Our scholarship program is breaking down barriers to education for girls in rural Uganda, one student at a time.",
    content: `In rural Uganda, many girls face significant barriers to continuing their education beyond primary school. Long distances to schools, early marriages, and financial constraints often force young girls to drop out. Our Girls' Education Initiative is tackling these challenges head-on.\n\nThrough a comprehensive scholarship program, we provide school fees, uniforms, books, and mentorship to girls who would otherwise be unable to continue their education. But our support goes beyond financial assistance. We've established safe boarding facilities, trained teachers in gender-sensitive teaching methods, and created peer support networks.\n\nThe results have been remarkable. In the past three years, we've supported over 300 girls through secondary school, with a 95% completion rate. Many of our graduates have gone on to university or vocational training, breaking the cycle of poverty in their families. "Education has given me a voice and the power to dream," says 17-year-old Prossy, one of our scholarship recipients. "I want to become a doctor and help others in my community."`,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    date: "22 Apr 2024",
    readTime: "7 min read",
    location: "Kabare, Uganda",
    category: "Education",
    author: "Rebecca Namutebi",
    authorRole: "Education Program Manager",
  },
  {
    id: 5,
    title: "Leading the Way: Women Shaping Uganda's Future",
    excerpt: "Meet the women breaking barriers and taking on leadership roles in their communities and beyond.",
    content: "In a country where women's leadership has often been sidelined, our Women in Leadership program is creating a new generation of female leaders. Through leadership training, mentorship, and networking opportunities, we're equipping women with the skills and confidence to take on decision-making roles in their communities and workplaces.\n\nThe program has already trained over 500 women in leadership skills, public speaking, and community mobilization. Many of these women have gone on to run for local office, start community initiatives, or take on leadership roles in their workplaces.\n\nOne such leader is Harriet, who completed our program last year and is now the first female chairperson of her local council. \"Before this program, I never thought someone like me could lead,\" Harriet says. \"Now I know that my voice matters, and I'm using it to advocate for better services for women and children in my community.\" The ripple effects of this program are being felt across Uganda, as these women leaders inspire others to follow in their footsteps.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    date: "05 Apr 2024",
    readTime: "8 min read",
    location: "Kampala, Uganda",
    category: "Leadership",
    author: "Juliet Kirabo",
    authorRole: "Leadership Program Director",
  },
];
