import { SectorCardContent } from '../sectorInterpretations.en';

export type FinanceSectionData = {
    title: string;
    intro?: string;
    comfortZoneText?: string;
    archetype?: string;
    tabs: {
        id: string;
        label: string;
        keywords?: string;
        intro?: string;
        items?: { label: string }[];
        description?: string;
    }[];
};

// Expansion of the financial channel 

export const financeExpansionData: Record<number, FinanceSectionData> = {
    1: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the first energy is the Magician. This energy makes a person focused, capable of immersing themselves in work and creative processes. Such people can be closed, slightly detached from the world, being inside themselves for a long time. Secret knowledge, esotericism attract people with the first energy. Often such people possess extrasensory abilities and well-developed sensitivity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Decisiveness" }, { label: "Persistence" }, { label: "Independence" }, { label: "Attractiveness" },
                    { label: "Leadership" }, { label: "Energy" }, { label: "Communication" }, { label: "Charisma" },
                    { label: "Oratory" }, { label: "Intellectuality" }, { label: "Individuality" }, { label: "Innovation" },
                    { label: "Creativity" }, { label: "Adventurism" }, { label: "Ingenuity" }, { label: "Optimism" }
                ],
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You are able to completely abstract yourself and immerse yourself in activity. You love to study everything: yourself, people, nature, life. You have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are a slow to move and open to any experiment person. Love for something new and pulling toward learning pump your intelligence. Sharp mind and good ingenuity help to non-standardly solve any task. You are an optimist for life and ready to go for risk if necessary. Often possess extrasensory abilities: you thinly feel people and understand them on an intuitive level. If necessary, you can create and manage a team, speak in public to promote your plans and projects. Love to stand out among others, which helps you in work. Have a clear connection with the soul and inner Self, know how to make decisions in the moment. Independence in your thoughts and actions is important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Overstated/understated self-esteem" }, { label: "Inflated ego" }, { label: "Closedness" }, { label: "Suppression of others" },
                    { label: "Powerfulness" }, { label: "Conflictness" }, { label: "Aggression" }, { label: "Uncertainty" }, { label: "Pride" },
                    { label: "Indecisiveness" }, { label: "Intolerance" }, { label: "Self-interest" }, { label: "Manipulations" },
                    { label: "Secretiveness" }, { label: "Impatience" }, { label: "Loneliness" }, { label: "Vindictiveness" }, { label: "Envy" }
                ],
                description: "Energy in minus can manifest itself as overstated or understated self-esteem. In most cases, the manifestation of overstated self-esteem is characteristic, which can lead to frequent conflicts with other people. You can behave aggressively, arrogantly, infringe upon and condemn everyone around. Another variant is understated self-esteem. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. You want to try everything at once, grab different activities and in the end do not bring anything to the finish, drop the case halfway. Also you can suppress others for your own, sometimes selfish goals. You begin to manipulate and manage, as you know how to feel people well and use this skill. You are vindictive and keep a grudge in yourself for a long time. Painfully perceive any criticism of your ideas. You have a fear of theft of ideas, so you close even from loved ones and do not share your plans. As a result, you lead a secret lifestyle, lose the taste for life, becoming angry and envious."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Skillful management of resources and people" }, { label: "Executive positions" }, { label: "Leadership" },
                    { label: "Ability to delegate" }, { label: "Successful business" }, { label: "Order in business and finances" },
                    { label: "Competently built business processes" }, { label: "Creativity and innovation" }, { label: "Fast generation of ideas" }
                ],
                description: "Money can come through your ability to generate and implement ideas. You are a natural creator and innovator. You think outside the box and can create something new from nothing. Your sharp mind and ingenuity help you find non-standard solutions to any financial challenges. You can start your own business based on your unique ideas. Creativity and creative projects will bring you financial well-being. You can work in advertising, marketing, design, or any field where innovation is valued. Your oratory skills can also generate income, as you can speak publicly, teach, or promote your ideas. Freelance and project work suit you, as you do not like rigid schedules and frames. You can also engage in intellectual work: consulting, coaching, teaching, writing books or articles. Your energy attracts money when you are in a state of flow and inspiration. The more you realize your ideas, the more financial opportunities open up for you. Trust your intuition and do not be afraid to experiment. Money comes to you easily when you are doing what you love."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Leadership positions" }, { label: "Manage resources and people" }, { label: "Run a good business" },
                    { label: "Order in business and money" }, { label: "Know how to delegate wisely" }, { label: "Helping others make money" }
                ],
                description: "Financial growth is the result of wise and deliberate decisions. Develop leadership skills, learn to manage people and resources, and strive for continuous improvement. Be generous and caring with others, help your employees grow professionally. Inspire people, set goals, and strategize the company's growth. Show tenderness and care for your loved ones. Spend time with your family. Build trusting and harmonious relationships with women, especially your mom. Approach any activity in a creative and imaginative way. Realize your ideas, do not leave them in your head. Believe in yourself and your talents. Share your experience and knowledge with other people. Learn to work in a team, unite and help each other. Study secret knowledge, develop intuition and feeling."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You will suit all spheres that are aimed at creativity and innovation. Advertising, marketing, design, IT, programming, writing, art, music, acting, directing, producing. You can work as a freelancer, start your own business, or engage in intellectual work. You are good at generating ideas and implementing them. You can work as a consultant, coach, teacher, or mentor. You can also try yourself in oratory, public speaking, or teaching. You have a talent for communicating with people and can work in sales, negotiations, or customer service. To decide on a course of action, ask yourself questions: What ideas can I generate and implement? What creative projects inspire me? Where can I show my leadership and initiative? What comes easy to me? How can I help people with my knowledge and skills?"
            }
        ]
    },
    2: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development. This is a female archetype that leaves its mark even if it is in the Matrix of men. For this energy, stature is characteristic, which manifests itself in a special attitude toward oneself. Such people love and understand themselves, walking with their heads held high.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Diplomacy" }, { label: "Kindness" }, { label: "Compassion" }, { label: "Intuition" },
                    { label: "Modesty" }, { label: "Romanticism" }, { label: "Mystery" }, { label: "Sensitivity" },
                    { label: "Empathy" }, { label: "Wisdom" }, { label: "Softness" }, { label: "Openness" }, { label: "Communicativeness" }
                ],
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around. You have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation. You will always find the right words, support a person and help. You accept the world and people as they are, without judgment and patterns. Sometimes you can romanticize events, believe in fate and signs of the Universe. You are always calm and know your value. You are selective in everything and love to take care of yourself. Surround yourself with beautiful objects, wear stylish clothes and original handmade jewelry. You know how to relieve physical pain, can be a healer. You can transfer energy to people through creativity: painting, music, creating clothing or jewelry, etc."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Distrust" }, { label: "Uncertainty" }, { label: "Doubts" }, { label: "Inconstancy" }, { label: "Caprices" },
                    { label: "Conflictness" }, { label: "Malice" }, { label: "Confusion" }, { label: "Secretiveness" }, { label: "Tearfulness" },
                    { label: "Hypocrisy" }, { label: "Jealousy" }, { label: "Gossip" }, { label: "Manipulations" }, { label: "Coldness" },
                    { label: "Untidiness" }, { label: "Dependency" }
                ],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn. You doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view. You cannot focus on one thing and confidently move toward the goal. You are thrown from side to side, you doubt the correctness of your actions and depend on the opinions of other people. In the end you can close from everyone, refuse your own realization and harbor a grudge against those around instead of gaining courage to implement the idea. You may have two sides: either you are too jealous, hot-tempered and demanding toward people, or, on the contrary, behave coldly, indifferently. You can excessively fixate on your appearance, forgetting about inner qualities. Or the opposite situation: untidiness, negligence in affairs, mess in the house."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Skillful management of resources and people" }, { label: "Executive positions" }, { label: "Leadership" },
                    { label: "Ability to delegate" }, { label: "Successful business with women" }, { label: "Order in business and finances" },
                    { label: "Wisdom and softness in management" }, { label: "Competently built business processes" }
                ],
                description: "Money can come through working with women. You can open your own beauty salon or dance school to help other women discover their attractiveness. You should pay attention to areas where there is a feminine component. It could be working with children: nanny, tutor, child coach or teacher. Activities related to animals or plants are also suitable: veterinarian, zoologist, animal advocate or florist, owner of a flower boutique, landscape designer. You have a strong energy of abundance and fertility. You don't have to connect your life with these directions, however, having your own small garden with flowers will enhance your energy. You can also engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or the owner of your own business. You know how to properly build work processes, know how to delegate and properly allocate resources. For financial well-being, it is important to love yourself, be in harmony with the world and fulfill your desires. Delegate not only at work, but also at home. There's no need to shoulder all the household chores yourself. Get creative. You have an earthy energy, so try not to cling to material possessions. Money will come to you anyway if the energy is on the plus side."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Management positions" }, { label: "Manage resources and people" }, { label: "Run a good business" },
                    { label: "Order in business and money" }, { label: "Know how to delegate wisely" }, { label: "Business with women" },
                    { label: "Helping others make money" }
                ],
                description: "Financial growth is the result of wise and deliberate decisions. Develop leadership skills, learn to manage people and resources, and strive for continuous improvement. Be generous and caring with others, help your employees grow professionally. Inspire people, set goals, and strategize the company's growth. Show tenderness and care for your loved ones. Spend time with your family. Build trusting and harmonious relationships with women, especially your mom. Approach any activity in a creative and imaginative way. Develop your intuition, listen to your inner voice. Study spiritual practices, meditations, yoga. Take care of yourself and your body. Do not participate in intrigues and gossip. Be honest. Openly state your feelings and desires. Share knowledge and help with advice."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You will suit all spheres that are aimed at working with women: beauty salon, dance studio, women's spa. You're good at building communication with women. You can work with plants or animals: as a veterinarian, zoologist, animal rights advocate, florist, owning your own flower shop, or pursuing landscape design. You have a strong energy of abundance and fertility. You can also try your hand at working with children: nanny, tutor, sports coach or teacher. You can engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or run your own business. To decide on a course of action, ask yourself questions: In what areas can I bring order? What areas am I interested in? What comes easy to me? Where can I show my leadership skills? How and where can I competently set up my work?"
            }
        ]
    },
    3: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the third arcana is the Empress (female energy). For a more accurate awareness of this energy, it is important to understand that the archetype of the Empress implies the presence of an Emperor next to her, so she has no need to become a tough Emperor herself. People with the energy of Empress love beauty, style and comfort. They will strive to surround themselves with good and high-quality things, to achieve a high position in society.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Leadership" }, { label: "Organizational abilities" }, { label: "Self-love" }, { label: "Care for others" },
                    { label: "Responsibility" }, { label: "Success in business" }, { label: "Generosity" }, { label: "Order in affairs" },
                    { label: "Love for comfort" }, { label: "Material prosperity" }, { label: "Taste and sense of style" }, { label: "Authority" },
                    { label: "Natural charm" }, { label: "Attractiveness" }, { label: "Creativity" }, { label: "Kindness" },
                    { label: "Good relations with women" }, { label: "Respect from men" }, { label: "Housekeeping" }, { label: "Sensitivity" }
                ],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround only with beautiful objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex. Success in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes. You have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you. You get along well with children and value family. For men: take more responsibility on yourself, become an authoritative head, provide for relatives materially. Your task is to translate the third energy into the male fourth. For women: you are a beautiful, soft, sexual and sensual woman. Always know your value and are not ready to agree to less. Be a caring keeper of the home hearth, gather relatives together for general holidays, support traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" }, { label: "Soft-bodiedness" },
                    { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Lack of money and career" }, { label: "No relationships" },
                    { label: "Rejection of women" }, { label: "Problems with women" }, { label: "Loneliness" }, { label: "Stinginess" },
                    { label: "Closedness" }, { label: "Obsession with appearance" }, { label: "Untidiness" }, { label: "Infantilism" },
                    { label: "Hyper-control" }, { label: "Hyper-responsibility" }, { label: "Despotism" }, { label: "Pressure on men" },
                    { label: "Tyranny" }, { label: "Choice between career and family" }, { label: "Merchantilism" }, { label: "Calculation" },
                    { label: "Problems with money" }, { label: "Unwillingness to have children" }, { label: "Egoism" }, { label: "Conflicts with women" },
                    { label: "Caprices" }, { label: "Negligence" }, { label: "Workaholism" }
                ],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly. A frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels. Problems in communication with women may arise: you don't respect them, don't accept care and affection, condemn their behavior. As a result, this leads to loneliness and lack of any relationships. For men: it's hard to succeed in male professions and business. Can be soft and indecisive. Often avoid independence and initiative. As a result, you have neither career nor money. Your main task is to translate the third energy into the male fourth. For women: may pressure men and press them. Don't respect their decisions, behave too emotionally and irresponsibly. It's hard to make a choice between family and business, always sacrificing something. Often choose professional realization and refuse to have children, which leads to loneliness and closedness."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Skillful management of resources and people" }, { label: "Management positions" }, { label: "Leadership" },
                    { label: "Ability to delegate" }, { label: "Successful business with women" }, { label: "Order in affairs and finances" },
                    { label: "Competently built business processes" }, { label: "Authority" }, { label: "Wisdom and softness in management" }
                ],
                description: "Money can come through working with women. For example, you could open your own beauty salon or dance school to help other women discover their attractiveness. You should pay attention to areas where there is a feminine component. It could be working with children: nanny, tutor, child coach or teacher. Activities related to animals or plants are also suitable: veterinarian, zoologist, animal advocate or florist, owner of a flower boutique, landscape designer. You have a strong energy of abundance and fertility. You don't have to connect your life with these directions, however, having your own small garden with flowers will enhance your energy. You can also engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or the owner of your own business. You know how to properly build work processes, know how to delegate and properly allocate resources. For financial well-being, it is important to love yourself, be in harmony with the world and fulfill your desires. Delegate not only at work, but also at home. There's no need to shoulder all the household chores yourself. Get creative. You have an earthy energy, so try not to cling to material possessions. Money will come to you anyway if the energy is on the plus side."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Leading posts" }, { label: "Management of resources and people" }, { label: "Good business conduct" },
                    { label: "Order in affairs and money" }, { label: "Ability to wisely delegate" }, { label: "Business with women" },
                    { label: "Helping others in earning money" }
                ],
                description: "Financial growth is the result of wise and thought-out decisions. Develop leadership qualities in yourself, learn to manage people and resources, strive for constant improvement. Be generous and caring with people, help subordinates grow professionally. Inspire people, set goals, think through the company development strategy. Show tenderness and care to loved ones. Spend time with family. Build trusting and harmonious relationships with women, especially with mother. Approach any activity creatively and imaginatively. For men: develop male qualities, take responsibility for the team. Provide for family, become head and support. Be generous. Don't conflict with women. Become an authoritative leader. For women: manage people through wisdom and softness. Develop femininity, accept men and material benefits from them. Support your partner. Fix relations with mom. Create your family, raise children. Develop generosity. Learn to combine career, raising children and household."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "All spheres that are directed at work with women will suit you: beauty salon, dance studio, female spa salon. You're good at building communication with women. You can work with plants or animals: veterinarian, zoologist, animal protector, florist, own flower boutique or engage in landscape design. You have strong energy of abundance and fertility. Also can try your strength in work with children: nanny, educator, sports coach or teacher. Can engage in activity that will be directed at setting order, solving housekeeping questions and managing a company. You can be a manager in an organization, deputy director or manage own business. To decide on the direction of activity, ask yourself questions: In what processes can I set order? What spheres are interesting to me? What comes easy to me? Where can I show my leadership qualities? How and where can I competently set up work?"
            }
        ]
    },
    4: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision. People born with this energy have a certain attitude toward themselves - they love when they are admired and respected, and when their opinion is considered. The archetype of the Emperor, as a rule, does not manifest in a desire to serve someone or something; rather - he prefers to be in the role of a ruler, managing processes and people.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Carefulness" }, { label: "Housekeeping" }, { label: "Leadership" }, { label: "Calm" },
                    { label: "Confidence" }, { label: "Responsibility" }, { label: "Work capacity" }, { label: "Organizational skills" },
                    { label: "Logicality" }, { label: "Reliability" }, { label: "Purposefulness" }, { label: "Authority" }, { label: "Charisma" }
                ],
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance in your career, occupying high positions in the company. You value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you. People around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You have good diplomatic skills: you skillfully conduct negotiations and successfully reach agreements with people. You are a strong leader and a charismatic person. Your priority is to give the family a decent level of life and provide for them materially. For loved ones, you are an authority; your advice is listened to and trusted. For women: your task is to try to translate the fourth energy into the plus third. You like to be in the society of men and easily find a common language with them. But for harmonious relationships, do not forget about your tenderness and softness. Try to devote more time to yourself and caring for your body."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: TYRANNY, WEAKNESS, CHAOS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Authoritativeness" }, { label: "Tyranny" }, { label: "Obsession with the material" }, { label: "Hyper-control" },
                    { label: "Aggression" }, { label: "Inaction" }, { label: "Whining" }, { label: "Irresponsibility" }, { label: "Weakness" },
                    { label: "Uncertainty" }, { label: "Stubbornness" }, { label: "Jealousy" }, { label: "Fussiness" }, { label: "Cruelty" },
                    { label: "Belligerence" }, { label: "Disrespect for men" }, { label: "Intolerance" }, { label: "Criticality" },
                    { label: "Conflict nature" }, { label: "Categoricalness" }, { label: "Loneliness" }, { label: "Greed" }
                ],
                description: "Energy in minus can manifest in two ways. The first option is tyranny and despotism. You interfere in all working processes and family affairs. You abuse power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you show aggressiveness and cruelty toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy. In the second option, on the contrary, inaction and weak-character are manifested. Constant doubts in your own decisions prevent you from taking decisive steps, and you are prone to complaints about the injustice of life, which leads to passivity and laziness. You can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. For women: your main task is to try to translate the fourth energy into the female third. Excessive harshness and increased demandingness at work create tension in the collective. You behave like an authoritarian leader, interfering in the private affairs of each family member."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Creating order" }, { label: "Control of processes, but in moderation" }, { label: "Responsibility" },
                    { label: "Competent management of people and resources" }, { label: "Authority and respect" }, { label: "Own business" },
                    { label: "Leadership" }, { label: "Generosity to employees" }, { label: "Successful business with men" }
                ],
                description: "You are a strong and self-confident person. You know your value, observe order in affairs and skillfully manage people. Money will come through manifestation of emperor qualities: leadership, taking responsible decisions, independence, authoritativeness. You have abilities for creating own business or managing several companies. It is important to focus your efforts on strategic planning. Operational activity can be delegated to experienced managers. Set global goals and motivate the team for achievement of set results. Employees often turn to you for advice, as they see in you an authoritative and wise leader. Help them grow professionally. This will strengthen your money flow. For women: you easily succeed in working with men, so you can create own business oriented at men or work in a male collective. You are responsible, decisive, know how to effectively organize processes and manage the team. You have strong leadership energy by nature. However try to translate your fourth energy into the plus third and show more female qualities. For financial well-being learn to love yourself and feel your desires. Be in harmony with yourself. Delegate not only at work, but also at home."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Create order" }, { label: "Moderate control, responsibility" }, { label: "Management of people and resources" },
                    { label: "Power without tyranny" }, { label: "Own projects and business" }
                ],
                description: "Strong-willed decisions and a strong character attract financial success into your life. You must be ready to carry responsibility not only for yourself, but also for your team. Refuse from the habit of doubting and don't be afraid to make decisions. For men: establish relations with father and respect his advice. Help people grow professionally. Respect needs and opinion of other people. Take responsibility for your life, independently make decisions. Get rid of aggression. Don't suppress people. Become defender and reliable support for family. For women: accept material benefits, trust men, cooperate with men, be feminine and soft. For financial well-being learn to love yourself and feel your desires. Delegate not only at work, but also at home. Engage in creativity, more often communicate with other women. Learn softness and tenderness."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "For men, money will come through manifestation of Emperor qualities: leadership, taking responsible decisions, independence, authoritativeness. You can start your own business or manage different companies, focusing only on strategic planning. Set global goals and motivate the team for achievement of set results. For women, it's easy to work with men, so one can create own business directed at men or work in a male collective. One can also engage in activity that will be related to bringing order, solving housekeeping questions and management of a company. You can be a manager in an organization, deputy director or owner of own business. To decide on direction of activity, ask yourself questions: Where can I bring order? How can I show my leadership qualities? Where can I build effective work?"
            }
        ]
    },
    5: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest. These are people of high intellect, they understand more than others, and are ready to teach and give advice when necessary. In a positive manifestation, people possessing the fifth energy are characterized by calm, poise, openness and smiling nature. They value traditions and rituals, their energy is filled with conservative values.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Love for learning" }, { label: "Oratory skills" }, { label: "Management skills" }, { label: "Conservatism" },
                    { label: "Desire to teach" }, { label: "Help to loved ones" }, { label: "Family orientation" }, { label: "Love for traditions" },
                    { label: "Professionalism" }, { label: "Correctness" }, { label: "Systematic nature" }, { label: "Pedantry" },
                    { label: "Accuracy" }, { label: "Logicality" }, { label: "Order in affairs" }, { label: "Responsibility" },
                    { label: "Reliability" }, { label: "Kindness" }
                ],
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony. You can be a leader and a good manager, but you don't strive for it. You are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others. You love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Another way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Intolerance" }, { label: "Conflict nature" }, { label: "Emotionality" }, { label: "Egoism" },
                    { label: "Hyper-control" }, { label: "Judgment" }, { label: "Pride" }, { label: "Desire to suppress and teach" },
                    { label: "Limitation" }, { label: "Categoricalness" }, { label: "Harshness" }, { label: "Arrogance" },
                    { label: "Unwillingness to pass knowledge" }, { label: "Uncertainty" }, { label: "Fear of competition" },
                    { label: "Desire to argue" }, { label: "Rebellion" }, { label: "Fanaticism" }, { label: "Excessive correctness" }, { label: "Problems with family" }
                ],
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. You may start to control everyone around, stop trusting people, acknowledge only your truth. You are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice. There may be problems with family and creating relationships. Especially important are your relationships with father."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Good relationships with father" }, { label: "Constant learning" }, { label: "Passing knowledge" },
                    { label: "Trying the new" }, { label: "Creating order, following rules" }, { label: "Skill of management and organization" },
                    { label: "Professionalism" }, { label: "Reliability" }, { label: "Responsibility" }, { label: "Oratory skills" },
                    { label: "Organization of an effective system" }, { label: "Clear structure" }, { label: "Order in business and finances" }
                ],
                description: "Money can come through learning the new and passing your knowledge to other people. Think about how you can pass information. Engage in education. You have a good voice and oratory skills. You can try yourself as a teacher, mentor, orator, business trainer or diplomat. Develop these skills and use them in your business. You are inclined to organization and systematization of everything that surrounds you. Strive for order, structure and logic in everything you do. You know how to work with systems, find and fix errors, structure processes. Activity where you can manifest these qualities will suit you - developer, system administrator, IT specialist, programmer. Or it can be work related to creating a system - accountant, lawyer, politician, economist, financier, head of company or department. Also your energy is influenced by family relationships, if there is discord, then it will negatively affect finances. Especially important is your connection with father. Maintain warm relations with relatives, gather together more often, celebrate holidays and observe family traditions."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Good relationships in the family" }, { label: "New knowledge" }, { label: "Passing knowledge" },
                    { label: "Creating order and rules" }, { label: "Structuredness" }, { label: "Order in affairs and finances" }
                ],
                description: "The more you learn and pass knowledge to others, the more your financial flow. It is very important to be not just a theorist, but use knowledge in practice, teach others. Become a teacher, mentor, help people. You know well how to organize the team and working processes, conduct negotiations, inspire people and maintain order. Acknowledge different knowledge and systems. Don't get fixated on one thing. Study new information, expand your horizon. Think positively. Pass accumulated knowledge to others. Develop oratory skills. Create and maintain family traditions. Spend time with family. Listen to your intuition. Reduce control regarding loved ones, relate to others with patience and respect. Inspire and motivate people."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money can come through learning the new and passing your knowledge to other people. Also you have a good voice and oratory skills. You can try yourself as a teacher, orator, business trainer or diplomat. You know how to work with systems, find and fix errors, structure processes. Activity where you can manifest these qualities will suit you - developer, system administrator, IT specialist, programmer. Or it can be work related to creating a system - accountant, lawyer, politician, economist, financier, head of company or department. Family relationships will also influence money, therefore maintain harmonious relations with relatives, spend time together more often. To decide on direction of activity, ask yourself questions: What can I teach other people? How can I create an effective system? What and how can I structure? Where can I create rules and watch over order? Where do I see errors and how can I fix them?"
            }
        ]
    },
    6: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the sixth energy is the Lovers. This is a structureless, soft, enveloping energy directed at relationships and manifestation of love for oneself, others, a cause, a process. Also, it is the energy of interaction and communication. It represents a complex arcana that can cause difficulties in understanding due to the absence of a clear structure and archetypal form. The energy of this archetype is very sensitive and therefore does not always yield to logical analysis.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Loving nature" }, { label: "Communicability" }, { label: "Artistry" }, { label: "Charm" },
                    { label: "Attractiveness" }, { label: "Sensuality" }, { label: "Communication skills" }, { label: "Sense of taste and style" },
                    { label: "Amorousness" }, { label: "Ability to organize" }, { label: "Loyalty" }, { label: "Adaptability" },
                    { label: "Carefulness" }, { label: "Selflessness" }, { label: "Festivity" }, { label: "Emotionality" },
                    { label: "Cling to comfort" }, { label: "Liberalism of views" }, { label: "Attention to details" }
                ],
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love. Love to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language. You like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier. Engage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Living in illusions" }, { label: "Fixation on relationships" }, { label: "Frequent change of partners" },
                    { label: "Inability to make a choice" }, { label: "Doubts" }, { label: "Vulnerability" }, { label: "Depressive nature" },
                    { label: "Uncommunicativeness" }, { label: "Infantilism" }, { label: "Idealism" }, { label: "Revengefulness" },
                    { label: "Touchidness" }, { label: "Fixation on appearance" }, { label: "Egoism" }, { label: "Uncertainty" },
                    { label: "Problems with finances" }, { label: "Apathy" }, { label: "Loneliness" }, { label: "Dependence on people's opinion" },
                    { label: "Impulsivity" }, { label: "Distrust" }, { label: "Self-dislike" }, { label: "Desire to seem better" }
                ],
                description: "Main minuses by your energy go due to high sensitivity. You idealize and too quickly fall in love, and then for a long time stay in your delusions, which can lead to disappointment in a person. Often fixate on one relationship, and then with difficulty survive the departure. As a result, you may start to chaotically change partners, friends or projects, fearing to be disappointed and remain lonely. In your character exists a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy, don't understand what you want, where to move and where to develop. Start to listen to opinion of other people instead of taking initiative into your hands. If you go too much into idleness and lightness, then problems with finances start and debts appear. Energy in minus is opposite to your energy in plus - you don't love people, lead a closed lifestyle, don't share your successes and worries with anyone."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Trustful relationships with people" }, { label: "Manifestation of love and care" }, { label: "Creating beauty" },
                    { label: "Engaging in favorite business" }, { label: "Organization of people" }
                ],
                description: "Any work with people suits you. Money comes through manifestation of love for self, world, those around and business that you are engaging in. If work does not ignite you, then it will lead energy into minus and block finances. It is contraindicated for you to engage in non-favorite business and work through force. Learn to manifest love and help those around selflessly. Build relationships with colleagues and subordinates only on trust and respect. Don't try to focus on rationality and cold calculation, rely on your intuition. You delicately feel people and therefore can be a good HR specialist, personnel manager, support service specialist or head of department for work with clients. Approach work with fun, create a holiday from any process. You can try yourself in the role of events organizer, PR specialist or marketer. Maintain harmony within yourself and around. Take care of yourself, groom your body and surround with aesthetic things. Activity related to creating beauty may suit you: designer, hairdresser, stylist, makeup artist. Often money comes to you in an indirect way, not directly from your activity. Also money flow can open with the birth of a child. With financial difficulties please yourself, make a gift. If you start to save on yourself, financial flow will close."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Trustful relationships with people" }, { label: "Manifesting love" }, { label: "Creating beauty" },
                    { label: "Engaging in favorite business" }, { label: "Organization of people" }, { label: "Self-care" }
                ],
                description: "For your financial well-being it's important to find favorite business and develop in it. As long as you are in endless searches and illusions, success will not come to you. Believe in yourself and your strength. Listen to your inner voice. Choose a business that you will love with all your soul. Your work should ignite and motivate you. Don't strive for ideal. Do everything through love for self and world. Focus on positive qualities in people. Manifest love for self and care for your body. Give self and others gifts. Visit bright events and arrange thematic parties. Gather together with friends, celebrate holidays. Learn to make independent choice. Learn to forgive people and accept them as they are. Help selflessly and from heart. Don't hold on to past."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You know how to manifest love and help those around selflessly. Your relationships with colleagues and subordinates are built on trust and respect. You delicately feel people and therefore can be a good HR specialist, personnel manager, support service specialist or head of department for work with clients. Approach work with fun, create holiday from any process. You can try yourself in the role of events organizer, PR specialist or marketer. Maintain harmony within yourself and outside. Take care of yourself, groom your body and surround with aesthetic things. Activity related to creating beauty may suit you: designer, hairdresser, stylist, makeup artist. Don't doubt yourself and listen to your intuition. It is contraindicated for you to engage in non-favorite business, only for the sake of money."
            }
        ]
    },
    7: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy). In classic Tarot, this arcana is called The Chariot, which symbolizes movement and heralds changes and new opportunities. The seventh energy has a clearly manifested light and dark sides: plus manifestation - movement forward, leadership, constructiveness; negative manifestation - aggression and destruction.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Goal-orientedness" }, { label: "Leadership" }, { label: "Responsibility" }, { label: "Skill to lead" },
                    { label: "Recognition" }, { label: "Teamwork" }, { label: "Decisiveness" }, { label: "Activity" }, { label: "Ambition" },
                    { label: "Flexibility" }, { label: "Organizedness" }, { label: "Control of emotions" }, { label: "Respect for people" },
                    { label: "Optimism" }, { label: "Work capacity" }
                ],
                description: "Male volitional energy. You are a leader and lead people. You are not bothered by appearance, much more important are internal qualities: goal-orientedness, ambition and decisiveness. You set clear goals before yourself and quickly reach them. For the sake of set task you are ready to search for ways to negotiate, know how to be flexible and diplomatic. You throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you. You love activity, it charges you and gives additional resource. It's simply necessary for you to be in movement, starting from sport and travels to educational courses and spiritual practices. Your energy is entrepreneurial. You are independent and ready to take responsibility for self and team, know how to direct people, form strategy and build plans. You are easy on the rise, charge with optimism and energy everyone around."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Destructiveness" }, { label: "Desire to reach goal at any cost" }, { label: "Struggle" }, { label: "Aggression" },
                    { label: "Categoricalness" }, { label: "Overstrain" }, { label: "Workaholism" }, { label: "Dissatisfaction with achievements" },
                    { label: "Loss of goals and sense" }, { label: "Irresponsibility" }, { label: "Fear of leadership" }, { label: "Stagnation" },
                    { label: "Laziness" }, { label: "Apathy" }, { label: "Emotionality" }, { label: "Non-realization" }, { label: "Uncertainty" }, { label: "Fussiness" }
                ],
                description: "Main minuses by your energy are warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force and wish to reach it at any cost. Suffer from own workaholism and force others to work excessively. When reach set goal, still remain dissatisfied with result. Absence of movement and challenge in life lead to stagnation. If you have no concrete goal, then start to lead meaningless struggle in one place, fuss much, commit unnecessary actions, which in the end only takes energy and doesn't lead to desired result. If you feel yourself non-realized and don't understand where to move, then this is a clear sign of energy in minus. Strong emotionality repels people from you and prevents creation of harmonious relationships. You fear taking responsibility and role of leader. There may be problems with decisiveness, for a long time stay in apathy and in one place."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Clear money goals" }, { label: "Leadership" }, { label: "Goal-orientedness" }, { label: "Teamwork" },
                    { label: "Inspiring people" }, { label: "Competently building work processes" }, { label: "Ambition" },
                    { label: "Work capacity" }, { label: "Volitional character" }, { label: "Activity" }
                ],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set daring goals through prism of challenge. For example, set yourself task to earn a million for a certain term. Write down clear steps and follow them. You know how to correctly build work process and organize team so that to reach set goal. Thanks to your leadership skills, you will make a good manager or head. You need to constantly be in active movement: trips, travels, sport, driving car. Develop, learn, find out new. Don't stand in one place. Bring innovations to work projects, motivate team, invent new directions of development and bring started matter to the end. By your nature you are a self-sufficient person: don't depend on circumstances and surrounding opinion. Your goal-orientedness will help reach any goal, you respect personal boundaries of other people and feel yourself comfortable in solitude - these are your strong sides."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Clear money goals" }, { label: "Leading people" }, { label: "Being a leader" },
                    { label: "Working in team and inspiring" }, { label: "Managing processes" }, { label: "Developing strategy" }
                ],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set ambitious goals through prism of challenge. Develop, learn, find out new. Don't stand in one place. Be in movement. Bring innovations into work projects, motivate team, invent new directions of development and bring started matter to the end. Use your potential for peaceful goals, direct energy to creation. Refuse from meaningless struggle and goals that don't motivate you. Make emphasis on your leadership qualities. Manage your emotions and restrain warrior-likeness and aggressiveness. Carefully plan, write down stages of reaching goal, think through strategy. Share your achievements with people, inspire others. Listen to self and trust intuition. Delegate obligations. Engage in spiritual practices and active sport. Lead team behind you, take responsibility."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set daring goals through prism of challenge. You know how to correctly build work process and organize team to reach set goal. Thanks to your leadership skills you will make a good manager or head. You can create own business. You like to be in active movement: trips, travels, sport, driving car, walking on foot. You can link your activity with travels, trips, transport, logistics. Also activity related with professional sport and large physical loads suits you: trainer, instructor. To decide on direction of activity, ask yourself questions: Where can I manifest my leadership qualities? What goals inspire me? How can I throw a challenge to myself? What do I fear? How can I defeat my fear? Where do I want to move?"
            }
        ]
    },
    8: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The eighth energy, by its nature, doesn't yield to rigid definition of archetype. To the greatest degree it's corresponded by description Balinese esotericist. Owners of the eighth energy can convey to those around state of harmony and pacification, however also they easily can slide into aggression and destruction. This energy can be considered the most dual in the matrix: it has two absolutely opposite sides - light (calm) and dark (destructive).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Reliability" }, { label: "Responsibility" }, { label: "Openness" }, { label: "Kindness" },
                    { label: "Honesty" }, { label: "Loyalty" }, { label: "Courage" }, { label: "Confidence" }, { label: "Logicalness" },
                    { label: "Insightfulness" }, { label: "Adaptability" }, { label: "Pedantry" }, { label: "Intuition" },
                    { label: "Diplomacy" }, { label: "Correctness" }
                ],
                description: "Energy of justice and calmness. You are a peaceful and kind person, it's hard to get you out of yourself, however, if this happens, you become irritable and aggressive. For you it's important to find balance in all spheres of life. If balance is not there, then you will snap at those around. Also you can help others find their balance, for example, with help of meditations, spiritual practices and even usual heart-to-heart conversations. For you it's important that everything is honest and by law. You always are in search of truth, but learn to do this through acceptance, kindness and open dialogue. Without aggression and excessive emotionality. You protect rights of other people and are ready to stand on side of the weak. Perceive whole world through prism of depth and logic. You dive into work processes or family situations with head, reach the essence, sorting out each detail. Very consistent, reliable, always keep your word and ready to take responsibility. You have leadership energy, you know how to communicate with people and form professional team."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Conflictness" }, { label: "Categoricalness" }, { label: "Aggression" }, { label: "Sharpness" },
                    { label: "Pride" }, { label: "Hot-temperedness" }, { label: "Loss of balance" }, { label: "Irresponsibility" },
                    { label: "Self-criticalness" }, { label: "Touchiness" }, { label: "Manipulations" }, { label: "Lie" },
                    { label: "Revengefulness" }, { label: "Cruelty" }, { label: "Infidelity" }
                ],
                description: "Full opposite of energy in plus. You in aggressive manner prove your rightness, which leads to frequent quarrels and conflicts with people. If in your life there are courts, then this is a clear sign of energy in minus. You need to learn to negotiate with those around. Often your pride prevents recognizing own wrongness. If in life there is no balance, then you are thrown from extreme to extreme. You don't recognize existence of other points of view. Suppress people, often argue. Can behave sharply and hot-temperedly. Judge actions of others, refuse to understand them. Try to control loved ones and manipulate them. Often same situations in life repeat. Need to learn to notice them and try to lead energy out of minus. Always search for your balance. If engage in own business, then legally and with payment of all taxes. If relationships, then open and honest. Be loyal to your partner."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Study of deep knowledge" }, { label: "Search for justice and balance" }, { label: "Conveying knowledge" },
                    { label: "Honesty" }, { label: "Openness" }, { label: "Leadership" }, { label: "Calmness" }, { label: "Logical thinking" }
                ],
                description: "Money will come through balance and inner calmness. Focus on your personal equilibrium, don't go into extremes, maintain zen within yourself. Help other people find their balance. One can engage in meditations and spiritual practices. Work with people suits you: psychologist, coach, mentor. Your energy is about justice, therefore you mustn't use cunning and quick schemes of earning, manipulate people and deceive clients. In opposite case money will quickly leave you. Lead business openly and officially with conclusion of agreement. In organization you can be head of department or general director. Also professions related with law suit: lawyer, attorney, judge. You love to study deep knowledge and dive into details. You have good analytical thinking - you can use this in your work. You will make a good data analyst, business analyst, systems analyst, developer, accountant, project manager."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Observance of balance and inner calmness" }, { label: "Conveying knowledge" }, { label: "Honesty and openness in affairs" },
                    { label: "Leadership" }, { label: "Calmness" }, { label: "Logical thinking" }, { label: "Creativity" },
                    { label: "Study of deep knowledge" }, { label: "Justice" }, { label: "Order and structuring" }
                ],
                description: "Financial growth for person with eighth energy depends on maintaining balance and inner calmness. Focus on your personal equilibrium, don't go into extremes, maintain zen within yourself. Avoid use of cunning and quick schemes of earning, as well as manipulating people and deceiving clients. Honesty and reliability in business relationships contribute to long-term financial success. Research deep knowledge in your field and dive into details. Your analytical thinking will help you take substantiated financial decisions and create effective strategies. Always remember about importance of equilibrium in life and work. Maintain zen within yourself, what will allow you to take thought-out and balanced decisions in financial issues. Don't judge acts of other people. Preserve inner balance. Study deep knowledge and cause-and-effect links. Observe laws, be honest and open. Keep your word. Search for justice through wisdom and open dialogue. Show your true feelings to other people. Convey your knowledge further."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through balance and inner calmness. Help other people find their balance. One can engage in meditations and spiritual practices. Work with people suits you: psychologist, coach, mentor. In organization you can be head of department or general director. Also professions related with law suit: lawyer, attorney, judge. You have good analytical thinking - can use this in your work. You will make a good data analyst, business analyst, systems analyst, developer, accountant, project manager. One can create own business and engage in management. To decide on direction of activity, ask yourself questions: Where do I see injustice and how can I fix it? How can I help others find balance? How can I balance the system? Where can I add harmony? Where can I manifest my analytical skills?"
            }
        ]
    },
    9: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of the ninth energy - sage-hermit. This is a closed energy which loves to go into self, into its inner cave, where person can be alone with self. From birth people with ninth energy are endowed with light of wisdom, which they can convey to others. To such people characteristic is constant striving to self, to knowledge laid within self.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Loyalty" }, { label: "Calmness" },
                    { label: "Seclusion" }, { label: "Learning new" }, { label: "Understanding people" }, { label: "Tactfulness" },
                    { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Carefulness" },
                    { label: "Attentiveness" }, { label: "Desire to convey knowledge" }, { label: "Modesty" }
                ],
                description: "Sage. Closed energy. You love to dive into self and your thoughts. For you it's comfortable to lead a secluded way of life. It happens that you look a bit from above down on people. Your main task is don't close from world, but on contrary shine and convey your knowledge further, otherwise risk becoming a hermit. From birth you are endowed with special wisdom, you have rich life experience. Know how to interpret situations, give useful advice, thereby help others. You better than rest understand processes and see depth in everything. Subtly feel moods of people, know what's necessary to say and what words to pick. Tactful and attentive to those around. You like solitude and silence, this way you quickly fill with energy. You are a responsible person who thoroughly approaches any question and carefully studies everything. You always can be relied on. You keep your word and fulfill promises."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Reservedness" }, { label: "Excessive asceticism" }, { label: "Dislike for self and people" }, { label: "Pride" },
                    { label: "Judgment" }, { label: "Unwillingness to help" }, { label: "Fear of solitude" }, { label: "Devaluing" },
                    { label: "Distrustfulness" }, { label: "Indiscriminate ties" }, { label: "Problems with money" }, { label: "Neglect" },
                    { label: "Fixation on material" }, { label: "Fear of relationships" }, { label: "Uncertainty" }, { label: "Non-realization" }
                ],
                description: "Secluded way of life leads to reservedness and closedness. You not rarely are alone. Go into asceticness, refusing from all material benefits. Deny money and achievements, what leads to problems with finances. You need to search for balance between spiritual and material. Wisdom and rich experience provoke you to arrogance and pride, you judge people and any their actions. Not rarely consider self smarter and better. Refuse to help people, what even more drives you into solitude. Your energy is subject to impostor syndrome: you are indecisive and constantly doubt in your ideas, fear to convey knowledge to others, since consider that you have insufficient skills and competencies. In end don't realize self and your talents, become apathetic and alone."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Conveying wisdom and knowledge" }, { label: "Reach the essence" }, { label: "Deep knowledge" },
                    { label: "Analytical store of mind" }, { label: "Learning new" }, { label: "Openness" }, { label: "Reliability" },
                    { label: "Positive thinking" }
                ],
                description: "Money will come through wisdom and deep immersion in essence. You like to thoroughly study information, learn new and reach depth of things. You are owner of rich life experience. Convey your wisdom to other people. Those around feel your energy and are drawn to you for advice and help. You can work as psychologist, consultant, mentor, teacher, yogi. You are comfortable being in solitude. You know how to concentrate on your work and not be distracted by extraneous matters. Also you have well developed logical thinking, there is proclivity to analysis and exact sciences. Professions suit you: developer, programmer, trader, technical specialist, accountant, data analyst. Try to avoid constant solitude, otherwise finances will suffer. You are a responsible and reliable person, always keep your word, colleagues and subordinates know that they can rely on you - these are your strong sides."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Lead people behind" }, { label: "Conveying wisdom and knowledge" }, { label: "Analytical thinking" },
                    { label: "Positive thinking" }, { label: "Being open" }, { label: "Learning new" }, { label: "Moderate spending" }
                ],
                description: "For financial success you need to convey your wisdom to others. Share experience, lead people, teach. Be open, don't go into solitude and arrogance. Also you need to cognize deep knowledge, search for truth, reach essence of all things. Search for depth in everything you engage in. Study secret philosophical knowledge and use them for help to others. Open your heart to people, share accumulated experience. Work with emotions and feelings, learn to speak openly. Trust people. Don't fear solitude, enjoy seclusion and silence. Draw strength in walks in solitude. Listen to your intuition. Communicate only with people pleasant for you. Look at past experience as lessons."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through wisdom and deep immersion. You are owner of rich life experience. Convey your wisdom to other people. Those around feel your energy and are drawn to you for advice and help. You can work as psychologist, consultant, mentor, teacher, yogi. It is important to learn to make discoveries through immersion in own world and acceptance of deep laws of life. You are comfortable being in solitude. You know how to concentrate on your work and not be distracted. Also you have well developed logical thinking, proclivity to analysis and exact sciences. Professions suit you: developer, programmer, trader, technical specialist, accountant, data analyst. To decide on direction of activity, ask yourself questions: How can I convey knowledge further? In what activity do I see depth? What is given to me easily? How can I build work process so as to stay in seclusion? Where can I manifest my analytical skills?"
            }
        ]
    },
    10: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of this energy - startupper, player, inspirer. This is the only energy of the matrix that symbolizes luck. In presence of this energy in matrix it is necessary to pay attention to it in first place, since at minus manifestation it will lead person into heaviness. On other hand, at manifestedness in plus, lightness and luck will accompany person in all his undertakings.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" }, { label: "Inspiration" }, { label: "Luck" }, { label: "Openness" }, { label: "Leadership" },
                    { label: "Adventurism" }, { label: "Ideality" }, { label: "Success in matters" }, { label: "Persistence" },
                    { label: "Intuition" }, { label: "Movement" }, { label: "Sociability" }, { label: "Communicativeness" },
                    { label: "Kindness" }, { label: "Optimism" }
                ],
                description: "Energy of luck and inspiration. Lucky one in life. Rules and systems are not important for you, you act only from flow. For your energy constant movement and development is important, you generate many new ideas. Can be a leader, but don't strive for this. You are open to new people, knowledge and experience. Don't bother over details and don't like routine. Any idea can inspire you, you charge up, start movement and thereby attract success to self. To you suddenly right people are encountered, unexpectedly money comes and circumstances turn out successfully. Maintain state of inspiration - this will strengthen your energy. In any circumstances remain cheerful and open. Know how to relax and let go of situation, don't worry over trifles. This only strengthens your energy and attracts even more opportunities into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Heaviness" }, { label: "Tension" }, { label: "Unwillingness to move" }, { label: "Laziness" }, { label: "Passivity" },
                    { label: "Apathy" }, { label: "Suggestibility" }, { label: "Worries" }, { label: "Pessimism" }, { label: "Disrespect to people" },
                    { label: "Inconsistency" }, { label: "Unsystematicness" }, { label: "Stubbornness" }, { label: "Harmful habits" },
                    { label: "Lack of independence" }, { label: "Debts" }, { label: "Fears" }, { label: "Worrisomeness" }
                ],
                description: "Your main minuses are absence of movement. You are initiative-less, no ideas and desire to move forward to your goals. As consequence, you lose inspiration and luck. Harmful habits and problems with money can form. If there is no movement in life, then you go into apathy. Constantly whimsical, judge those around and complain on life. Fears - one more manifestation of your minuses. You fear to take for new matter, don't believe that luck will be on your side. Main rule for you: even if lazy, all the same continue at least some movement. This can be whatever: go for walk in park, start reading book, meet with friends or sign up for courses. Activity will lead your energy into plus and all circumstances themselves will start to turn out in successful way."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Trust in life" }, { label: "Relaxed state" }, { label: "Participation in interesting projects" },
                    { label: "Team work" }, { label: "Skill to organize people" }, { label: "Luck in any matters" },
                    { label: "Different projects" }, { label: "Positive thinking" }, { label: "Strong intuition" }, { label: "Being in the flow" }
                ],
                description: "Money will come through movement and inspiration. Set ambitious goals, focus on what charges and motivates you. Inspire other people. Constantly stay in movement. Fulfill your work easily, but responsibly. Bring what was started to end. In company positions of marketer, advertiser, PR-specialist will suit you. If you are in movement and engage in favorite matter, then luck will accompany you in any matters. You feel flow, in advance see trends and attract necessary people into your life. One can found one's startup and even more than one: from you a good, ambitious entrepreneur will turn out. Don't fixate on one activity, try different. You are an open and positive person, easily make new acquaintances. Your main task is stay in relaxed state. Then large money flow will open, necessary for you events and people will be attracted. Practice acceptance, avoid aggression and laziness."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Trusting the flow of life, being on one's wave" }, { label: "Skill to relax" },
                    { label: "Work in interesting projects" }, { label: "Work in team" }, { label: "Skill to organize people" }
                ],
                description: "Your financial success directly depends on skill to relax and trust Universe. More listen to your intuition, engage in any matter easily and with enthusiasm. As soon as occupation becomes in burden and stops inspiring you, it's time to change it or rest and switch to another activity. Avoid stagnation, eradicate laziness and motivate self to move forward. Travel, go on spontaneous trips. Engage in creativity. Take part in interesting projects which inspire you. Communicate with different people. Refuse from controversial offers which promise easy money. Let go of hypercontrol, stop worrying. Live in moment here and now. Regularly rest, relax. Lead healthy way of life. Work over self-discipline. Be grateful for everything what you already have."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money can come through inspiration, thanks to active activity and constant movement forward. Fulfill your work easily, but responsibly. Help others. In company positions of marketer, advertiser, PR-specialist will suit you. You feel flow, in advance see trends and attract necessary people into your life. One can found one's startup and even more than one: from you a good serial entrepreneur will turn out. Don't fixate on one activity, try different. It's important not to stay in depression and not reproach self for periods of inaction. Learn to listen to own intuition and trust fate. You need to stay in harmonious and relaxed state even at unstable income. Money can come randomly as winning or gift. One must not earn money by heavy physical labor with fixed schedule. This will take your energy. Learn to relax and trust Universe."
            }
        ]
    },
    11: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of the eleventh energy is Strength (masculine energy). At plus manifestation, a person with the eleventh energy is endowed with physical and internal strength. This energy gives the person a strong internal core. Personalities endowed with this energy possess the gift of seeing potential in people and projects, they are ready to invest their forces to help this potential unfold.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Leadership" }, { label: "Responsibility" }, { label: "Capacity for work" }, { label: "Persistence" },
                    { label: "Ambitiousness" }, { label: "Adaptability" }, { label: "Practicality" }, { label: "Curiosity" },
                    { label: "Individuality" }, { label: "Organizational skills" }, { label: "Skill to lead behind self" }, { label: "Charisma" },
                    { label: "Sincerity" }, { label: "Integrity" }, { label: "Desire to create new" }
                ],
                description: "Masculine volitional energy. You are a person with strong character and internal core. Love for work and huge life energy motivate you to move forward. You are practical, search for benefit in everything and build processes maximally effectively, avoiding unnecessary routine and meaningless actions. Constantly study new directions, very curious. Possess ability to see and reveal potential: in advance see perspective in project or person, apply efforts for its revealing. You know exactly what idea can shoot in future and on what need to make a stake. You love to be in first place and feel self a winner. Ready to take responsibility and initiative in your hands, possess leadership entrepreneurial energy. Always strive for individuality, being a charismatic and bright personality. You have good physical strength. Actively engage in sports, you have strong health. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Workaholism" }, { label: "Overstrain" }, { label: "Ignoring problems" }, { label: "Impatience" },
                    { label: "Aggressiveness" }, { label: "Irritability" }, { label: "Suppressing others" }, { label: "Laziness" },
                    { label: "Whining" }, { label: "Rudeness" }, { label: "Powerlessness" }, { label: "Weakness" },
                    { label: "Indecisiveness" }, { label: "Conflictness" }, { label: "Hysteria" }, { label: "Greed" },
                    { label: "Problems with mom" }, { label: "Problems in sex" }
                ],
                description: "Due to excessive workaholism you overstrain too much at work and rest little. Press on people and force to work beyond measure. Become impatient, lead self audaciously and rudely. Or on the contrary, lack of will power and decisiveness force you to be lazy and complain on life, what leads to weak-characteredness. You fear conflicts and try to avoid them, but on other hand cannot control your emotions and start to quarrel without visible reasons. Happen to be petty and greedy. Likely, in childhood there was strong role model in person of mom, who unconsciously suppressed you or self and her desires, what led to tense relationships between you. You don't accept your body and sexuality, constantly ill, lead unhealthy way of life and are shy of your appearance."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Industriousness" }, { label: "Persistence" }, { label: "Leadership" }, { label: "Skill to manage" },
                    { label: "Own projects or business" }, { label: "Physical labor" }, { label: "Organization of people" },
                    { label: "Responsibility" }, { label: "Will power" }
                ],
                description: "Money will come through realization of potential. Engage in work in which you see perspectives for development. You know how to organize people and set clear goals. You see potential not only in work, but in people too. Trust your intuition, listen to inner voice - it will not let you down. From you an excellent head of department, general director or manager will turn out. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. One can create one's business, gather team and go to goals in which you believe. Also your activity can be related with physical labor and work with body, since you have strong health and good endurance. You can engage in sports and reach great heights. Or one can help people gain body of their dreams: fitness trainer, body practitioner, yogi. You have much physical energy, therefore don't be shy to manifest your sexuality. Intimate life will influence arrival of money."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Industriousness" }, { label: "Skill to manage" }, { label: "Use of strength for good" },
                    { label: "Own project or business" }, { label: "Physical labor" }
                ],
                description: "Money will come through realization of potential. Engage in work in which you see perspectives for development. Trust your intuition, listen to inner voice - it will not let you down. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. Learn to manage your strength, use it for good. Engage in sports and lead active healthy way of life. Communicate with successful people, get inspired. Learn to be in state of here and now. Manage your emotions. Think through strategy, record plans and follow them. Be calm and patient. Become leader in your sphere. Learn to yield and go for compromise. Interact with people, and not suppress. More often be on nature. Rest, relax, meditate."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You see potential not only in work, but in people too. Trust your intuition, listen to inner voice - it will not let you down. From you an excellent head of department, general director or manager will turn out. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. One can create one's business. Also your activity can be related with physical labor and body, since you have strong health and good endurance. You can engage in sports and will reach great heights. Or one can help people gain body of their dreams: fitness trainer, body practitioner, yogi, healer. To decide on direction of activity, ask yourself questions: Where do I see potential? What direction do I consider promising? What business can I create? For sake of what goal am I ready to work much? What charges me? Where can I manifest my leadership qualities?"
            }
        ]
    },
    12: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Twelfth energy means suspendedness. Person sees the world as if upside down, differently, in other way, not like others. Exactly because of this given energy is the energy of different vision, innovation and creation of something unique and unusual. They see world and self differently.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" },
                    { label: "Creativity" }, { label: "Compassion" }, { label: "Support" }, { label: "Healing" },
                    { label: "Generation of ideas" }, { label: "Self-discipline" }, { label: "Openness" }, { label: "Love for learning" },
                    { label: "Easy resolution of problems" }, { label: "Amorousness" }, { label: "Inventiveness" },
                    { label: "Individuality" }, { label: "Love for nature" }, { label: "Sensitivity" }
                ],
                description: "You look at world differently, not like everyone. You have a different look on processes and events. Know how to see and interpret signs and symbols which are understandable only to you. Love to do everything in your own way, creatively and innovatively approach resolution of any task, as no one did this before. You are a bright individuality, see self as special and stand out among others. You are an idea-person. Well-read, can with ease explain even the most complex information. Work in flow, come up with ideas on the go and love to improvise. This is your element. Feel people, energy, space well. Extremely inventive, what at times helps to find non-standard way out of difficult situation. You have an open and kind heart. Responsive and ready to always come to help. You like to make people's lives better, what brings internal satisfaction. More often act not from logic, but in sincere impulse of soul. Know how to serve selflessly, not demanding anything in return. Accept people such as they are."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Victimhood" }, { label: "Touchiness" }, { label: "Depressions" }, { label: "Negativity" },
                    { label: "Inability to refuse" }, { label: "Desire to be good" }, { label: "Doubts" }, { label: "Non-confidence" },
                    { label: "Need for love" }, { label: "Strong attachment to people" }, { label: "Panic" }, { label: "Self-destruction" },
                    { label: "Subconscious feeling of guilt" }, { label: "Lack of money" }, { label: "Dislike for self" }, { label: "Illusions" }
                ],
                description: "You are in the role of victim. It seems to you that you do everything for people, but don't get anything in return. Much you take close to heart, extremely vulnerable and touchy. In aggregate all this can lead to self-destruction: problems with alcohol, dependencies, depression and solitude. At times forget about self and your desires. Try to be good for everyone. Don't know how to say no to other people. Very dependent on opinion of those around, constantly wait for praise and approval. If you don't get them, start to blame and hate self. There can be problems with creativity and unique look on life. It's difficult for you to realize your own ideas, often stay in creative crisis. Don't know how to promote your vision, doubts and non-confidence in self interfere. Hence non-realizedness. Value and love self, care about your comfort and put your desires in priority."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Creativity" }, { label: "Serving people" }, { label: "Different look on everything" },
                    { label: "Decent payment for your labor" }, { label: "Skill to refuse" }
                ],
                description: "Money will come through new ideas and creativity. You possess own vision which no one else has. Create and realize your creative ideas. Don't be shy to propose your ideas, more often arrange meetings with team on which you together will be able to generate and come up with something new. One can try self in role of creative producer, art-director, main editor, designer or marketer. Also finances can come through serving to people. You are a kind and responsive person who is always ready to come to help others. You have a large open heart. From you an excellent specialist of support service or head of department work with clients will turn out. Learn to refuse people, don't work to detriment of self and take a fair price for your labor. More often delegate work and less control team. Learn to let go of projects which no longer charge you, don't cling to them."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Creativity" }, { label: "Help to people" }, { label: "Different look" },
                    { label: "Taking decent payment" }, { label: "Skill to say no" }
                ],
                description: "For your success two components are important. First - don't be shy to set fair price and take money for your labor. Second - money is also energy which should freely move. Don't engage in excessive accumulation and calmly spend on self and loved ones. Learn to look at habitual things in a new way. Develop creativity. Learn everything unusual and interesting. Develop writing skills. Learn to non-standardly approach resolution of tasks. Say no in time and don't take on self someone else's work. Clearly build personal boundaries. Don't devalue your labor, set fair price. Raise self-esteem, strengthen faith in self. Make yourself presents and learn to live for self, and not only for sake of others. It's important to love self and exit from state of victim. Do kind deeds not expecting approval. Support social projects, help those in need."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through new ideas and creativity. You possess own vision which no one else has. Create and realize your creative ideas. Don't be shy to propose your ideas, more often arrange meetings with team, on which you together will be able to generate new ideas. One can try self in role of creative producer, art-director, main editor, designer or marketer. You are a kind and responsive person who is always ready to come to help others. You have a large open heart. From you an excellent specialist of support service or head of department for work with clients will turn out. To decide on activity, ask yourself questions: What inspires me? Into what activity can I bring new? Where can I manifest my creative skills? How can I serve people? In what sphere can I render help and support?"
            }
        ]
    },
    13: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Thirteenth energy doesn't have a specific archetype, it is structureless. This is energy of renewal and transformation. In classic Tarot energy is represented by arcana Death, but it's important to understand that in Matrix of Abundance death is a designation of transformation, getting rid of old and birth of new. Daring hero is description mostly suitable for archetype of thirteenth energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Love for life" }, { label: "Bravery" }, { label: "Activity" }, { label: "Fearlessness" },
                    { label: "Inspiration" }, { label: "Desire for changes" }, { label: "Straightforwardness" }, { label: "Honesty" },
                    { label: "Unpredictability" }, { label: "Leadership" }, { label: "Adaptability" }, { label: "Sexuality" },
                    { label: "Efficiency" }, { label: "Practicality" }
                ],
                description: "You are an interesting and unusual person. You are surrounded by atmosphere of mysteriousness and mysticism. Structureless esoteric energy. You are capable to transform thinking of people or working processes. Inspire into new, help overcome difficulties and non-simple events. It's important for you to constantly change something in your life, receive new experience, go to the end, having refused from fears and doubts. Global transformations interest you which will help make life better. You know how to refuse from old and obsolete, that what already long ago doesn't work. You don't like predictability. Any stability you break and change under yourself. Interested in different aspects of life, curious and creative, easily get involved in everything new and unusual. Always hold self confidently and will not get lost even in extreme situation. Easily concentrate, and in complex conditions act without panic. You have dulled fear of danger, therefore extreme types of sport can attract you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Harshness" }, { label: "Pessimism" }, { label: "Aggressiveness" }, { label: "Fear of death" },
                    { label: "Recklessness" }, { label: "Fussiness" }, { label: "Timidity" }, { label: "Passivity" }, { label: "Stagnation" },
                    { label: "Coldness" }, { label: "Calculativeness" }, { label: "Carelessness" }, { label: "Riskiness" }
                ],
                description: "If energy is in minus zone, then you fear changes. It's fearful for you to go into new, you get stuck on one place and don't realize your talents. Clutch at past and already obsolete. Accumulate junk at home, stack, preserve and fear to lose. In minus doubts in self appear, fears, unnecessary fussiness. If you will not act independently, then your energy self will start to attract forced changes: dismissals, loss of loved ones or money and so on. On other hand, you can lead self harshly and aggressively. Try to bring changes forcibly where they are not ready yet for them. There can be mood swings, excessive emotionality. Constantly change work, cannot choose something one. Can take for several matters at once and not a single one lead to end. Love to stay on edge of life and death, go for unsubstantiated and at times stupid risk. Situations are not excluded where you can turn out on edge of life and death: accidents, illnesses, clinical death."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Diverse activity" }, { label: "Absence of routine" }, { label: "Try new" }, { label: "Creativity" },
                    { label: "Lead matter to end" }, { label: "Fight with fears" }, { label: "Daring" }, { label: "Risk" },
                    { label: "Transformation" }, { label: "Inspire to changes" }
                ],
                description: "Money will come through transformations. If they are absent, then your energy self will attract changes, but already through negative, because of this difficulties can start. For example, bankruptcy of company or forced change of work. Don't be afraid of changes, bravely go into them, as well as help others overcome difficulties. Old should die, and new be born. Refuse in work from everything what is no longer viable. In company you can become crisis-manager, business-coach, producing editor, art-director. You have high sensitivity, you easily adapt under new conditions and activity. Also sphere which balances on edge of life and death will suit you: extremes, athletes, stuntmen, military, rescuers. Not necessarily to choose dangerous professions, main thing, that in your activity there would be no routine. If renewals are absent, then your finances can quickly go into minus."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Diverse activity" }, { label: "Absence of routine" }, { label: "Try new" }, { label: "Creativity" },
                    { label: "Lead matter to end" }, { label: "Fight with fears" }, { label: "Daring" }, { label: "Riskiness" },
                    { label: "Transformations of self and other people" }, { label: "Inspire into changes" }
                ],
                description: "Your finances depend on how much you are open to everything new and unknown. If you are not afraid to go into development and experiment, then very quickly will gain financial success. If changes will not be, then your energy will start self to attract them through negative, and difficulties can start. Set order in matters, things and relationships. Fix in writing your ideas, plans and dreams. Engage in creativity. Get rid of that what doesn't lead you to result. Don't take for multitude of matters at once, concentrate on something one. Lead any matter to end. Learn to be more calm and peaceful. Live here and now, get rid of fussiness. Be joyful and optimistic. Experiment in all spheres. Work over positive thinking. Bravely start new stages in your life."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You are not afraid of changes, bravely go into them, as well as help others overcome difficulties. Old should die, and new be born. In company you can become crisis-manager, business-coach, producing editor, art-director. Everything is accessible to you what is related with transformations, trips and travels. Also sphere which balances on edge of life and death will suit you: extremes, athletes, stuntmen, military, rescuers. Not necessarily to choose dangerous professions, main thing, that in your profession there would be no routine. You can develop in art, creativity, beauty. Professions of designer or stylist suit, where you will completely change space or person. To decide on activity, ask yourself questions: What can I transform? Where can I bring changes? From what can I refuse in favor of new? In what activity is there no routine? What do I want to change?"
            }
        ]
    },
    14: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of fourteenth energy is artist and creator. This is very creative, refined, soft energy. Lightness, spirituality and connection with higher, connection with flow is inherent to it. For representatives of this energy it's not important how they look from point of view of assessment by society, it's important for them to be in state of inspiration and have possibility to manifest themselves.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" }, { label: "Softness" }, { label: "Sensitivity" }, { label: "Intellectuality" },
                    { label: "Soulfulness" }, { label: "Healing" }, { label: "Morality" }, { label: "Wisdom" }, { label: "Calm" },
                    { label: "Harmoniousness" }, { label: "Modesty" }, { label: "Patience" }, { label: "Decency" },
                    { label: "Nobility" }, { label: "Delicate taste" }, { label: "Refinement" }
                ],
                description: "Soft creative energy. You are a refined nature who possesses strong spiritual and healing energy. You live and create in flow. You inspire people and charge them. Energy can manifest through creativity, creation and spirituality. First variant - creation of your art, own creative magic. You like to create in solitude and calm. You connect to flow, and ideas themselves come into your head. In you there is depth and internal peace. You understand own desires and strivings. Inside you there is always harmony. Also you possess internal core and strength of spirit. Can be leader among creative people, unite them around into collective to create together. Second variant - this is psychology, spirituality, healing and esoterics. You study secret esoteric knowledge. You have powerful flow energy. You delicately feel people and know how to help them. You are a soulful person with whom it's always interesting to talk on different themes. Constantly study new and share knowledge with others. You have moral landmark to which you strive. You are a decent and noble person: communicate with people honestly and openly, not deceiving either self or others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Callousness" }, { label: "Soul-less-ness" }, { label: "Attachment to material" }, { label: "Touchiness" },
                    { label: "Impulsiveness" }, { label: "Infantilism" }, { label: "Going into extremes" }, { label: "Desire to punish and blame" },
                    { label: "Rudeness" }, { label: "Capriciousness" }, { label: "Immoderation" }, { label: "Greed" }, { label: "Vulnerability" }
                ],
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme, at times you yourself cannot decide what you want. Excessively sensitive. You are easy to offend and touch. Don't perceive criticism towards self, even constructive. Or, on contrary, you manifest harshness, daring and callousness. You are closed from people. Lead self rudely and often happen to be impulsive. Can get angry, drop everything, and then regret about taken decision. There is risk to acquire strong dependency or harmful addictions. Too much hold onto past, don't know how to forgive and let go. Not rarely there are periods of emptiness and non-belief in own forces and possibilities. You get attached to money and material values. Don't know sense of measure, you always have little of everything. Don't realize self in creativity."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: SENSITIVITY, CALM, ART\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Listen to internal voice" }, { label: "Creativity" }, { label: "Favorite matter" }, { label: "Own path" },
                    { label: "Soulfulness" }, { label: "Openness" }, { label: "Nobility" }, { label: "Work in flow" }
                ],
                description: "Money will come through creativity. You have soft energy, you need to learn to listen to self and your internal voice. Be in state of creator. Connect to your flow and create. You by your nature are aesthete and delicately feeling person. Engage in favorite matter, go by own path and don't listen to advice of those around. Any activity will suit you which will be related with art: writer, composer, artist, musician, dancer, designer, illustrator and so on. Also money can come through spirituality and deep knowledge. You feel others well, therefore it's possible to direct your energy on work with people: engage in psychology, esoterics, spiritual practices. Manifest soulfulness to those around and open your heart. Professions of psychologist, yogi, spiritual teacher, mentor, healer will suit you. Your task is to listen to your heart and internal voice. It's necessary for you to find mutual understanding with self to understand own deep desires and strivings."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Listening to internal voice" }, { label: "Engaging in creativity" }, { label: "Engaging in favorite matter" },
                    { label: "Going by one's path" }, { label: "Manifesting soulfulness" }
                ],
                description: "Success depends on your sensitivity and skill to open up to world. Manifest your creativity, engage in creativity, search for your calling. As soon as you find matter which is to your heart, money will come to you in large quantity. Express emotions openly, don't suppress them. Fight with bad habits, lead healthy way of life. Manifest honesty and openness in matters and with people. Learn moderation and patience. Meditate, engage in spiritual practices. Inspire self through study of art: music, literature, painting, theater. Rest, take hot bath, visit baths, saunas. Walk more often in parks and outside city. Visit your places of power. Combine creativity and income. Listen to your internal voice, develop intuition, take decisions based on internal sensations."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through creativity. Be always in state of creator. Connect to your flow and create. Engage in favorite matter, go by own path and don't listen to advice of those around. Any activity will suit you which will be related with art: writer, composer, artist, musician, dancer, designer, illustrator and so on. Money can come through spirituality and deep knowledge. You feel people well, therefore it's possible to direct your energy on work with them: engage in psychology, esoterics, spiritual practices. Manifest soulfulness and openness to surrounding people. Professions of psychologist, yogi, spiritual teacher, mentor, healer will suit you. It's necessary for you to find mutual understanding with self, understand own deep desires and strivings. Find harmony inside, follow your flow. Believe in self and reveal your talent through creativity."
            }
        ]
    }, 
    15: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of fifteenth energy is devil and tempter (masculine energy). This is energy of sexuality and attractiveness, which can literally strike with current and charge people. Owners of this energy can be dual: on one hand they have ability to provide help to people, and on other, under guise of providing help they can start to manage and manipulate.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energetic" }, { label: "Positive" }, { label: "Love for entertainment and pleasures" }, { label: "Love for material values" },
                    { label: "Good intuition" }, { label: "Clairvoyance" }, { label: "Wisdom" }, { label: "Understanding of essence of things" },
                    { label: "Luck" }, { label: "Fascination" }, { label: "Attractiveness" }, { label: "Style" }, { label: "Oratorical abilities" },
                    { label: "Openness to trips and adventures" }, { label: "Compassion" }, { label: "Kindness" }, { label: "Ability to help others" }, { label: "Sexuality" }
                ],
                description: "You have a strong energy of temptation. X-ray person: you see all subtleties and defects in another person or work process, you know how to fix it and make it better. You can trigger people, call up negative emotions and lift their internal work-throughs outside. You help to fix self and become better, but do this in your special way through temptations. However you also are subject to different temptations. You love pleasures, luxury and comfort. You love money and value benefits, but don't get fixated on them. Know how to hold balance between material and spiritual. You know how to find approach to person, immediately see where to press and where his painful points are located. You are diplomatic, know how to negotiate. You have good connection with internal voice, intuition and higher forces. Possess gift of clairvoyance. Know how to charge and direct other people. Strong esoteric energy. You are possessor of deep knowledge, therefore they often turn to you for advice. Always look good, dress stylishly, attract people by external appearance and bright charisma. Sexual and charming. Much internal energy, you want to create and create, generate ideas, move forward to your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Aggressiveness" }, { label: "Jealousy" }, { label: "Envy" }, { label: "Vulnerability" }, { label: "Dependencies" },
                    { label: "Arrogance" }, { label: "Thirst for power" }, { label: "Pride" }, { label: "Fixation on material" }, { label: "Suppression of people" },
                    { label: "Rigidity" }, { label: "Deception for sake of profit" }, { label: "Greed" }, { label: "Selfishness" }, { label: "Betrayal" },
                    { label: "Black magic" }, { label: "Excessive control" }, { label: "Manipulations" }, { label: "Stubbornness" }, { label: "Irritability" }, { label: "Criticality" }
                ],
                description: "You can fall into different dependencies and temptations (alcohol, drugs etc.). Manipulate people, press on their weak points, know how to touch and wound. Deceive in selfish goals. Can lead self arrogantly, want to possess power over people and try to suppress. Critically relate to opinion of others, not ready to hear and listen, dispute, lead self stubbornly, get irritated by any reason. In character there are selfishness and pride. You think only about yourself and your desires, putting other people as nothing. Love for luxury and excessive striving for material benefits make you greedy fixated on money, what interferes with revealing of talents. Can excessively guard near ones, even manifest rigidity and aggression to them. Not rarely there are situations when you betray person close to you for sake of temptations and desires."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Global projects" }, { label: "Honest income without deception" }, { label: "Don't get fixated on money and material values" },
                    { label: "Respect people and their opinion" }
                ],
                description: "Finances can come through correction: of process, person or system. You notice defects, weak places and fix them. You know how to make beautifully, brightly and catchingly. You know how to create quality product for multitude of people. Good marketer, designer, illustrator will come out of you. You are a charming and good-natured person, what helps to easily establish contact with people. For you it will not be difficult to find approach to person and promote your idea. Can be head of company/department or create your business. Work can be related with oratory, manifestation of charisma, individuality and attractiveness. Engage in any creativity: actress (actor), blogger, model, work in media and public professions. Also you can engage in correction of people: you see their vices and help to become better. One can try self in quality of psychologist, mentor, coach, consultant, esoteric. Any spiritual practices and teachings can also be used in one's professional activity. You have deep knowledge which you can transmit to others."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Going into global projects" }, { label: "Engaging in favorite matter" }, { label: "Not searching for easy money" },
                    { label: "Not getting fixated on finances and material values" }, { label: "Being honest and open" }, { label: "Respecting people" }
                ],
                description: "Determine what you want to engage in in life and boldly move in this direction. Use strong sides of your character. Find favorite matter which will inspire you. Never deceive self and those surrounding. Respect people, accept their choice. Learn to see world and people through prism of good. Develop spiritually. Work over internal aggression. Get rid of cynicism and selfishness. Accept and forgive people, learn to be flexible. Open your heart for love, learn to gift it to others. Help people become better. Learn to relax and trust. Don't manipulate people. Engage in spiritual practices, yoga, meditation. Activate your sexual energy. Engage in creativity. Take care of your body. Free self from bad habits and harmful dependencies. Worthily pass all trials by large money. With ease accept and let go money. Be grateful for that what already you have. Hold balance between spiritual and material."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Finances can come through correction: of process, person or system. You notice defects, weak places and fix them. You know how to make beautifully, brightly and catchingly. You know how to create quality product for people. Good marketer, designer, illustrator will come out of you. Work can be related with oratory, manifestation of charisma, individuality and attractiveness. Engage in any creativity: acting, blogging, modeling, work in media and any public professions. Also you can engage in correction of people: you see their vices and help to become better. One can try self in quality of psychologist, mentor, coach, consultant, esoteric. To decide on activity, ask yourself questions: What can I fix and where do I see weaknesses and defects? How can I help people? In what sphere can I apply my talents?"
            }
        ]
    }, 
    16: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of sixteenth energy is revolutionary. By classic of Tarot, sixteenth arcana is called tower, which symbolizes support and confidence. To people with this energy it's important to be on their path, otherwise life can start to direct them in necessary direction through destruction of habitual way.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Spirituality" }, { label: "Clairvoyance" }, { label: "Energetic" }, { label: "Strength of spirit" },
                    { label: "Innovation" }, { label: "Leadership" }, { label: "Determination" }, { label: "Adventurism" },
                    { label: "Adaptability" }, { label: "Bravery" }, { label: "Development" }, { label: "Self-knowledge" },
                    { label: "Creativity" }, { label: "Creation" }, { label: "Honesty" }
                ],
                description: "You live here and now, look differently at things and events. Thanks to life experience you are capable to change world-view and extract important lessons from past. Strong daring energy. You are not afraid to go into new, open to changes, thanks to what you receive positive changes in life. You destroy old, dishonest, insincere, not real and create on this place new. This can be new work, completion of old relationships, change of place of residence and so on. You are a self-confident person who stands firmly on feet. Possessor of powerful strength and energy. Can inspire others, lead behind self, motivate for changes. Good ideological leader and mentor will come out of you. You have a kind and honest heart, ideas are always driving you, directed at help to others. You don't get fixated on money and material, concentrating on your ambitious ideas and their realization. Easily adapt to any conditions, can even live in asceticism if goal requires this. Also you have non-standard thinking and rich imagination. Strong flow energy: you generate creative ideas which move you forward. Love to reflect, search, try. Constantly develop and cognize new. Spiritual energy: you like deep esoteric knowledge, different practices, unusual experience. You want to try everything on yourself. Boldly experiment and search for your own."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Health problems" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" },
                    { label: "Hot-temperedness" }, { label: "Destructiveness" }, { label: "Lack of spirituality" }, { label: "Attachment to old" },
                    { label: "Chaoticness" }, { label: "Pull to dangerous" }, { label: "Unmanageability" }, { label: "Fraud" },
                    { label: "Deception" }, { label: "Dependencies" }, { label: "Helplessness" }, { label: "Vulnerability" }
                ],
                description: "First important minus by your energy is excessive rigidity. You cut from shoulder, say in face of person everything what you think, happens to be incorrect and categorical. Aggressively go break-through and often over heads for sake of your goal. Bear destruction instead of creation. Material values and money drive you, you refuse from spiritual and can fall into dependencies. Start to deceive self and people. If you now have problems with health, then this is clear sign of energy in minus. Other side of minus energy is sluggishness, indecisiveness, doubts and strong attachment to old. You fear changes, not ready to go into new, it's scary for you to manifest and open to people. You don't have ideas, don't understand where you want to move. Not ready to lead people, refuse from leadership and ambitions. If you won't develop, then life will force you to do this in sharp, unpredictable and sad way through loss of work, near person, money and so on."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Listen to yourself" }, { label: "Go into new" }, { label: "Don't get fixated on money and material values" },
                    { label: "Leadership" }, { label: "Spirituality" }, { label: "Own path" }, { label: "Activity" },
                    { label: "Change of setting, travels, movement" }, { label: "New ideas" }
                ],
                description: "Money will come through ideology. You are a revolutionary by life: break old and on this place create new. You have creative and non-standard thinking, easily generate ideas and inspire people to follow behind you. You can go into spirituality, study esoteric knowledge and transmit them to others. Good healer, psychologist, energy practitioner, yogi, mentor will come out of you. Your work should ignite and motivate you. Listen only to your internal voice, move behind idea and cast off all doubts. Your bold and daring thinking allows to look differently at habitual processes, and huge amount of energy helps to embody ideas into life. All creative and creative professions suit you, where you will be able to gather around self team of like-minded people: editor-in-chief, creative producer, art director, creative head and so on."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Listening to self" }, { label: "Going into new" }, { label: "Not clinging to material" },
                    { label: "Refusal from old" }, { label: "Going into spirituality" }, { label: "Moderation" }
                ],
                description: "The less you think about material, the more money you have. Concentrate on ideas, embody them into life, inspire people. Learn to build processes from zero. Act decisively and boldly, don't doubt in self. Work over self, become better than yesterday. Learn to live consciously, be grateful for everything what already you have. Refuse from old beliefs and settings. Cleanse your space, do decluttering. Travel, study new cultures, search for inspiration. Meditate, engage in yoga, read spiritual and esoteric literature. Work over internal aggression and free self from negative emotions. Strengthen your physical health, engage in sport. Calmly and with gratitude accept any changes in life. Share new knowledge with people, be open, trust. Not to regret about past, free self from old. Learn to alternate activity and peace."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You inspire people for changes and lead behind self. Can go into spirituality, study esoteric knowledge and transmit them to others. Good healer, psychologist, energy practitioner, yogi, mentor will come out of you. Your bold and daring thinking allows to look differently at habitual processes, and huge amount of energy helps to embody ideas into life. All creative and creative professions suit you, where you will be able to gather around self team of like-minded people: editor-in-chief, creative producer, art director, creative head and so on. To decide on activity, ask yourself questions: What new I want to create? What idea drives me? What inspires me? In what I can produce revolution?"
            }
        ]
    }, 
    17: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "Archetype of seventeenth energy is star person, who realized one's talents (feminine energy). This is a soft and creative energy, which needs to follow one's star (listen to self, go for one's dream). For people with seventeenth energy it's important to shine and gather attention thanks to their creativity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" }, { label: "Desire to be in center of attention" }, { label: "Brightness" }, { label: "Emotionality" },
                    { label: "Artistry" }, { label: "Charm" }, { label: "Love for self" }, { label: "Lightness" }, { label: "Sensitivity" },
                    { label: "Intuition" }, { label: "Individuality" }, { label: "Imagination" }, { label: "Optimism" }, { label: "Persistence" },
                    { label: "Ambitiousness" }, { label: "Openness" }
                ],
                description: "Soft creative energy. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for a dream and listen only to the internal voice. You shine for those around you, you are in the center of attention, you are admired and you are imitated. You like publicity and fame. You don't like to be in the shade and in second roles. Ambitiousness and large-scale goals motivate to move forward, to create, to produce and to demonstrate self and one's talents to the world. You have an attractive appearance, you take care of self and one's body. Often you receive compliments and attract gazes. You possess a unique imagination and creative thinking. You know how to create art which will please many. You draw inspiration from nature and from communication with like-minded people. You are a kind and open person. You can heal others, thanks to your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics. You study everything new and try it on yourself."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Unrealizedness" }, { label: "Lack of confidence" }, { label: "Pride" }, { label: "Stardom" }, { label: "Vanity" },
                    { label: "Fixation on material" }, { label: "Withdrawal from reality" }, { label: "Deception" }, { label: "Illusions" },
                    { label: "Selfishness" }, { label: "Fear of unknown" }, { label: "Problems with sexuality" }
                ],
                description: "First variant of manifestation of minuses by energy is unrealizedness. You stay in shade, don't reveal your talents, doubt in self and your forces. Don't understand where to move, what to engage in and what inspires you. You are shy to stay in center of attention, don't like to be in sight and lead a closed way of life. Confident in self, you fear everything and refuse to implement your dream. Stay in creative crisis. Second variant is pride, vanity, star sickness. You go away from reality, start to get stuck up, behave with people selfishly, command, manipulate, often advance your requirements and conditions. Not ready to go for compromise. Get fixated on your success, money and material benefits, forgetting about spiritual. Live in own illusions, can fall into dependencies: alcohol, drugs, promiscuous way of life and so on. Deceive self, thinking that with other people something is not so instead of that to search for root of problem in self. Don't accept your appearance, consider yourself an unattractive and ugly person. Often there are problems with sexuality. Shy of self and one's body."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Creativity" }, { label: "Openness" }, { label: "Trust to people and life" },
                    { label: "Faith in self and one's abilities" }, { label: "Showing your talents to the world" }
                ],
                description: "Money will come through creativity or spirituality. Your essence is to show yourself to the world. You are a bright, creative person who always has many ideas and plans. Think how you can embody them into life. Create for the benefit of others, open to the world your brightness and uniqueness. Reveal your talents and help in this to others. Any public activity suits you: actress (actor), producer, influencer, blogger, musician, singer, model, director and so on. Also you can use your creative skills in design, marketing, advertising, show business, art, creating a unique product. Form around self a team of like-minded people, be a leader, direct and inspire. It is contraindicated for you to stay in the shade or in second roles. Don't fear to demonstrate your brightness. Also you can take up spiritual and esoteric practices, using your sensitivity and strong intuition. Professions of psychologist, spiritual mentor, yogi, esoteric, healer suit you."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Engaging in creativity" }, { label: "Being open" }, { label: "Trusting people" },
                    { label: "Believing in self and one's talent" }, { label: "Showing self to the world" },
                    { label: "Inspiring people" }, { label: "Leading to spirituality" }
                ],
                description: "Be open and friendly, help people reveal their talents, inspire for changes. The more followers and fans you will have who will believe in you, the faster financial success will come. Write down your goal and in what way you can implement it. Share your thoughts and ideas with close people, receive support from them. Reveal your creative potential, show to the world your talents. Engage in creativity, create, invent, manifest. Find favorite matter which will inspire you. Follow impulses of your heart, develop intuition. Communicate with like-minded people, be open to communication. Don't fear to experiment, be bright. Visit parties and events, go out into world. Dress up, think through your image and style. Accept your uniqueness, share it with the world. Refuse from pride and vanity. Be open, gift love. Allow self to be successful and famous. Become example for many, inspire people."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through creativity or spirituality. Your task is to show yourself to the world. You are a bright, creative person who always has many ideas and plans. Any public activity suits you: actress (actor), producer, influencer, blogger, musician, singer, model, director and so on. Also you can use your creative skills in design, marketing, advertising, show business, art, creating a unique product. Form around self a team of like-minded people, be a leader, direct and inspire. Or you can take up spiritual and esoteric practices, using sensitivity and strong intuition. Professions of psychologist, spiritual mentor, yogi, esoteric, healer, energy practitioner suit you. Also you can be an artist, confectioner, organizer of events, designer of interiors, clothes, 3-D graphics. Journalism, trade, astronomy, research of nature: geology, archaeology will suit you. To decide on activity, ask yourself questions: How I can manifest my talents? In what is my uniqueness? In what creativity I want to engage? What inspires me?"
            }
        ]
    }, 
    18: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy that is associated with the astral body, intuition, sensing. In the classical Tarot, this arcana is called The Moon, which speaks of attraction, mystery, and the mysticism of this energy. The eighteenth energy is closely related to the subconscious and depth. It is an esoteric energy that attracts everything mysterious, secret, and unknown.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Mystery" }, { label: "Intuition" }, { label: "Materialization of thoughts" }, { label: "Liberation from fears" },
                    { label: "Strong imagination" }, { label: "Attractiveness" }, { label: "Sensitivity" }, { label: "Versatility" },
                    { label: "Success" }, { label: "Striving for beauty" }, { label: "Fast learning ability" }, { label: "Artistry" },
                    { label: "Positive thinking" }, { label: "Creative abilities" }, { label: "Fast exit from negative" }, { label: "Interest in knowledge" }
                ],
                description: "Structureless soft energy. Your energy is related to deep immersion. You possess strong intuition and the ability to attract what you desire, so it is so important for you to think positively and fight fears, otherwise you will attract them into your life. You like to study everything related to the unconscious and magical, you are fond of spiritual and esoteric practices. You are mysterious and attractive to other people, you like to decorate your body: tattoos, piercing, bright hair, unusual appearance, etc. You can calmly fly away from the external, real world and go into your subconscious. Often you are in your own fantasies and thoughts, not noticing the surrounding environment. You prefer everything abstract, creative, and unusual. Structure, system, and order are not for you. You create your magic in your work or creativity, think non-standardly, are fond of esoterics, meditations, tarot, etc. You go your own way and do everything in your own way, not paying attention to the opinions of other people. You listen only to your internal voice. You are a soft and kind person, easily adapt to any conditions. You have a strongly developed sensing of yourself. You know how to help, what to say and do in a specific situation. People often turn to you for advice. You are interested in different directions of activity, whatever you take up, everything works out easily and without strain."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Withdrawal from reality" }, { label: "Addictions" }, { label: "Depressiveness" }, { label: "Anxiety" },
                    { label: "Hypocrisy" }, { label: "Doubts" }, { label: "Closedness" }, { label: "Victim state" }, { label: "Destruction" },
                    { label: "Inaction" }, { label: "Unrealizedness" }, { label: "Vindictiveness" }, { label: "Resentfulness" }, { label: "Laziness" },
                    { label: "Apathy" }, { label: "Indecisiveness" }, { label: "Whining" }, { label: "Anger" }, { label: "Touchiness" },
                    { label: "Inertness" }, { label: "Pessimism" }, { label: "Loneliness" }, { label: "Non-acceptance of sexuality" }, { label: "Magic to harm others" }
                ],
                description: "The first direction of minuses by your energy is excessive closedness and withdrawal from reality. It can reach addictions (alcohol, drugs, etc.) and depressions. You are capable of immersing yourself in your thoughts so much that you refuse to contact the real world. Sometimes you behave hypocritically, smiling to the face, but inside experiencing indignation and condemnation towards the person. You may like gossip. The second direction of minuses is fears. You constantly doubt, fear, cannot make a decision and take responsibility. You stay in the victim state, complain about the injustice of life, whine a lot, but do nothing. It's difficult for you to make the first step towards your goal, you are inert and slow. All this leads to unrealizedness, closedness, and resentment at the whole world. It's important for you to maintain positive thinking, not immersing in pessimism and negative. Your energy is capable of attracting everything you think about, so all fears and worries can easily be realized for you. Do not use your abilities to harm others (evil eye, damage, etc.)."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Studying secret knowledge" }, { label: "Creativity" }, { label: "Powerful imagination" }, { label: "Own path" },
                    { label: "Positive thinking" }, { label: "Attracting what you desire" }, { label: "Esoterics, magic" }, { label: "Absence of fears and doubts" }
                ],
                description: "Money will come through creation of your magic in any matter. Go your own way, listen to intuition and focus on your desires. You have well-developed creative and non-standard thinking. You approach work non-standardly and know how to bring creative into the creative process. Professions that are related with visualization of images may suit you: graphic designer, illustrator, interface developer, creative, director. Also thanks to your heightened sensitivity and magical skills, you can work with secret and sacred knowledge: esoteric, psychologist, philosopher, mentor, tattoo artist. Let go your fears, for you have very strong energetics, therefore you easily attract everything you think about, both bad and good. Focus on positive. Visualize and write down desires - in your case this will perfectly help in implementation."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Magic, psychology, esoterics" }, { label: "Studying secret knowledge" }, { label: "Creativity, unique approach" },
                    { label: "Imagination" }, { label: "Going your own path" }, { label: "Positive thinking" }
                ],
                description: "Well-being is directly related with your thinking. Refuse from illusions and fears, replace negative settings with positive. Be conscious. Any event which may seem difficult is your point of growth. In moments of strong anxiety and fear let worries through self, try to understand what precisely causes fear in you. Work through your fears: live through and let go. Focus on specific tasks and actions which will lead you to desired result. Develop intuition. Think positively, make vision boards, be grateful for everything what you already have in your life. Trust others, speak truth. Be more often in nature, especially near water. Lead healthy way of life. Develop your talents. Stop doubting your possibilities. Visualize positive, successful images. Learn to see opportunities in life and use them. Think creatively, use your non-standard approach in any matter. Communicate with different creative people, get acquainted, don't close in self."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You have well-developed creative and non-standard thinking. You think non-standardly and are capable of bringing something unusual into any creative process. Professions related with visualization may suit you: graphic designer, illustrator, interface developer, creative, director. Thanks to your heightened sensitivity and magical skills, you can work with secret sacred knowledge to help others: esoteric, psychologist, philosopher, mentor, tattoo artist. It's important for you to cope with your fears and overcome internal barriers. To decide on activity, ask yourself questions: Where I can manifest my magic? What do I do well? In what do I see depth? What am I afraid of?"
            }
        ]
    }, 
    19: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy. People with the nineteenth energy are endowed with warmth, creative potential, they can engage in global projects. They possess internal strength and move forward, striving for grand achievements. They are capable of turning their creative ideas into reality.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energeticness" }, { label: "Leadership" }, { label: "Carefulness" }, { label: "Love of life" },
                    { label: "Optimism" }, { label: "Success" }, { label: "Authoritativeness" }, { label: "Desire to help" },
                    { label: "Wellbeing" }, { label: "Creativity" }, { label: "Collectiveness" }, { label: "Activity" },
                    { label: "Ambitiousness" }, { label: "Kindness" }, { label: "Lightness" }, { label: "Curiosity" }, { label: "Sexuality" }
                ],
                description: "Leadership energy. You are a team player and are an authority for other people. You like to be in the center of attention, you have big ambitions and global goals. Your energy is the energy of the Sun. You carry warmth, light, and goodness to people through work, communication, actions. You are ready to shine and inspire, always smiling and charming. You have positive thinking and a huge flow of life energy that helps to move towards the goal. You love to engage in kind, charitable projects aimed at helping people, nature, animals, etc. You are an ideological person, it is important for you that the goal inspires and charges you. You are not ready to work only for money or material values. If there is a cool idea that you burn with, the result will not keep you waiting. You are ready to take on large-scale projects that affect many people around the world. You like to engage in creativity, create new things, and show creativity. You are free in your manifestation and always achieve success in the chosen activity. You have a strong connection with nature. You can pass powerful streams of energy through yourself, which help in achieving global goals. You are a battery person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Egoism" }, { label: "Hot temper" },
                    { label: "Aggressiveness" }, { label: "Fixation on the material" }, { label: "Irresponsibility" }, { label: "Fear of big projects" },
                    { label: "Pride" }, { label: "Fanaticism" }, { label: "Envy" }, { label: "Powerfulness" }, { label: "Rudeness" },
                    { label: "Feeling of guilt" }, { label: "Illnesses" }, { label: "Fuss" }, { label: "Chaoticness" }, { label: "Bad relationships with father" }
                ],
                description: "The first manifestation of minuses by your energy is rigidity and excessive demandingness towards people. You set impossible goals and unrealistic deadlines, pressure your subordinates, and sometimes demand fulfillment of set tasks in an aggressive form. You manifest hypercontrol and do not trust loved ones. You can reach fanaticism in your cause. You behave powerfully and despotically with those around you. You often envy, constantly comparing yourself with others. At the same time, you have an inflated ego, you pay attention only to yourself, fixate on your desires, not thinking about others. Not infrequently you focus only on money and financial success, completely forgetting about the higher goal and inspiration. The second manifestation is fading, apathy, doubts, and fears. You are not ready to take responsibility and become a leader, you are afraid to move towards your goal, you get lost and act chaotically. Fear to start a big, global project is possible, since you constantly experience a feeling of guilt, doubt, and dissatisfaction with yourself. In childhood, bad relationships with father could have formed."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Own business" }, { label: "Global projects" }, { label: "Influencing people and leading" },
                    { label: "Good relationships with father" }, { label: "Charity" }, { label: "Favorite cause" },
                    { label: "Relaxed and calm state" }, { label: "Love for self" }
                ],
                description: "For you it's important to burn with your cause, inspire, be the Sun for others: lead, motivate, create. Through this state big money will come. You can take part in a global project or start your own business. Management positions in projects aimed at help and charity suit you. For example, organizer of spiritual meetings or events, founder of a charitable foundation or children's center. Any activity aimed at serving others will be a suitable option for you. Also you have well-developed creative and innovative skills, thanks to which you can create your own unique product. All creative professions suit you - art director, head of a creative team, editor-in-chief, creative director, owner of a design agency, etc. Good relationships with family, and first of all with father, will also influence your finances."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Own favorite cause" }, { label: "Big projects" }, { label: "Influencing people" },
                    { label: "Charity" }, { label: "Leading others" }, { label: "Good relationships in family" },
                    { label: "Love for self" }, { label: "Relaxing and having fun" }
                ],
                description: "Your financial path is large projects and international business. Realize your creative potential, don't be afraid to go into new and scale. Ignite people, inspire by your example, direct your huge energy for good. Engage in projects aimed at helping others. Find a favorite cause that you will burn with. Remember, every person has right of choice. Don't judge and don't force to act against will. Be an example for others. Communicate, get acquainted with new people, be open and benevolent. Support loved ones. Regularly rest and care for self. Think positively. Engage in creativity, develop your creative skills. Engage in charity, help others. Wake up early, do exercises, meditate. Morning is time of big energy for you. Be grateful for what you have already now. Engage in sport, lead active way of life. Develop your oratory talents. Get rid of aggression and feeling of guilt. Learn to rejoice in simple things. Think globally."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You can take part in a global project or start your own business. Management positions in projects aimed at help and charity suit you. For example, organizer of spiritual meetings or events, creator of a charitable foundation or children's center. Any activity aimed at serving others will be a suitable option for you. Also you have well-developed creative and creative skills, thanks to which you can create your own unique product. All creative professions suit you: art director, head of a creative team, editor-in-chief, creative director, owner of a design agency, etc. To decide on activity, ask yourself questions: Where I can manifest my leadership qualities? What inspires and ignites me? Where I can help others?"
            }
        ]
    }, 
    20: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "This energy is one of the most complex to understand. The twentieth energy lacks a clear structure and archetype. According to the classical Tarot, this is the Judgment arcana, which hints that a person with this energy can be just, knows how to judge and condemn. The energy of the twentieth arcana is associated with the concept of connection, as its goal is to combine different aspects, both spiritual and physical, as well as to unite people among themselves.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Claircognizance" }, { label: "Healing" }, { label: "Intuition" }, { label: "Ideologicalness" },
                    { label: "Mysteriousness" }, { label: "Sensitivity" }, { label: "Interest in the unusual" }, { label: "Versatility" },
                    { label: "Wisdom" }, { label: "Stability" }, { label: "Authoritativeness" }, { label: "Adaptability" },
                    { label: "Ability to manage" }, { label: "Scale" }, { label: "Family-orientedness" }, { label: "Connection with ancestry" }
                ],
                description: "You have a talent for uniting and creating something integral. You can create new projects, unique products, or unite people. You manage to find a balance between the spiritual and the material. You see what a person or a project lacks to become integral, what flaws and shortcomings exist, and how to fix them. You have strong sensitivity and a powerful gift of clairvoyance. When you live in a flow, interesting ideas and insights can unexpectedly come. Intuition is well-developed, you trust your internal voice. You are sometimes mysterious in the eyes of other people. You like to help. You possess deep life wisdom and people often come to you for advice and support. You are a versatile and interesting personality. You are drawn to everything unusual and esoteric. You are fond of psychology, studying deep and sacred knowledge. You easily adapt to new conditions. You are stable in any changes and stressful situations. You have a strong connection with your family and ancestry. You value relationships and home comfort, gather loved ones together, help to solve conflict situations and disputes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Judgment" }, { label: "Resentments" }, { label: "Problems with relatives" }, { label: "Pride" },
                    { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Fear of changes" },
                    { label: "Fear of criticism" }, { label: "Bad habits" }, { label: "Weakness of character" }, { label: "Lack of spirituality" }, { label: "Anger" }
                ],
                description: "You lack integrity and balance in life. You cannot find a soul-appealing cause, do not understand where to move and what you want. You cannot assemble yourself, it is scary for you to go into something new, there is a fear of changes. You don't believe in yourself and your talents, often doubt. All this leads to weak character, bad habits, and addictions. It may happen that you fixate on material values and money, and not on an idea and a favorite cause, which eventually leads to losses. Or vice versa, you may behave as a rigid and authoritarian person. You constantly demand something from others, are not ready to share, lead a secretive lifestyle. In conflicts, you manifest your aggression, which can offend a loved one. Not infrequently there are problems with family: quarrels, conflicts, and misunderstanding lead to cessation of communication with relatives."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Good relationships within family" }, { label: "Trying new things" }, { label: "Developing intuition" },
                    { label: "Creating the integral" }, { label: "Balance in life" }, { label: "Helping people" },
                    { label: "Gathering a team" }, { label: "Uniting people" }, { label: "Favorite cause" }
                ],
                description: "Money will come through the creation of integral systems, searching for errors and their elimination. You feel trends in advance and know how to create a finished high-quality product. You easily unite people around you and gather a team. Create in a flow and inspire others. You can try yourself in the role of a producer, artist, painter, marketer, and someone who creates a product. You have high sensitivity and the gift of clairvoyance. You like studying everything new, spiritual, and esoteric. You can use these skills to help other people. Professions of a mentor, coach, healer, consultant, psychologist will suit you. Also finances can come through family: family business or work with relatives."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Good relationships with relatives" }, { label: "Going into the new" }, { label: "Developing intuition" },
                    { label: "Creating the whole" }
                ],
                description: "Create integrity in your life and help others find it. Engage in work that appeals to your soul and inspires you. Develop your intuition and sensitivity. Try new things. Study esoteric knowledge and spiritual practices. Maintain harmonious relationships in the family, gather together more often, arrange holidays and joint events. Engage in spiritual practices, meditation, yoga. Lead a healthy way of life. Engage in creativity. Live in a flow. Engage in sport. Transmit your wisdom to others. Develop sensuality, intuition, clairvoyance. Learn to create the integral, help people find integrity. Write down your goals and tasks, follow the plan. Practice forgiveness and acceptance. Communicate more often with relatives, spend time with family. Study your ancestry: family history, genealogy, etc. Maintain family traditions and values."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through the creation of integral systems. You feel trends in advance and know how to create a finished high-quality product. You easily unite people around you and gather a team. You can try yourself in the role of a producer, artist, painter, marketer, and someone who creates a product. You have high sensitivity and the gift of clairvoyance. You like studying everything new, spiritual, and esoteric. You can use these skills to help other people. Professions of a mentor, coach, healer, consultant, psychologist will suit you. Also finances can come through family: family business or work with relatives."
            }
        ]
    },
    21: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to a peaceful solution of problems and to harmonization of everything around. The twenty-first energy is open to the world and surrounding people, ready to accept and respect other points of view and cultures. This is the energy of diplomacy, love, expansion. It is harmonious, ready to go into the new.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Diplomacy" }, { label: "Ability to lead" }, { label: "Interest in travel" }, { label: "Adaptability" },
                    { label: "Uniting people" }, { label: "Sensitivity" }, { label: "Healing" }, { label: "Freedom" },
                    { label: "Communicability" }, { label: "Ideologicalness" }, { label: "Globality" }, { label: "Tolerance" },
                    { label: "Openness" }, { label: "Scale" }
                ],
                description: "Soft female energy. You are open to the new and unknown, love to receive diverse experience and experiment in everything. You have flexible thinking, you easily adapt to new conditions and circumstances. You are a cheerful, kind, and smiling person. You like to engage in creativity and generate creative ideas. Your energy is very ideological, therefore you can become inspired by some idea, gather a team and lead it to the goal. You are for harmony and peace in the whole world, always smooth over conflict situations and sharp corners. You know how to negotiate, find a compromise in any situation, listen and hear your interlocutor. You think positively, are always open and help people. Healing, clairvoyance, and intuition are well-developed in you. You think globally, scale projects. You like to study all edges and possibilities of your personality, you are ready to go beyond usual frames and generally accepted standards. You travel often, study other cultures and languages. You are open to communication, very communicative, easily make new acquaintances."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Militance" }, { label: "Categoricalness" }, { label: "Judgment" }, { label: "Conflictness" },
                    { label: "Destruction" }, { label: "Closedness" }, { label: "Aloofness" }, { label: "Whining" },
                    { label: "Distrust" }, { label: "Unconfidence" }, { label: "Mood swings" }, { label: "Desire to dominate" },
                    { label: "Emotionality" }, { label: "Ingratitude" }, { label: "Workaholism" }
                ],
                description: "You behave aggressively, often argue with people, which leads to conflicts and quarrels. You judge another person and their actions if they contradict your convictions. Categoricalness and desire to dominate are present in the character, and this prevents you from establishing trusting and open relationships with people. You carry destruction instead of creation. Eventually this leads to closedness, you become aloof and lead a solitary way of life. The second variant of manifestation of minuses by your energy is fear to go into the new, constant doubts in self and one's talents. You are unconfident, don't know what you want from life, what you would like to engage in and where to move. You don't trust people, are too emotional and experience frequent mood swings. Everything global and large-scale scares you: projects, ideas, plans. You are not ready to master new professions, refuse to travel and get acquainted with new people."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Communicability" }, { label: "Absence of debts" }, { label: "Openness to the new" }, { label: "Traveling, trips" },
                    { label: "Studying foreign languages and other cultures" }, { label: "Cognition of self and the world" }, { label: "Global thinking" },
                    { label: "International projects" }, { label: "Ideologicalness" }, { label: "Uniting people all over the world" }
                ],
                description: "Money will come through expansion, large-scale tasks and work with people. Your activity can be associated with world projects and frequent travels. You can scale an already existing business or start your own cause. Study foreign languages and other cultures. Communicate as much as possible with various people, learn from them, find out new things, go into expansion. Visit events and participate in conferences which are aimed at uniting people. You can make this world better. Such professions suit you as a negotiator, diplomat, ideologue, creative director, travel blogger and so on. Also you can try your forces in work with people. You have strong healing energy and high sensitivity. You know how to expand consciousness of others, show them new edges, open possibilities which they didn't know about. One can work as a healer, psychologist, coach, mentor, consultant."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Communicability" }, { label: "Absence of debts" }, { label: "Desire to go into the new" },
                    { label: "Expansion, scale, internet" }, { label: "Traveling" }, { label: "Foreign languages and new cultures" },
                    { label: "Cognition of the world" }, { label: "Global goals" }
                ],
                description: "You are capable of changing the world for the better. Your ideas are aimed at good, they inspire people and motivate you. Boldly go into expansion, try new things, travel, experiment. Develop your talent for healing, listen to your intuition and believe in your forces. Expand the consciousness of other people, help them reveal their possibilities. Study foreign languages. Travel. Manifest interest in other cultures and countries. Write down your fears, find causes, work through them and let go. Dream, think about global, write down your goals. Go beyond frames. Be grateful for everything what you have already. Engage in sport. Lead a healthy, eco-friendly way of life. Accept world and people such as they are, develop tolerance. Share with people, show your life, open up. Increase qualification, master new techniques and programs. Be patient, manifest flexibility, adapting to new conditions and circumstances. Lead started cause to end."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through expansion, large-scale tasks and work with people. You can scale an already existing business or start your own cause. Study foreign languages and culture of other nations. Communicate as much as possible with various people, learn from them, find out new things, go into expansion. Such professions suit you as a negotiator, diplomat, ideologue, creative director, travel blogger and so on. Also you can try your forces in work with people. You have strong healing energy and high sensitivity. You know how to expand consciousness of other people, show them new edges, open possibilities which they didn't know about. One can work as a healer, psychologist, coach, mentor, consultant. To decide on activity, ask yourself questions: What and in what way can I expand? In what global project can I take participation? How can I unite people all over the world?"
            }
        ]
    },
    22: {
        title: "Expansion of the financial channel",
        intro: "By activating this energy, we open the path to prosperity. It's one of those points that not only govern the flow of money but also determine the area of expertise.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world. In classical Tarot the zero arcana (the twenty-second energy) is the Fool, who has right to what may be forbidden or inappropriate for others, since he follows his own rules and does not limit self with traditions or social norms.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" }, { label: "Freedom" }, { label: "Innovation" }, { label: "Openness" }, { label: "Adaptability" },
                    { label: "Optimism" }, { label: "Kindness" }, { label: "Communicability" }, { label: "Adventurism" }, { label: "Independence" },
                    { label: "Going beyond frames" }, { label: "Activity" }, { label: "Movement" }, { label: "Creativity" }
                ],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations, you are open to everything new, not afraid of experiments and bright sensations. You do not accept any prohibitions, do not like work by schedule and routine. You are a free person in all manifestations. Possess limitless perception of self and life. In you there is your own depth, you can transform the consciousness of other people. Creative thinking and original ideas help you approach any task non-standardly. You bring innovation and creativity into your cause or project. Active in life, constantly in movement, travel a lot, get acquainted with interesting people. Easily adapt to new conditions. If necessary, you are ready to lead an ascetic way of life and give up material benefits for sake of your idea."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Lateness" }, { label: "Unreliability" }, { label: "Fixation on the material" },
                    { label: "Jealousy" }, { label: "Overpoweringness" }, { label: "Inadequacy" }, { label: "Dependencies" }, { label: "Suppression" },
                    { label: "Debts" }, { label: "Dissoluteness" }, { label: "Apathy" }, { label: "Non-freedom" }
                ],
                description: "You have too non-serious and irresponsible attitude to life. You do not fulfill your promises, miss deadlines, often are late for important meetings. Can behave inadequately, suppress other people or be excessively jealous. Absence of frames in a bad sense of this word leads you to a dissolute way of life, dependencies, as well as to problems with law and debts. Can get fixated on material values and money, completely forgetting about ideas and inspiration. The second variant of manifestation of minuses is tension and too serious attitude to everything. You lack lightness, you constantly worry and are in a stressful state. Don't know how to relax, don't trust life, are afraid and doubt. A sense of internal non-freedom can lead you to apathy and heavy psychological states. You don't know what you want to engage in, where you go and what inspires you."
            },
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nHere is described the manifestation of energy, which is responsible for the arrival of money, opportunities and other resources in our lives. The more this energy is in plus, the more and easier money, opportunities and other resources come into your life. Particular attention is paid to actions to expand the money channel, which it is desirable to actively do.",
                items: [
                    { label: "Own cause" }, { label: "Freedom and lightness" }, { label: "Absence of fixation on the material" },
                    { label: "Traveling" }, { label: "Absence of dependencies and limitations" }, { label: "Leadership" },
                    { label: "Ideologicalness" }, { label: "Inspiring people" }, { label: "Creativity" }, { label: "Creating the new" }
                ],
                description: "Money will come through freedom and expansion of boundaries. For you it is important absence of limitations and full freedom in actions. You can engage in creativity, creative projects, scale business or expand consciousness of a person. You are a natural-born startuper and ideologue. One can engage in various projects. Good, if work will be associated with children, but this is not mandatory. Constantly be in search of the new, try, develop, travel. One can create own project or engage in freelance. Work in hire and by schedule is not for you. Activity can be associated with trips, opening boundaries, studying new. You have well-developed creative thinking, you are full of creative and non-standard ideas. One can try oneself in the role of creative designer, illustrator, art-director, artist, etc. Also you can work with people, expand their consciousness and help them go beyond frames. Professions of psychologist, coach, mentor, consultant suit you."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Work for oneself" }, { label: "Freedom and lightness" }, { label: "Absence of fixation on money" },
                    { label: "Traveling" }, { label: "Freedom" }, { label: "Inspiring people" }
                ],
                description: "Embody your ideas into life and broadly move forward. As soon as you become a truly free person, big money will come to you. Engage in your projects, manifest creative vision and creative approach. Travel a lot and communicate with various people. Don't get fixated on the material. Don't fear to go into the new and start from zero. Travel. Engage in creativity. Spend time with children, charge from them with lightness and freedom. Don't load self with heavy tasks. Reduce communication with toxic people. Lead a healthy way of life, get rid of dependencies. Choose freelance, seasonal or project work in online-format, to work from any point of world. Implement your creative ideas. Don't limit freedom of other people, accept their opinion, views and worldview. Trust the Universe, accept everything with lightness and optimism. Engage in sport, lead an active way of life."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through freedom and expansion of boundaries. You can engage in creativity, creative projects, scale business or expand consciousness of a person. You are a natural-born startuper and ideologue. One can engage in various projects. Good, if work will be associated with children. One can create own project or engage in freelance. Work in hire and by schedule definitely is not for you. Activity can be associated with travels, opening boundaries, studying new. You have well-developed creative thinking, you are full of creative and non-standard ideas. One can try oneself in the role of creative designer, illustrator, art-director, artist and so on. Also you can work with people, expand their consciousness and help go beyond frames. Professions of psychologist, coach, mentor, consultant will suit you. To decide on activity, ask yourself questions: What creative and new can I create? What can I expand? How can I help people?"
            }
        ]
    }
};

// Financial channel 

export const financeChannelData: Record<number, FinanceSectionData> = {
    1: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the first arcana is the Magician. This energy makes a person focused, capable of immersing themselves in work and creative processes. Such people can be closed, slightly detached from the world, being inside themselves for a long time. Secret knowledge, esotericism attract people with the first energy. Often such people possess extrasensory abilities and well-developed sensitivity.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Skillful management of resources and people" },
                    { label: "Leadership positions" },
                    { label: "Leadership" },
                    { label: "Ability to delegate" },
                    { label: "Successful business" },
                    { label: "Order in business and finances" },
                    { label: "Competently built business processes" },
                    { label: "Creativity and innovation" },
                    { label: "Fast generation of ideas" }
                ],
                description: "Money can come through your ability to generate and implement ideas. You are a natural creator and innovator. You think outside the box and can create something new from nothing. Your sharp mind and ingenuity help you find non-standard solutions to any financial challenges. You can start your own business based on your unique ideas. Creativity and creative projects will bring you financial well-being. You can work in advertising, marketing, design, or any field where innovation is valued. Your oratory skills can also generate income, as you can speak publicly, teach, or promote your ideas. Freelance and project work suit you, as you do not like rigid schedules and frames. You can also engage in intellectual work: consulting, coaching, teaching, writing books or articles. Your energy attracts money when you are in a state of flow and inspiration. The more you realize your ideas, the more financial opportunities open up for you. Trust your intuition and do not be afraid to experiment. Money comes to you easily when you are doing what you love."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Leadership positions" },
                    { label: "Manage resources and people" },
                    { label: "Run a good business" },
                    { label: "Order in business and money" },
                    { label: "Know how to delegate wisely" },
                    { label: "Helping others make money" }
                ],
                description: "Financial growth is the result of wise and deliberate decisions. Develop leadership skills, learn to manage people and resources, and strive for continuous improvement. Be generous and caring with others, help your employees grow professionally. Inspire people, set goals, and strategize the company's growth. Show tenderness and care for your loved ones. Spend time with your family. Build trusting and harmonious relationships with women, especially your mom. Approach any activity in a creative and imaginative way. Realize your ideas, do not leave them in your head. Believe in yourself and your talents. Share your experience and knowledge with other people. Learn to work in a team, unite and help each other. Study secret knowledge, develop intuition and feeling."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You will suit all spheres that are aimed at creativity and innovation. Advertising, marketing, design, IT, programming, writing, art, music, acting, directing, producing. You can work as a freelancer, start your own business, or engage in intellectual work. You are good at generating ideas and implementing them. You can work as a consultant, coach, teacher, or mentor. You can also try yourself in oratory, public speaking, or teaching. You have a talent for communicating with people and can work in sales, negotiations, or customer service. To decide on a course of action, ask yourself questions: What ideas can I generate and implement? What creative projects inspire me? Where can I show my leadership and initiative? What comes easy to me? How can I help people with my knowledge and skills?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Decisiveness" },
                    { label: "Persistence" },
                    { label: "Independence" },
                    { label: "Attractiveness" },
                    { label: "Leadership" },
                    { label: "Energy" },
                    { label: "Communication" },
                    { label: "Charisma" },
                    { label: "Oratory" },
                    { label: "Intellectuality" },
                    { label: "Individuality" },
                    { label: "Innovation" },
                    { label: "Creativity" },
                    { label: "Adventurism" },
                    { label: "Ingenuity" },
                    { label: "Optimism" }
                ],
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You are able to completely abstract yourself and immerse yourself in activity. You love to study everything: yourself, people, nature, life. You have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are a slow to move and open to any experiment person. Love for something new and pulling toward learning pump your intelligence. Sharp mind and good ingenuity help to non-standardly solve any task. You are an optimist for life and ready to go for risk if necessary. Often possess extrasensory abilities: you thinly feel people and understand them on an intuitive level. These abilities can be useful when implementing your ideas and projects. If necessary, you can create and manage a team, speak in public to promote your plans and projects. Love to stand out among others, which helps you in work. Have a clear connection with the soul and inner Self, know how to make decisions in the moment. Independence in your thoughts and actions is important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Overstated/understated self-esteem" },
                    { label: "Inflated ego" },
                    { label: "Closedness" },
                    { label: "Suppression of others" },
                    { label: "Powerfulness" },
                    { label: "Conflictness" },
                    { label: "Aggression" },
                    { label: "Uncertainty" },
                    { label: "Pride" },
                    { label: "Indecisiveness" },
                    { label: "Intolerance" },
                    { label: "Self-interest" },
                    { label: "Manipulations" },
                    { label: "Secretiveness" },
                    { label: "Impatience" },
                    { label: "Loneliness" },
                    { label: "Vindictiveness" },
                    { label: "Envy" }
                ],
                description: "Energy in minus can manifest itself as overstated or, conversely, understated self-esteem. In most cases, the manifestation of precisely overstated self-esteem is characteristic, which can lead to frequent conflicts with other people. You can behave aggressively, arrogantly, infringe upon and condemn everyone around. Another variant of energy manifestation in minus is understated self-esteem. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. All this prevents your realization. You want to try everything at once, grab different activities and in the end do not bring anything to the finish, drop the case halfway. Accustom yourself to finish what you started. Evaluate your strength before taking on anything, and learn to set priorities correctly. Also you can suppress others for your own, sometimes selfish goals. You begin to manipulate and manage, as you know how to feel people well and use this skill. You are vindictive and keep a grudge in yourself for a long time. Painfully perceive any criticism of your ideas, even if it is constructive. You have a fear of theft of ideas, so you close even from loved ones and do not share your plans, dreams, thoughts. As a result, you lead a secret lifestyle. You do not want to hear your inner voice, grab everything from the fear of missing an opportunity, and at the same time cannot enjoy a truly interesting business, lose the taste for life, becoming angry and envious."
            }
        ]
    },
    2: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development. This is a female archetype that leaves its mark even if it is in the Matrix of men. For this energy, stature is characteristic, which manifests itself in a special attitude toward oneself. Such people love and understand themselves, walking with their heads held high.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Skillful management of resources and people" },
                    { label: "Leadership positions" },
                    { label: "Leadership" },
                    { label: "Ability to delegate" },
                    { label: "Successful business with women" },
                    { label: "Order in business and finances" },
                    { label: "Wisdom and softness in management" },
                    { label: "Competently built business processes" }
                ],
                description: "Money can come through working with women. You can open your own beauty salon or dance school to help other women discover their attractiveness. You should pay attention to areas where there is a feminine component. It could be working with children: nanny, tutor, child coach or teacher. Activities related to animals or plants are also suitable: veterinarian, zoologist, animal advocate or florist, owner of a flower boutique, landscape designer. You have a strong energy of abundance and fertility. You don't have to connect your life with these directions, however, having your own small garden with flowers will enhance your energy. You can also engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or the owner of your own business. You know how to properly build work processes, know how to delegate and properly allocate resources. For financial well-being, it is important to love yourself, be in harmony with the world and fulfill your desires. Delegate not only at work, but also at home. There's no need to shoulder all the household chores yourself. Get creative. You have an earthy energy, so try not to cling to material possessions. Money will come to you anyway if the energy is on the plus side."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Management positions" },
                    { label: "Manage resources and people" },
                    { label: "Run a good business" },
                    { label: "Order in business and money" },
                    { label: "Know how to delegate wisely" },
                    { label: "Business with women" },
                    { label: "Helping others make money" }
                ],
                description: "Financial growth is the result of wise and deliberate decisions. Develop leadership skills, learn to manage people and resources, and strive for continuous improvement. Be generous and caring with others, help your employees grow professionally. Inspire people, set goals, and strategize the company's growth. Show tenderness and care for your loved ones. Spend time with your family. Build trusting and harmonious relationships with women, especially your mom. Approach any activity in a creative and imaginative way. Develop your intuition, listen to your inner voice. Study spiritual practices, meditations, yoga. Take care of yourself and your body. Do not participate in intrigues and gossip. Be honest. Openly state your feelings and desires. Share knowledge and help with advice."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You will suit all spheres that are aimed at working with women: beauty salon, dance studio, women's spa. You're good at building communication with women. You can work with plants or animals: as a veterinarian, zoologist, animal rights advocate, florist, owning your own flower shop, or pursuing landscape design. You have a strong energy of abundance and fertility. You can also try your hand at working with children: nanny, tutor, sports coach or teacher. You can engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or run your own business. To decide on a course of action, ask yourself questions: In what areas can I bring order? What areas am I interested in? What comes easy to me? Where can I show my leadership skills? How and where can I competently set up my work?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Diplomacy" },
                    { label: "Kindness" },
                    { label: "Compassion" },
                    { label: "Intuition" },
                    { label: "Modesty" },
                    { label: "Romanticism" },
                    { label: "Mystery" },
                    { label: "Sensitivity" },
                    { label: "Empathy" },
                    { label: "Wisdom" },
                    { label: "Softness" },
                    { label: "Openness" },
                    { label: "Communicativeness" }
                ],
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around. You have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation. You will always find the right words, support a person and help. You accept the world and people as they are, without judgment and patterns. Sometimes you can romanticize events, believe in fate and signs of the Universe. You are always calm and know your value. You are selective in everything and love to take care of yourself. Surround yourself with beautiful objects, wear stylish clothes and original handmade jewelry. You know how to relieve physical pain, can be a healer. You can transfer energy to people through creativity: painting, music, creating clothing or jewelry, etc."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Distrust" },
                    { label: "Uncertainty" },
                    { label: "Doubts" },
                    { label: "Inconstancy" },
                    { label: "Caprices" },
                    { label: "Conflictness" },
                    { label: "Malice" },
                    { label: "Confusion" },
                    { label: "Secretiveness" },
                    { label: "Tearfulness" },
                    { label: "Hypocrisy" },
                    { label: "Jealousy" },
                    { label: "Gossip" },
                    { label: "Manipulations" },
                    { label: "Coldness" },
                    { label: "Untidiness" },
                    { label: "Dependency" }
                ],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn. You doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view. You cannot focus on one thing and confidently move toward the goal. You are thrown from side to side, you doubt the correctness of your actions and depend on the opinions of other people. In the end you can close from everyone, refuse your own realization and harbor a grudge against those around instead of gaining courage to implement the idea. You may have two sides: either you are too jealous, hot-tempered and demanding toward people, or, on the contrary, behave coldly, indifferently. You can excessively fixate on your appearance, forgetting about inner qualities. Or the opposite situation: untidiness, negligence in affairs, mess in the house."
            }
        ]
    },
    3: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the third arcana is the Empress (female energy). For a more accurate awareness of this energy, it is important to understand that the archetype of the Empress implies the presence of an Emperor next to her, so she has no need to become a tough Emperor herself. People with the energy of Empress love beauty, style and comfort. They will strive to surround themselves with good and high-quality things, to achieve a high position in society.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Skillful management of resources and people" },
                    { label: "Leadership positions" },
                    { label: "Leadership" },
                    { label: "Ability to delegate" },
                    { label: "Successful business with women" },
                    { label: "Order in business and finances" },
                    { label: "Competently built business processes" },
                    { label: "Authority" },
                    { label: "Wisdom and softness in management" }
                ],
                description: "Money can come through working with women. For example, you could open your own beauty salon or dance school to help other women discover their attractiveness. You should pay attention to areas where there is a feminine component. It could be working with children: nanny, tutor, child coach or teacher. Activities related to animals or plants are also suitable: veterinarian, zoologist, animal advocate or florist, owner of a flower boutique, landscape designer. You have a strong energy of abundance and fertility. You don't have to connect your life with these directions, however, having your own small garden with flowers will enhance your energy. You can also engage in activities that will focus on getting things in order, dealing with business issues, and running a company. You may be a leader in an organization, a deputy director, or the owner of your own business. You know how to properly build work processes, know how to delegate and properly allocate resources. For financial well-being, it is important to love yourself, be in harmony with the world and fulfill your desires. Delegate not only at work, but also at home. There's no need to shoulder all the household chores yourself. Get creative. You have an earthy energy, so try not to cling to material possessions. Money will come to you anyway if the energy is on the plus side."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Leading posts" },
                    { label: "Management of resources and people" },
                    { label: "Good business conduct" },
                    { label: "Order in affairs and money" },
                    { label: "Ability to wisely delegate" },
                    { label: "Business with women" },
                    { label: "Helping others in earning money" }
                ],
                description: "Financial growth is the result of wise and thought-out decisions. Develop leadership qualities in yourself, learn to manage people and resources, strive for constant improvement. Be generous and caring with people, help subordinates grow professionally. Inspire people, set goals, think through the company development strategy. Show tenderness and care to loved ones. Spend time with family. Build trusting and harmonious relationships with women, especially with mother. Approach any activity creatively and imaginatively. For men: develop male qualities, take responsibility for the team. Provide for family, become head and support. Be generous. Don't conflict with women. Become an authoritative leader. For women: manage people through wisdom and softness. Develop femininity, accept men and material benefits from them. Support your partner. Fix relations with mom. Create your family, raise children. Develop generosity. Learn to combine career, raising children and household."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "All spheres that are directed at work with women will suit you: beauty salon, dance studio, female spa salon. You're good at building communication with women. You can work with plants or animals: veterinarian, zoologist, animal protector, florist, own flower boutique or engage in landscape design. You have strong energy of abundance and fertility. Also can try your strength in work with children: nanny, educator, sports coach or teacher. Can engage in activity that will be directed at setting order, solving housekeeping questions and managing a company. You can be a manager in an organization, deputy director or manage own business. To decide on the direction of activity, ask yourself questions: In what processes can I set order? What spheres are interesting to me? What comes easy to me? Where can I show my leadership qualities? How and where can I competently set up work?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Leadership" },
                    { label: "Organizational abilities" },
                    { label: "Self-love" },
                    { label: "Care for others" },
                    { label: "Responsibility" },
                    { label: "Success in business" },
                    { label: "Generosity" },
                    { label: "Order in affairs" },
                    { label: "Love for comfort" },
                    { label: "Material prosperity" },
                    { label: "Taste and sense of style" },
                    { label: "Authority" },
                    { label: "Natural charm" },
                    { label: "Attractiveness" },
                    { label: "Creativity" },
                    { label: "Kindness" },
                    { label: "Good relations with women" },
                    { label: "Respect from men" },
                    { label: "Housekeeping" },
                    { label: "Sensitivity" }
                ],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround only with beautiful objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex. Success in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes. You have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you. You get along well with children and value family. For men: take more responsibility on yourself, become an authoritative head, provide for relatives materially. Your task is to translate the third energy into the male fourth. For women: you are a beautiful, soft, sexual and sensual woman. Always know your value and are not ready to agree to less. Be a caring keeper of the home hearth, gather relatives together for general holidays, support traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" }, { label: "Soft-bodiedness" },
                    { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Lack of money and career" }, { label: "No relationships" },
                    { label: "Rejection of women" }, { label: "Problems with women" }, { label: "Loneliness" }, { label: "Stinginess" },
                    { label: "Closedness" }, { label: "Obsession with appearance" }, { label: "Untidiness" }, { label: "Infantilism" },
                    { label: "Hyper-control" }, { label: "Hyper-responsibility" }, { label: "Despotism" }, { label: "Pressure on men" },
                    { label: "Tyranny" }, { label: "Choice between career and family" }, { label: "Merchantilism" }, { label: "Calculation" },
                    { label: "Problems with money" }, { label: "Unwillingness to have children" }, { label: "Egoism" }, { label: "Conflicts with women" },
                    { label: "Caprices" }, { label: "Negligence" }, { label: "Workaholism" }
                ],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly. A frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels. Problems in communication with women may arise: you don't respect them, don't accept care and affection, condemn their behavior. As a result, this leads to loneliness and lack of any relationships. For men: it's hard to succeed in male professions and business. Can be soft and indecisive. Often avoid independence and initiative. As a result, you have neither career nor money. Your main task is to translate the third energy into the male fourth. For women: may pressure men and press them. Don't respect their decisions, behave too emotionally and irresponsibly. It's hard to make a choice between family and business, always sacrificing something. Often choose professional realization and refuse to have children, which leads to loneliness and closedness."
            }
        ]
    },
    4: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision. People born with this energy have a certain attitude toward themselves - they love when they are admired and respected, and when their opinion is considered. The archetype of the Emperor, as a rule, does not manifest in a desire to serve someone or something; rather - he prefers to be in the role of a ruler, managing processes and people.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Creating order" },
                    { label: "Control of processes, but in moderation" },
                    { label: "Responsibility" },
                    { label: "Competent management of people and resources" },
                    { label: "Authority and respect" },
                    { label: "Own business" },
                    { label: "Leadership" },
                    { label: "Generosity to employees" },
                    { label: "Successful business with men" }
                ],
                description: "You are a strong and self-confident person. You know your value, observe order in affairs and skillfully manage people. Money will come through manifestation of emperor qualities: leadership, taking responsible decisions, independence, authoritativeness. You have abilities for creating own business or managing several companies. It is important to focus your efforts on strategic planning. Operational activity can be delegated to experienced managers. Set global goals and motivate the team for achievement of set results. Employees often turn to you for advice, as they see in you an authoritative and wise leader. Help them grow professionally. This will strengthen your money flow. For women: you easily succeed in working with men, so you can create own business oriented at men or work in a male collective. You are responsible, decisive, know how to effectively organize processes and manage the team. You have strong leadership energy by nature. However try to translate your fourth energy into the plus third and show more female qualities. For financial well-being learn to love yourself and feel your desires. Be in harmony with yourself. Delegate not only at work, but also at home."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Create order" },
                    { label: "Moderate control, responsibility" },
                    { label: "Management of people and resources" },
                    { label: "Power without tyranny" },
                    { label: "Own projects and business" }
                ],
                description: "Strong-willed decisions and a strong character attract financial success into your life. You must be ready to carry responsibility not only for yourself, but also for your team. Refuse from the habit of doubting and don't be afraid to make decisions. For men: establish relations with father and respect his advice. Help people grow professionally. Respect needs and opinion of other people. Take responsibility for your life, independently make decisions. Get rid of aggression. Don't suppress people. Become defender and reliable support for family. For women: accept material benefits, trust men, cooperate with men, be feminine and soft. For financial well-being learn to love yourself and feel your desires. Delegate not only at work, but also at home. Engage in creativity, more often communicate with other women. Learn softness and tenderness."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "For men, money will come through manifestation of Emperor qualities: leadership, taking responsible decisions, independence, authoritativeness. You can start your own business or manage different companies, focusing only on strategic planning. Set global goals and motivate the team for achievement of set results. For women, it's easy to work with men, so one can create own business directed at men or work in a male collective. One can also engage in activity that will be related to bringing order, solving housekeeping questions and management of a company. You can be a manager in an organization, deputy director or owner of own business. To decide on direction of activity, ask yourself questions: Where can I bring order? How can I show my leadership qualities? Where can I build effective work?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Carefulness" },
                    { label: "Housekeeping" },
                    { label: "Leadership" },
                    { label: "Calm" },
                    { label: "Confidence" },
                    { label: "Responsibility" },
                    { label: "Work capacity" },
                    { label: "Organizational skills" },
                    { label: "Logicality" },
                    { label: "Reliability" },
                    { label: "Purposefulness" },
                    { label: "Authority" },
                    { label: "Charisma" }
                ],
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance in your career, occupying high positions in the company. You value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you. People around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You have good diplomatic skills: you skillfully conduct negotiations and successfully reach agreements with people. You are a strong leader and a charismatic person. Your priority is to give the family a decent level of life and provide for them materially. For loved ones, you are an authority; your advice is listened to and trusted. For women: your task is to try to translate the fourth energy into the plus third. You like to be in the society of men and easily find a common language with them. But for harmonious relationships, do not forget about your tenderness and softness. Try to devote more time to yourself and caring for your body."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: TYRANNY, WEAKNESS, CHAOS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Authoritativeness" },
                    { label: "Tyranny" },
                    { label: "Obsession with the material" },
                    { label: "Hyper-control" },
                    { label: "Aggression" },
                    { label: "Inaction" },
                    { label: "Whining" },
                    { label: "Irresponsibility" },
                    { label: "Weakness" },
                    { label: "Uncertainty" },
                    { label: "Stubbornness" },
                    { label: "Jealousy" },
                    { label: "Fussiness" },
                    { label: "Cruelty" },
                    { label: "Belligerence" },
                    { label: "Disrespect for men" },
                    { label: "Intolerance" },
                    { label: "Criticality" },
                    { label: "Conflict nature" },
                    { label: "Categoricalness" },
                    { label: "Loneliness" },
                    { label: "Greed" }
                ],
                description: "Energy in minus can manifest in two ways. The first option is tyranny and despotism. You interfere in all working processes and family affairs. You abuse power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you show aggressiveness and cruelty toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy. In the second option, on the contrary, inaction and weak-character are manifested. Constant doubts in your own decisions prevent you from taking decisive steps, and you are prone to complaints about the injustice of life, which leads to passivity and laziness. You can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. For women: your main task is to try to translate the fourth energy into the female third. Excessive harshness and increased demandingness at work create tension in the collective. You behave like an authoritarian leader, interfering in the private affairs of each family member."
            }
        ]
    },
    5: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest. These are people of high intellect, they understand more than others, and are ready to teach and give advice when necessary. In a positive manifestation, people possessing the fifth energy are characterized by calm, poise, openness and smiling nature. They value traditions and rituals, their energy is filled with conservative values.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Good relationships with father" },
                    { label: "Constant learning" },
                    { label: "Passing knowledge" },
                    { label: "Trying the new" },
                    { label: "Creating order, following rules" },
                    { label: "Skill of management and organization" },
                    { label: "Professionalism" },
                    { label: "Reliability" },
                    { label: "Responsibility" },
                    { label: "Oratory skills" },
                    { label: "Organization of an effective system" },
                    { label: "Clear structure" },
                    { label: "Order in business and finances" }
                ],
                description: "Money can come through learning the new and passing your knowledge to other people. Think about how you can pass information. Engage in education. You have a good voice and oratory skills. You can try yourself as a teacher, mentor, orator, business trainer or diplomat. Develop these skills and use them in your business. You are inclined to organization and systematization of everything that surrounds you. Strive for order, structure and logic in everything you do. You know how to work with systems, find and fix errors, structure processes. Activity where you can manifest these qualities will suit you - developer, system administrator, IT specialist, programmer. Or it can be work related to creating a system - accountant, lawyer, politician, economist, financier, head of company or department. Also your energy is influenced by family relationships, if there is discord, then it will negatively affect finances. Especially important is your connection with father. Maintain warm relations with relatives, gather together more often, celebrate holidays and observe family traditions."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Good relationships in the family" },
                    { label: "New knowledge" },
                    { label: "Passing knowledge" },
                    { label: "Creating order and rules" },
                    { label: "Structuredness" },
                    { label: "Order in affairs and finances" }
                ],
                description: "The more you learn and pass knowledge to others, the more your financial flow. It is very important to be not just a theorist, but use knowledge in practice, teach others. Become a teacher, mentor, help people. You know well how to organize the team and working processes, conduct negotiations, inspire people and maintain order. Acknowledge different knowledge and systems. Don't get fixated on one thing. Study new information, expand your horizon. Think positively. Pass accumulated knowledge to others. Develop oratory skills. Create and maintain family traditions. Spend time with family. Listen to your intuition. Reduce control regarding loved ones, relate to others with patience and respect. Inspire and motivate people."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money can come through learning the new and passing your knowledge to other people. Also you have a good voice and oratory skills. You can try yourself as a teacher, orator, business trainer or diplomat. You know how to work with systems, find and fix errors, structure processes. Activity where you can manifest these qualities will suit you - developer, system administrator, IT specialist, programmer. Or it can be work related to creating a system - accountant, lawyer, politician, economist, financier, head of company or department. Family relationships will also influence money, therefore maintain harmonious relations with relatives, spend time together more often. To decide on direction of activity, ask yourself questions: What can I teach other people? How can I create an effective system? What and how can I structure? Where can I create rules and watch over order? Where do I see errors and how can I fix them?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Love for learning" },
                    { label: "Oratory skills" },
                    { label: "Management skills" },
                    { label: "Conservatism" },
                    { label: "Desire to teach" },
                    { label: "Help to loved ones" },
                    { label: "Family orientation" },
                    { label: "Love for traditions" },
                    { label: "Professionalism" },
                    { label: "Correctness" },
                    { label: "Systematic nature" },
                    { label: "Pedantry" },
                    { label: "Accuracy" },
                    { label: "Logicality" },
                    { label: "Order in affairs" },
                    { label: "Responsibility" },
                    { label: "Reliability" },
                    { label: "Kindness" }
                ],
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony. You can be a leader and a good manager, but you don't strive for it. You are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others. You love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Another way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Intolerance" },
                    { label: "Conflict nature" },
                    { label: "Emotionality" },
                    { label: "Egoism" },
                    { label: "Hyper-control" },
                    { label: "Judgment" },
                    { label: "Pride" },
                    { label: "Desire to suppress and teach" },
                    { label: "Limitation" },
                    { label: "Categoricalness" },
                    { label: "Harshness" },
                    { label: "Arrogance" },
                    { label: "Unwillingness to pass knowledge" },
                    { label: "Uncertainty" },
                    { label: "Fear of competition" },
                    { label: "Desire to argue" },
                    { label: "Rebellion" },
                    { label: "Fanaticism" },
                    { label: "Excessive correctness" },
                    { label: "Problems with family" }
                ],
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. You may start to control everyone around, stop trusting people, acknowledge only your truth. You are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice. There may be problems with family and creating relationships. Especially important are your relationships with father."
            }
        ]
    },
    6: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the sixth energy is the Lovers. This is a structureless, soft, enveloping energy directed at relationships and manifestation of love for oneself, others, a cause, a process. Also, it is the energy of interaction and communication. It represents a complex arcana that can cause difficulties in understanding due to the absence of a clear structure and archetypal form. The energy of this archetype is very sensitive and therefore does not always yield to logical analysis.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Trustful relationships with people" },
                    { label: "Manifestation of love and care" },
                    { label: "Creating beauty" },
                    { label: "Engaging in favorite business" },
                    { label: "Organization of people" }
                ],
                description: "Any work with people suits you. Money comes through manifestation of love for self, world, those around and business that you are engaging in. If work does not ignite you, then it will lead energy into minus and block finances. It is contraindicated for you to engage in non-favorite business and work through force. Learn to manifest love and help those around selflessly. Build relationships with colleagues and subordinates only on trust and respect. Don't try to focus on rationality and cold calculation, rely on your intuition. You delicately feel people and therefore can be a good HR specialist, personnel manager, support service specialist or head of department for work with clients. Approach work with fun, create a holiday from any process. You can try yourself in the role of events organizer, PR specialist or marketer. Maintain harmony within yourself and around. Take care of yourself, groom your body and surround with aesthetic things. Activity related to creating beauty may suit you: designer, hairdresser, stylist, makeup artist. Often money comes to you in an indirect way, not directly from your activity. Also money flow can open with the birth of a child. With financial difficulties please yourself, make a gift. If you start to save on yourself, financial flow will close."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Trustful relationships with people" },
                    { label: "Manifesting love" },
                    { label: "Creating beauty" },
                    { label: "Engaging in favorite business" },
                    { label: "Organization of people" },
                    { label: "Self-care" }
                ],
                description: "For your financial well-being it's important to find favorite business and develop in it. As long as you are in endless searches and illusions, success will not come to you. Believe in yourself and your strength. Listen to your inner voice. Choose a business that you will love with all your soul. Your work should ignite and motivate you. Don't strive for ideal. Do everything through love for self and world. Focus on positive qualities in people. Manifest love for self and care for your body. Give self and others gifts. Visit bright events and arrange thematic parties. Gather together with friends, celebrate holidays. Learn to make independent choice. Learn to forgive people and accept them as they are. Help selflessly and from heart. Don't hold on to past."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You know how to manifest love and help those around selflessly. Your relationships with colleagues and subordinates are built on trust and respect. You delicately feel people and therefore can be a good HR specialist, personnel manager, support service specialist or head of department for work with clients. Approach work with fun, create holiday from any process. You can try yourself in the role of events organizer, PR specialist or marketer. Maintain harmony within yourself and outside. Take care of yourself, groom your body and surround with aesthetic things. Activity related to creating beauty may suit you: designer, hairdresser, stylist, makeup artist. Don't doubt yourself and listen to your intuition. It is contraindicated for you to engage in non-favorite business, only for the sake of money."
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Loving nature" },
                    { label: "Communicability" },
                    { label: "Artistry" },
                    { label: "Charm" },
                    { label: "Attractiveness" },
                    { label: "Sensuality" },
                    { label: "Communication skills" },
                    { label: "Sense of taste and style" },
                    { label: "Amorousness" },
                    { label: "Ability to organize" },
                    { label: "Loyalty" },
                    { label: "Adaptability" },
                    { label: "Carefulness" },
                    { label: "Selflessness" },
                    { label: "Festivity" },
                    { label: "Emotionality" },
                    { label: "Cling to comfort" },
                    { label: "Liberalism of views" },
                    { label: "Attention to details" }
                ],
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love. Love to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language. You like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier. Engage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Living in illusions" },
                    { label: "Fixation on relationships" },
                    { label: "Frequent change of partners" },
                    { label: "Inability to make a choice" },
                    { label: "Doubts" },
                    { label: "Vulnerability" },
                    { label: "Depressive nature" },
                    { label: "Uncommunicativeness" },
                    { label: "Infantilism" },
                    { label: "Idealism" },
                    { label: "Revengefulness" },
                    { label: "Touchidness" },
                    { label: "Fixation on appearance" },
                    { label: "Egoism" },
                    { label: "Uncertainty" },
                    { label: "Problems with finances" },
                    { label: "Apathy" },
                    { label: "Loneliness" },
                    { label: "Dependence on people's opinion" },
                    { label: "Impulsivity" },
                    { label: "Distrust" },
                    { label: "Self-dislike" },
                    { label: "Desire to seem better" }
                ],
                description: "Main minuses by your energy go due to high sensitivity. You idealize and too quickly fall in love, and then for a long time stay in your delusions, which can lead to disappointment in a person. Often fixate on one relationship, and then with difficulty survive the departure. As a result, you may start to chaotically change partners, friends or projects, fearing to be disappointed and remain lonely. In your character exists a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy, don't understand what you want, where to move and where to develop. Start to listen to opinion of other people instead of taking initiative into your hands. If you go too much into idleness and lightness, then problems with finances start and debts appear. Energy in minus is opposite to your energy in plus - you don't love people, lead a closed lifestyle, don't share your successes and worries with anyone."
            }
        ]
    },
    7: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy). In classic Tarot, this arcana is called The Chariot, which symbolizes movement and heralds changes and new opportunities. The seventh energy has a clearly manifested light and dark sides: plus manifestation - movement forward, leadership, constructiveness; negative manifestation - aggression and destruction.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Clear money goals" },
                    { label: "Leadership" },
                    { label: "Goal-orientedness" },
                    { label: "Teamwork" },
                    { label: "Inspiring people" },
                    { label: "Competently building work processes" },
                    { label: "Ambition" },
                    { label: "Work capacity" },
                    { label: "Volitional character" },
                    { label: "Activity" }
                ],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set daring goals through prism of challenge. For example, set yourself task to earn a million for a certain term. Write down clear steps and follow them. You know how to correctly build work process and organize team so that to reach set goal. Thanks to your leadership skills, you will make a good manager or head. You need to constantly be in active movement: trips, travels, sport, driving car. Develop, learn, find out new. Don't stand in one place. Bring innovations to work projects, motivate team, invent new directions of development and bring started matter to the end. By your nature you are a self-sufficient person: don't depend on circumstances and surrounding opinion. Your goal-orientedness will help reach any goal, you respect personal boundaries of other people and feel yourself comfortable in solitude - these are your strong sides."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Clear money goals" },
                    { label: "Leading people" },
                    { label: "Being a leader" },
                    { label: "Working in team and inspiring" },
                    { label: "Managing processes" },
                    { label: "Developing strategy" }
                ],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set ambitious goals through prism of challenge. Develop, learn, find out new. Don't stand in one place. Be in movement. Bring innovations into work projects, motivate team, invent new directions of development and bring started matter to the end. Use your potential for peaceful goals, direct energy to creation. Refuse from meaningless struggle and goals that don't motivate you. Make emphasis on your leadership qualities. Manage your emotions and restrain warrior-likeness and aggressiveness. Carefully plan, write down stages of reaching goal, think through strategy. Share your achievements with people, inspire others. Listen to self and trust intuition. Delegate obligations. Engage in spiritual practices and active sport. Lead team behind you, take responsibility."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Finances will come through a challenge. You have maximum money energy: think about money and set daring goals through prism of challenge. You know how to correctly build work process and organize team to reach set goal. Thanks to your leadership skills you will make a good manager or head. You can create own business. You like to be in active movement: trips, travels, sport, driving car, walking on foot. You can link your activity with travels, trips, transport, logistics. Also activity related with professional sport and large physical loads suits you: trainer, instructor. To decide on direction of activity, ask yourself questions: Where can I manifest my leadership qualities? What goals inspire me? How can I throw a challenge to myself? What do I fear? How can I defeat my fear? Where do I want to move?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Goal-orientedness" },
                    { label: "Leadership" },
                    { label: "Responsibility" },
                    { label: "Skill to lead" },
                    { label: "Recognition" },
                    { label: "Teamwork" },
                    { label: "Decisiveness" },
                    { label: "Activity" },
                    { label: "Ambition" },
                    { label: "Flexibility" },
                    { label: "Organizedness" },
                    { label: "Control of emotions" },
                    { label: "Respect for people" },
                    { label: "Optimism" },
                    { label: "Work capacity" }
                ],
                description: "Male volitional energy. You are a leader and lead people. You are not bothered by appearance, much more important are internal qualities: goal-orientedness, ambition and decisiveness. You set clear goals before yourself and quickly reach them. For the sake of set task you are ready to search for ways to negotiate, know how to be flexible and diplomatic. You throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you. You love activity, it charges you and gives additional resource. It's simply necessary for you to be in movement, starting from sport and travels to educational courses and spiritual practices. Your energy is entrepreneurial. You are independent and ready to take responsibility for self and team, know how to direct people, form strategy and build plans. You are easy on the rise, charge with optimism and energy everyone around."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Destructiveness" },
                    { label: "Desire to reach goal at any cost" },
                    { label: "Struggle" },
                    { label: "Aggression" },
                    { label: "Categoricalness" },
                    { label: "Overstrain" },
                    { label: "Workaholism" },
                    { label: "Dissatisfaction with achievements" },
                    { label: "Loss of goals and sense" },
                    { label: "Irresponsibility" },
                    { label: "Fear of leadership" },
                    { label: "Stagnation" },
                    { label: "Laziness" },
                    { label: "Apathy" },
                    { label: "Emotionality" },
                    { label: "Non-realization" },
                    { label: "Uncertainty" },
                    { label: "Fussiness" }
                ],
                description: "Main minuses by your energy are warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force and wish to reach it at any cost. Suffer from own workaholism and force others to work excessively. When reach set goal, still remain dissatisfied with result. Absence of movement and challenge in life lead to stagnation. If you have no concrete goal, then start to lead meaningless struggle in one place, fuss much, commit unnecessary actions, which in the end only takes energy and doesn't lead to desired result. If you feel yourself non-realized and don't understand where to move, then this is a clear sign of energy in minus. Strong emotionality repels people from you and prevents creation of harmonious relationships. You fear taking responsibility and role of leader. There may be problems with decisiveness, for a long time stay in apathy and in one place."
            }
        ]
    },
    8: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The eighth energy, by its nature, doesn't yield to rigid definition of archetype. To the greatest degree it's corresponded by description Balinese esotericist. Owners of the eighth energy can convey to those around state of harmony and pacification, however also they easily can slide into aggression and destruction. This energy can be considered the most dual in the matrix: it has two absolutely opposite sides - light (calm) and dark (destructive).",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Study of deep knowledge" },
                    { label: "Search for justice and balance" },
                    { label: "Conveying knowledge" },
                    { label: "Honesty" },
                    { label: "Openness" },
                    { label: "Leadership" },
                    { label: "Calmness" },
                    { label: "Logical thinking" }
                ],
                description: "Money will come through balance and inner calmness. Focus on your personal equilibrium, don't go into extremes, maintain zen within yourself. Help other people find their balance. One can engage in meditations and spiritual practices. Work with people suits you: psychologist, coach, mentor. Your energy is about justice, therefore you mustn't use cunning and quick schemes of earning, manipulate people and deceive clients. In opposite case money will quickly leave you. Lead business openly and officially with conclusion of agreement. In organization you can be head of department or general director. Also professions related with law suit: lawyer, attorney, judge. You love to study deep knowledge and dive into details. You have good analytical thinking - you can use this in your work. You will make a good data analyst, business analyst, systems analyst, developer, accountant, project manager."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Observance of balance and inner calmness" },
                    { label: "Conveying knowledge" },
                    { label: "Honesty and openness in affairs" },
                    { label: "Leadership" },
                    { label: "Calmness" },
                    { label: "Logical thinking" },
                    { label: "Creativity" },
                    { label: "Study of deep knowledge" },
                    { label: "Justice" },
                    { label: "Order and structuring" }
                ],
                description: "Financial growth for person with eighth energy depends on maintaining balance and inner calmness. Focus on your personal equilibrium, don't go into extremes, maintain zen within yourself. Avoid use of cunning and quick schemes of earning, as well as manipulating people and deceiving clients. Honesty and reliability in business relationships contribute to long-term financial success. Research deep knowledge in your field and dive into details. Your analytical thinking will help you take substantiated financial decisions and create effective strategies. Always remember about importance of equilibrium in life and work. Maintain zen within yourself, what will allow you to take thought-out and balanced decisions in financial issues. Don't judge acts of other people. Preserve inner balance. Study deep knowledge and cause-and-effect links. Observe laws, be honest and open. Keep your word. Search for justice through wisdom and open dialogue. Show your true feelings to other people. Convey your knowledge further."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through balance and inner calmness. Help other people find their balance. One can engage in meditations and spiritual practices. Work with people suits you: psychologist, coach, mentor. In organization you can be head of department or general director. Also professions related with law suit: lawyer, attorney, judge. You have good analytical thinking - can use this in your work. You will make a good data analyst, business analyst, systems analyst, developer, accountant, project manager. One can create own business and engage in management. To decide on direction of activity, ask yourself questions: Where do I see injustice and how can I fix it? How can I help others find balance? How can I balance the system? Where can I add harmony? Where can I manifest my analytical skills?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Reliability" },
                    { label: "Responsibility" },
                    { label: "Openness" },
                    { label: "Kindness" },
                    { label: "Honesty" },
                    { label: "Loyalty" },
                    { label: "Courage" },
                    { label: "Confidence" },
                    { label: "Logicalness" },
                    { label: "Insightfulness" },
                    { label: "Adaptability" },
                    { label: "Pedantry" },
                    { label: "Intuition" },
                    { label: "Diplomacy" },
                    { label: "Correctness" }
                ],
                description: "Energy of justice and calmness. You are a peaceful and kind person, it's hard to get you out of yourself, however, if this happens, you become irritable and aggressive. For you it's important to find balance in all spheres of life. If balance is not there, then you will snap at those around. Also you can help others find their balance, for example, with help of meditations, spiritual practices and even usual heart-to-heart conversations. For you it's important that everything is honest and by law. You always are in search of truth, but learn to do this through acceptance, kindness and open dialogue. Without aggression and excessive emotionality. You protect rights of other people and are ready to stand on side of the weak. Perceive whole world through prism of depth and logic. You dive into work processes or family situations with head, reach the essence, sorting out each detail. Very consistent, reliable, always keep your word and ready to take responsibility. You have leadership energy, you know how to communicate with people and form professional team."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Conflictness" },
                    { label: "Categoricalness" },
                    { label: "Aggression" },
                    { label: "Sharpness" },
                    { label: "Pride" },
                    { label: "Hot-temperedness" },
                    { label: "Loss of balance" },
                    { label: "Irresponsibility" },
                    { label: "Self-criticalness" },
                    { label: "Touchiness" },
                    { label: "Manipulations" },
                    { label: "Lie" },
                    { label: "Revengefulness" },
                    { label: "Cruelty" },
                    { label: "Infidelity" }
                ],
                description: "Full opposite of energy in plus. You in aggressive manner prove your rightness, which leads to frequent quarrels and conflicts with people. If in your life there are courts, then this is a clear sign of energy in minus. You need to learn to negotiate with those around. Often your pride prevents recognizing own wrongness. If in life there is no balance, then you are thrown from extreme to extreme. You don't recognize existence of other points of view. Suppress people, often argue. Can behave sharply and hot-temperedly. Judge actions of others, refuse to understand them. Try to control loved ones and manipulate them. Often same situations in life repeat. Need to learn to notice them and try to lead energy out of minus. Always search for your balance. If engage in own business, then legally and with payment of all taxes. If relationships, then open and honest. Be loyal to your partner."
            }
        ]
    },
    9: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the ninth energy is the sage-hermit. This is a closed energy which loves to go into self, into its 'inner cave', where person can be alone with self. From birth people with ninth energy are endowed with light of wisdom, which they can convey to others. People with ninth energies well understand essence of people, phenomena, problems and life processes. Ninth energy also manifests in sensitivity and ability of person to subtly feel mood of those around. However presence of deep wisdom can lead to arrogance, when person with ninth energy starts to look at those around from above down. People with this energy are loyal, calm, tactful and respectful. Task of ninth energy - shine to others and convey one's wisdom and life experience.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: WISDOM, DEPTH, SOLITUDE\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Conveying wisdom and knowledge" },
                    { label: "Reach the essence" },
                    { label: "Deep knowledge" },
                    { label: "Analytical store of mind" },
                    { label: "Learning new" },
                    { label: "Openness" },
                    { label: "Reliability" },
                    { label: "Positive thinking" }
                ],
                description: "Money will come through wisdom and deep immersion in essence. You like to thoroughly study information, learn new and reach 'depth' of things. You are owner of rich life experience. Convey your wisdom to other people. Those around feel your energy and very self are drawn to you for advice and help. You can work as psychologist, consultant, mentor, teacher, yogi. You are comfortable being in solitude. You know how to concentrate on your work and not be distracted by extraneous matters. Also you have well developed logical thinking, there is proclivity to analysis and exact sciences. Professions suit you: developer, programmer, trader, technical specialist, accountant, data analyst. Try to avoid constant solitude, otherwise finances will suffer. You are a responsible and reliable person, always keep your word, colleagues and subordinates know that they can rely on you— these are your strong sides."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: WISDOM, DEPTH, SOLITUDE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Lead people behind" },
                    { label: "Conveying wisdom and knowledge" },
                    { label: "Analytical thinking" },
                    { label: "Positive thinking" },
                    { label: "Being open" },
                    { label: "Learning new" },
                    { label: "Moderate spending" }
                ],
                description: "For financial success you need to convey your wisdom to others. Share experience, lead people, teach. Be open, don't go into solitude and arrogance. Also you need to cognize deep knowledge, search for truth, reach essence of all things. Search for depth in everything you engage in and what fascinates you. Study secret philosophical knowledge and use them for help to others. Open your heart to people, share accumulated experience. Work with emotions and feelings, learn to speak openly and honestly. Trust people. Don't fear solitude, enjoy seclusion and silence. Draw strength in walks in solitude. Visit your places of power. More often spend time on nature. Learn to be loyal to self, listen to your intuition. You have huge potential for creation of your unique method or approach, which will have many followers."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: WISDOM, DEPTH, SOLITUDE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through wisdom and deep immersion. You are owner of rich life experience. Convey your wisdom to other people. Those around feel your energy and very self are drawn to you for advice and help. You can work as psychologist, consultant, mentor, teacher, yogi. It is important to learn to make discoveries through immersion in own world and acceptance of deep laws of life. You are comfortable being in solitude. You know how to concentrate on your work and not be distracted by extraneous matters. Also you have well developed logical thinking, there is proclivity to analysis and exact sciences. Professions suit you: developer, programmer, trader, technical specialist, accountant, data analyst. To decide on direction of activity, ask yourself questions: How can I convey knowledge further? In what activity do I see depth? What is given to me easily? How can I build work process so as to stay in seclusion? Where can I manifest my analytical skills?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: WISDOM, DEPTH, SOLITUDE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Wisdom" },
                    { label: "Depth" },
                    { label: "Sensitivity" },
                    { label: "Loyalty" },
                    { label: "Calmness" },
                    { label: "Seclusion" },
                    { label: "Learning new" },
                    { label: "Understanding people" },
                    { label: "Tactfulness" },
                    { label: "Thoroughness" },
                    { label: "Responsibility" },
                    { label: "Reliability" },
                    { label: "Carefulness" },
                    { label: "Attentiveness" },
                    { label: "Desire to convey knowledge" },
                    { label: "Modesty" }
                ],
                description: "Sage. Closed energy. You love to dive into self and your thoughts. For you it's comfortable to lead a secluded way of life. It happens that you look a bit from above down on people. Your main task — don't close from world, but on contrary shine and convey your knowledge further, otherwise risk becoming a hermit. From birth you are endowed with special wisdom, you have rich life experience. Know how to interpret situations, give useful advice, thereby help others. You better than rest understand processes and see depth in everything. Subtly feel moods of people, know what's necessary to say and what words to pick. Tactful and attentive to those around. You like solitude and silence, this way you quickly fill with energy. You are comfortable working in solitude or spending time on nature with very self. You are a responsible person who thoroughfully approaches any question and carefully studies everything. You always can be relied on. You keep your word and fulfill promises."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Reservedness" },
                    { label: "Excessive asceticism" },
                    { label: "Dislike for self and people" },
                    { label: "Pride" },
                    { label: "Judgment" },
                    { label: "Unwillingness to help" },
                    { label: "Fear of solitude" },
                    { label: "Devaluing" },
                    { label: "Distrustfulness" },
                    { label: "Indiscriminate ties" },
                    { label: "Problems with money" },
                    { label: "Neglect" },
                    { label: "Fixation on material" },
                    { label: "Fear of relationships" },
                    { label: "Uncertainty" },
                    { label: "Non-realization" },
                    { label: "Idealization of people" }
                ],
                description: "Secluded way of life leads to reservedness and closedness. You not rarely are alone. Go into asceticness, refusing from all material benefits. Deny money and achievements, what leads to problems with finances. You need to search for balance between spiritual and material. Wisdom and rich experience provoke you to arrogance and pride, you judge people and any their actions. Not rarely consider self smarter and better. Refuse to help people, what even more drives you into solitude. Your energy is subject to impostor syndrome: you are indecisive and constantly doubt in your ideas, fear to convey knowledge to others, since consider that you have insufficient skills and competencies. In end don't realize self and your talents, become apathetic and alone."
            }
        ]
    },
    10: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of this energy - startupper, player, inspirer. This is the only energy of the matrix that symbolizes luck. In presence of this energy in matrix it is necessary to pay attention to it in first place, since at minus manifestation it will lead person into heaviness. On other hand, at manifestedness in plus, lightness and luck will accompany person in all his undertakings. For tenth energy lightness and joy is important, as well as necessity of constant movement. People possessing given energy are able to easily get inspired by idea, drawing those around behind self and inspiring them for actions. Due to one's lightness and shiftlessness can without problems throw self into new matters, not having clear understanding about how to reach goal. However, as soon as they start movement forward, circumstances start to build around them in such way that resources for realization of their ideas appear.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Trust in life" },
                    { label: "Relaxed state" },
                    { label: "Participation in interesting projects" },
                    { label: "Team work" },
                    { label: "Skill to organize people" },
                    { label: "Luck in any matters" },
                    { label: "Different projects" },
                    { label: "Positive thinking" },
                    { label: "Strong intuition" },
                    { label: "Being in the flow" }
                ],
                description: "Money will come through movement and inspiration. Set ambitious goals, focus on that what charges and motivates you. Inspire other people. Constantly stay in movement. Fulfill your work easily, but responsibly. Bring what was started to end. In company positions of marketer, advertiser, PR-specialist will suit you. If you are in movement and engage in favorite matter, then luck will accompany you in any matters. You feel flow, in advance see trends and attract necessary people into your life. One can found one's startup and even more than one: from you a good, ambitious entrepreneur will turn out. Don't fixate on one activity, try different. You are an open and positive person, easily make new acquaintances. Your main task — stay in relaxed state. Then large money flow will open, necessary for you events and people will be attracted. Practice acceptance, avoid aggression and laziness."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Trusting the flow of life, being on one's wave" },
                    { label: "Skill to relax" },
                    { label: "Work in interesting projects" },
                    { label: "Work in team" },
                    { label: "Skill to organize people" }
                ],
                description: "Your financial success directly depends on skill to relax and trust Universe. More listen to your intuition, engage in any matter easily and with enthusiasm. As soon as occupation becomes in burden and stops inspiring you, possibly, it's time to change it or rest and switch to another activity. Avoid stagnation, eradicate laziness and motivate self to move forward. Travel, go on spontaneous trips. Engage in creativity. Take part in interesting projects which inspire you. Communicate with different people, make acquaintances. Find for self goal in which you can apply all accumulated experience. Refuse from controversial offers which promise easy money. Concentrate on your main goals, don't be distracted by secondary tasks. Let go of hypercontrol, stop worrying. Live in moment here and now. Work over self-discipline. Build plans and record them in diary."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money can come through inspiration, thanks to active activity and constant movement forward. Fulfill your work easily, but responsibly. Help others. In company positions of marketer, advertiser, PR-specialist will suit you. You feel flow, in advance see trends and attract necessary people into your life. One can found one's startup and even more than one: from you a good serial entrepreneur will turn out. Don't fixate on one activity, try different. It's important not to stay in depression and not reproach self for periods of inaction. Learn to listen to own intuition and trust fate. You need to stay in harmonious and relaxed state even at unstable income. Money can come randomly as winning or gift. One must not earn money by heavy physical labor with fixed schedule. This will take your energy. Learn to relax and tell self 'stop' when tired. Trust Universe."
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" },
                    { label: "Inspiration" },
                    { label: "Luck" },
                    { label: "Openness" },
                    { label: "Leadership" },
                    { label: "Adventurism" },
                    { label: "Ideality" },
                    { label: "Success in matters" },
                    { label: "Persistence" },
                    { label: "Intuition" },
                    { label: "Movement" },
                    { label: "Sociability" },
                    { label: "Communicativeness" },
                    { label: "Kindness" },
                    { label: "Optimism" }
                ],
                description: "Energy of luck and inspiration. Lucky one in life. Rules and systems are not important for you, you act only from flow. For your energy constant movement and development is important, you generate many new ideas. Can be a leader, but don't strive for this. You are open to new people, knowledge and experience. Don't bother over details and don't like routine. Any idea can inspire you, you charge up, start movement and thereby attract success to self. To you suddenly right people are encountered, unexpectedly money comes and circumstances turn out successfully. Main thing, don't deceive and don't act from mercenary goals. And also don't search for easy money or fast earning. Maintain state of inspiration — this will strengthen your energy. Engage in favorite matter, spend much time with like-minded people, communicate with different people. In any circumstances remain cheerful and open. If there is no inspiration and movement, then you start to lose luck, become apathetic and risk going into depression. Know how to relax and let go of situation, don't worry over trifles. This only strengthens your energy and attracts even more opportunities into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Heaviness" },
                    { label: "Tension" },
                    { label: "Unwillingness to move" },
                    { label: "Laziness" },
                    { label: "Passivity" },
                    { label: "Apathy" },
                    { label: "Suggestibility" },
                    { label: "Worries" },
                    { label: "Pessimism" },
                    { label: "Disrespect to people" },
                    { label: "Inconsistency" },
                    { label: "Unsystematicness" },
                    { label: "Stubbornness" },
                    { label: "Harmful habits" },
                    { label: "Lack of independence" },
                    { label: "Debts" },
                    { label: "Fears" },
                    { label: "Worrisomeness" }
                ],
                description: "Your main minuses — this is absence of movement. You are initiative-less, no ideas and desire to move forward to your goals. As consequence, you lose inspiration and luck. Harmful habits and problems with money can form. If there is no movement in life, then you go into apathy. Constantly whimsical, judge those around and complain on life. Fears - one more manifestation of your minuses. You fear to take for new matter, don't believe in that luck will be on your side. Main rule for you: even if lazy, all the same continue at least some movement. This can be whatever: go for walk in park, start reading book, meet with friends or sign up for courses, which you for long time postponed. Activity will lead your energy into plus and all circumstances themselves will start to turn out in successful way."
            }
        ]
    },
    11: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of the eleventh energy — 'Strength' (masculine energy). At plus manifestation, a person with the eleventh energy is endowed with physical and/or internal strength. This energy gives the person a strong internal core. Personalities endowed with this energy possess the gift of seeing potential in people and projects, they are ready to invest their forces to help this potential unfold. Such people can give support and help in the development of opportunities, applying maximum efforts for this. This is leadership energy, open and sincere. They love to be in first place, can lead people behind them, in which bright charisma helps them. Such people know how to solve problems and take responsibility on themselves, they are persistent and ambitious, can move forward despite anything. They value practicality and adaptability, with ease know how to build processes maximally effectively for reaching the result.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Industriousness" },
                    { label: "Persistence" },
                    { label: "Leadership" },
                    { label: "Skill to manage" },
                    { label: "Own projects or business" },
                    { label: "Physical labor" },
                    { label: "Organization of people" },
                    { label: "Responsibility" },
                    { label: "Will power" }
                ],
                description: "Money will come through realization of potential. Engage in work in which you see perspectives for development. You know how to organize people and set clear goals. You see potential not only in work, but in people too. Trust your intuition, listen to inner voice — it will not let you down. From you an excellent head of department, general director or manager will turn out. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. One can create one's business, gather team and go to goals in which you believe. Also your activity can be related with physical labor and work with body, since you have strong health and good endurance. You can engage in sports and reach great heights. Or one can help people gain body of their dreams: fitness trainer, body practitioner, yogi. You have much physical energy, therefore don't be shy to manifest your sexuality. Intimate life will influence arrival of money."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Industriousness" },
                    { label: "Skill to manage" },
                    { label: "Use of strength for good" },
                    { label: "Own project or business" },
                    { label: "Physical labor" }
                ],
                description: "Money will come through realization of potential. Engage in work in which you see perspectives for development. Trust your intuition, listen to inner voice — it will not let you down. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. Learn to manage your strength, use it for good. Engage in sports and lead active healthy way of life. Communicate with successful people, get inspired. Think through strategy, record plans and follow them. Be calm and patient. Don't judge unhurriedness of others. Become leader in your sphere. Learn to yield and go for compromise. Interact with people, and not suppress. More often be on nature. Rest, relax, meditate."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You see potential not only in work, but in people too. Trust your intuition, listen to inner voice — it will not let you down. From you an excellent head of department, general director or manager will turn out. You have strong leadership energy and volitional character. You can work much and for long, if goal inspires you. People themselves are drawn to you, you charge with enthusiasm everyone around. One can create one's business. Also your activity can be related with physical labor and body, since you have strong health and good endurance. You can engage in sports and will reach great heights. Or one can help people gain body of their dreams: fitness trainer, body practitioner, yogi, healer. To decide on direction of activity, ask yourself questions: Where do I see potential? What direction do I consider promising? What business can I create? For sake of what goal am I ready to work much? What charges me? Where can I manifest my leadership qualities?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Leadership" },
                    { label: "Responsibility" },
                    { label: "Capacity for work" },
                    { label: "Persistence" },
                    { label: "Ambitiousness" },
                    { label: "Adaptability" },
                    { label: "Practicality" },
                    { label: "Curiosity" },
                    { label: "Individuality" },
                    { label: "Organizational skills" },
                    { label: "Skill to lead behind self" },
                    { label: "Charisma" },
                    { label: "Sincerity" },
                    { label: "Integrity" },
                    { label: "Desire to create new" }
                ],
                description: "Masculine volitional energy. You are a person with strong character and internal core. Love for work and huge life energy motivate you to move forward. You are practical, search for benefit in everything and build processes maximally effectively, avoiding unnecessary routine and meaningless actions. Constantly study new directions, very curious. Possess ability to see and reveal potential: in advance see perspective in project or person, apply efforts for its revealing. You know exactly what idea can shoot in future and on what need to make a stake. You love to be in first place and feel self a winner. Ready to take responsibility and initiative in your hands, possess leadership entrepreneurial energy. Always strive for individuality, being a charismatic and bright personality. You have good physical strength. Actively engage in sports, you have strong health. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Workaholism" },
                    { label: "Overstrain" },
                    { label: "Ignoring problems" },
                    { label: "Impatience" },
                    { label: "Aggressiveness" },
                    { label: "Irritability" },
                    { label: "Suppressing others" },
                    { label: "Laziness" },
                    { label: "Whining" },
                    { label: "Rudeness" },
                    { label: "Powerlessness" },
                    { label: "Weakness" },
                    { label: "Indecisiveness" },
                    { label: "Conflictness" },
                    { label: "Hysteria" },
                    { label: "Greed" },
                    { label: "Problems with mom" },
                    { label: "Problems in sex" }
                ],
                description: "Due to excessive workaholism you overstrain too much at work and rest little. Press on people and force to work beyond measure. Become impatient, lead self audaciously and rudely. Or on the contrary, lack of will power and decisiveness force you to be lazy and complain on life, what leads to weak-characteredness. You fear conflicts and try to avoid them, but on other hand cannot control your emotions and start to quarrel without visible reasons. Happen to be petty and greedy. Likely, in childhood there was strong role model in person of mom, who unconsciously suppressed you or self and her desires, what led to tense relationships between you. You don't accept your body and sexuality, constantly ill, lead unhealthy way of life and are shy of your appearance."
            }
        ]
    },
    12: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Twelfth energy means 'suspendedness'. Person sees the world as if upside down, differently, in other way, not like others. Exactly because of this given energy is the energy of different vision, innovation and creation of something unique and unusual. They see world and self differently. People with twelfth energy love to do everything in their own way, they know how to bring something new into any project. Innovation, creative and inventiveness of twelfth energy help easily find way out of any problems. For them there are no unsolvable tasks, they with ease improvise, thinking up something on the go, work in state of flow. Often twelfth energy can be encountered in creative people. Other important direction of pluses of this energy - serving. These are people whose heart is open for surrounding world, and soul shines with bright light, enveloping everyone around with warmth and care.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Creativity" },
                    { label: "Serving people" },
                    { label: "Different look on everything" },
                    { label: "Decent payment for your labor" },
                    { label: "Skill to refuse" }
                ],
                description: "Money will come through new ideas and creativity. You possess own vision which no one else has. Create and realize your creative ideas. Don't be shy to propose your ideas, more often arrange meetings with team on which you together will be able to generate and come up with something new. One can try self in role of creative producer, art-director, main editor, designer or marketer. Also finances can come through serving to people. You are a kind and responsive person who is always ready to come to help others. You have a large open heart. From you an excellent specialist of support service or head of department work with clients will turn out. Learn to refuse people, don't work to detriment of self and take a fair price for your labor. More often delegate work and less control team. Learn to let go of projects which no longer charge you, don't cling to them."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Creativity" },
                    { label: "Help to people" },
                    { label: "Different look" },
                    { label: "Creativity" },
                    { label: "Taking decent payment" },
                    { label: "Skill to say no" }
                ],
                description: "For your success two components are important. First — don't be shy to set fair price and take money for your labor. Second — money is also energy which should freely move. Don't engage in excessive accumulation and calmly spend on self and loved ones. Learn to look at habitual things in a new way. Develop creativity. Learn everything unusual and interesting. Learn to non-standardly approach resolution of tasks. Say 'no' in time and don't take on self someone else's work. Clearly build personal boundaries. Don't devalue your labor, set fair price. Raise self-esteem, strengthen faith in self. Make yourself presents and learn to live for self, and not only for sake of others. It's important to love self and exit from state of victim."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through new ideas and creativity. You possess own vision which no one else has. Create and realize your creative ideas. Don't be shy to propose your ideas, more often arrange meetings with team, on which you together will be able to generate new ideas. One can try self in role of creative producer, art-director, main editor, designer or marketer. You are a kind and responsive person who is always ready to come to help others. You have a large open heart. From you an excellent specialist of support service or head of department for work with clients will turn out. To decide on activity, ask yourself questions: What inspires me? Into what activity can I bring new? Where can I manifest my creative skills? How can I serve people? In what sphere can I render help and support?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Kindness" },
                    { label: "Serving" },
                    { label: "Responsiveness" },
                    { label: "Innovation" },
                    { label: "Creativity" },
                    { label: "Compassion" },
                    { label: "Support" },
                    { label: "Healing" },
                    { label: "Generation of ideas" },
                    { label: "Self-discipline" },
                    { label: "Openness" },
                    { label: "Love for learning" },
                    { label: "Easy resolution of problems" },
                    { label: "Amorousness" },
                    { label: "Inventiveness" },
                    { label: "Individuality" },
                    { label: "Love for nature" },
                    { label: "Sensitivity" }
                ],
                description: "You look at world differently, not like everyone. You have a different look on processes and events. Know how to see and interpret signs and symbols which are understandable only to you. Love to do everything in your own way, creatively and innovatively approach resolution of any task, so, as no one did this before. You are a bright individuality, see self as special and stand out among others. You are an idea-person. Well-read, can with ease explain even the most complex information. Work in flow, come up with ideas on the go and love to improvise. This is your element. Feel people, energy, space well. Extremely inventive, what at times helps to find non-standard way out of difficult situation. You have an open and kind heart. Responsive and ready to always come to help. At times can go into victimhood, forgetting about self and your desires. You need to learn to say people 'no'. You like to make people's lives better, what brings internal satisfaction. More often act not from logic, but in sincere impulse of soul. Know how to serve selflessly, not demanding anything in return. Accept people such as they are."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Victimhood" },
                    { label: "Touchiness" },
                    { label: "Depressions" },
                    { label: "Negativity" },
                    { label: "Inability to refuse" },
                    { label: "Desire to be good" },
                    { label: "Doubts" },
                    { label: "Non-confidence" },
                    { label: "Need for love" },
                    { label: "Strong attachment to people" },
                    { label: "Panic" },
                    { label: "Self-destruction" },
                    { label: "Subconscious feeling of guilt" },
                    { label: "Lack of money" },
                    { label: "Dislike for self" },
                    { label: "Illusions" }
                ],
                description: "You are in the role of victim. It seems to you that you do everything for people, but don't get anything in return. Much you take close to heart, extremely vulnerable and touchy. In aggregate all this can lead to self-destruction: problems with alcohol, dependencies, depression and solitude. At times forget about self and your desires. Try to be good for everyone. Don't know how to say 'no' to other people. Very dependent on opinion of those around, constantly wait for praise and approval. If you don't get them, start to blame and hate self. Accept self and people such as they are. Don't build illusions and expectations. There can be problems with creativity and unique look on life. It's difficult for you to realize your own ideas, often stay in creative crisis. Don't know how to promote your vision, doubts and non-confidence in self interfere. Hence non-realizedness. Value and love self, care about your comfort and put your desires in priority."
            }
        ]
    },
    13: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Thirteenth energy doesn't have a specific archetype, it is structureless. This is energy of renewal and transformation. In classic Tarot energy is represented by arcana 'Death', but it's important to understand that in Matrix of Abundance death is a designation of transformation, getting rid of old and birth of new. 'Daring hero' — description mostly suitable for archetype of thirteenth energy. People with thirteenth energy possess ability to discard old and obsolete, to create place for new. They with enthusiasm relate to transformation, alterations and changes often become driving force in creation of changes. Not afraid to risk and cross boundaries to reach their goals. Help other people overcome established norms and expectations, what in final result leads to new opportunities and innovations.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Diverse activity" },
                    { label: "Absence of routine" },
                    { label: "Try new" },
                    { label: "Creativity" },
                    { label: "Lead matter to end" },
                    { label: "Fight with fears" },
                    { label: "Daring" },
                    { label: "Risk" },
                    { label: "Transformation" },
                    { label: "Inspire to changes" }
                ],
                description: "Money will come through transformations. If they are absent, then your energy self will attract changes, but already through negative, because of this difficulties can start. For example, bankruptcy of company or forced change of work. Don't be afraid of changes, bravely go into them, as well as help others overcome difficulties. Old should die, and new be born. Refuse in work from everything what is no longer viable. In company you can become crisis-manager, business-coach, producing editor, art-director. You have high sensitivity, you easily adapt under new conditions and activity. Also sphere which balances on edge of life and death will suit you: extremes, athletes, stuntmen, military, rescuers. Not necessarily to choose dangerous professions, main thing, so that in your activity there would be no routine. If renewals are absent, then your finances can quickly go into minus."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Diverse activity" },
                    { label: "Absence of routine" },
                    { label: "Try new" },
                    { label: "Creativity" },
                    { label: "Lead matter to end" },
                    { label: "Fight with fears" },
                    { label: "Daring" },
                    { label: "Riskiness" },
                    { label: "Transformations of self and other people" },
                    { label: "Inspire into changes" }
                ],
                description: "Your finances depend on how much you are open to everything new and unknown. If you are not afraid to go into development and experiment, then very quickly will gain financial success. If changes will not be, then your energy will start self to attract them through negative, and difficulties can start. Set order in matters, things and relationships. Fix in writing your ideas, plans and dreams. Engage in creativity. Get rid of that what doesn't lead you to result. Don't take for multitude of matters at once, concentrate on something one. Lead any matter to end. Learn to be more calm and peaceful. Live here and now, get rid of fussiness. Stop being afraid for relatives and close ones, as well as excessively worry. Be joyful and optimistic. Experiment in all spheres: in relationships, at work, with style in clothing, interior of home and so on. If you risk, then justifiedly. Work over positive thinking, search for pluses even in the most complex situations. Bravely start new stages in your life."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You are not afraid of changes, bravely go into them, as well as help others overcome difficulties. Old should die, and new be born. In company you can become crisis-manager, business-coach, producing editor, art-director. Everything is accessible to you what is related with transformations, trips and travels. Also sphere which balances on edge of life and death will suit you: extremes, athletes, stuntmen, military, rescuers. Not necessarily to choose dangerous professions, main thing, that in your profession there would be no routine. You can develop in art, creativity, beauty. Professions of designer or stylist suit, where you will completely change space or person. To decide on activity, ask yourself questions: What can I transform? Where can I bring changes? From what can I refuse in favor of new? In what activity is there no routine? What do I want to change?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Love for life" },
                    { label: "Bravery" },
                    { label: "Activity" },
                    { label: "Fearlessness" },
                    { label: "Inspiration" },
                    { label: "Desire for changes" },
                    { label: "Straightforwardness" },
                    { label: "Honesty" },
                    { label: "Unpredictability" },
                    { label: "Leadership" },
                    { label: "Adaptability" },
                    { label: "Sexuality" },
                    { label: "Efficiency" },
                    { label: "Practicality" }
                ],
                description: "You are an interesting and unusual person. You are surrounded by atmosphere of mysteriousness and mysticism. Structureless esoteric energy. You are capable to transform thinking of people or working processes. Inspire into new, help overcome difficulties and non-simple events. It's important for you to constantly change something in your life, receive new experience, go to the end, having refused from fears and doubts. Global transformations interest you which will help make life better. You know how to refuse from old and obsolete, that what already long ago doesn't work. You don't like predictability. Any stability you break and change under yourself. Interested in different aspects of life, curious and creative, easily get involved in everything new and unusual. Always hold self confidently and will not get lost even in extreme situation. Easily concentrate, and in complex conditions act without panic. You have dulled fear of danger, therefore extreme types of sport can attract you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Harshness" },
                    { label: "Pessimism" },
                    { label: "Aggressiveness" },
                    { label: "Fear of death" },
                    { label: "Recklessness" },
                    { label: "Fussiness" },
                    { label: "Timidity" },
                    { label: "Passivity" },
                    { label: "Stagnation" },
                    { label: "Coldness" },
                    { label: "Calculativeness" },
                    { label: "Carelessness" },
                    { label: "Riskiness" }
                ],
                description: "If energy is in minus zone, then you fear changes. It's fearful for you to go into new, you get stuck on one place and don't realize your talents. Clutch at past and already obsolete. Accumulate junk at home, stack, preserve and fear to lose. In minus doubts in self appear, fears, unnecessary fussiness. If you will not act independently, then your energy self will start to attract forced changes: dismissals, loss of loved ones or money and so on. On other hand, you can lead self harshly and aggressively. Try to bring changes forcibly where they are not ready yet for them. There can be mood swings, excessive emotionality. Constantly change work, cannot choose something one. Can take for several matters at once and not a single one lead to end. Love to stay on edge of life and death, go for unsubstantiated and at times stupid risk. Situations are not excluded where you can turn out on edge of life and death: accidents, illnesses, clinical death."
            }
        ]
    },
    14: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of fourteenth energy — artist and creator. This is very creative, refined, soft energy. Lightness, spirituality and connection with higher, connection with flow is inherent to it. For representatives of this energy it's not important how they look from point of view of assessment by society, it's important for them to be in state of inspiration and have possibility to manifest themselves. Creative structure of this energy endows person with tendency to frequent mood swings. First orientation of this energy — creativity, creation of works of art. Such people easily succeed in connection to flow and reading information, which they easily transform into art (into singing, music, creation of paintings or sculptures etc.). Second direction — spirituality. They often feel desire to find their place in world and their true path.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Listen to internal voice" },
                    { label: "Creativity" },
                    { label: "Favorite matter" },
                    { label: "Own path" },
                    { label: "Soulfulness" },
                    { label: "Openness" },
                    { label: "Nobility" },
                    { label: "Work in flow" }
                ],
                description: "Money will come through creativity. You have soft energy, you need to learn to listen to self and your internal voice. Be in state of creator. Connect to your flow and create. You by your nature are aesthete and delicately feeling person. Engage in favorite matter, go by own path and don't listen to advice of those around. Any activity will suit you which will be related with art: writer, composer, artist, musician, dancer, designer, illustrator and so on. Also money can come through spirituality and deep knowledge. You feel others well, therefore it's possible to direct your energy on work with people: engage in psychology, esoterics, spiritual practices. Manifest soulfulness to those around and open your heart. Professions of psychologist, yogi, spiritual teacher, mentor, healer will suit you. Your task — to listen to your heart and internal voice. It's necessary for you to find mutual understanding with self to understand own deep desires and strivings."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Listening to internal voice" },
                    { label: "Engaging in creativity" },
                    { label: "Engaging in favorite matter" },
                    { label: "Going by one's path" },
                    { label: "Manifesting soulfulness" }
                ],
                description: "Success depends on your sensitivity and skill to open up to world. Manifest your creativity, engage in creativity, search for your calling. As soon as you find matter which is to your heart, money will come to you in large quantity. Express emotions openly, don't suppress them. Fight with bad habits, lead healthy way of life. Manifest honesty and openness in matters and with people. Learn moderation and patience. Receive high from uncertainty and unpredictability. Meditate, engage in spiritual practices. Inspire self through study of art: music, literature, painting, theater. Rest, take hot bath, visit baths, saunas, aroma-steaming. Walk more often in parks and outside city. Leave for new places. Visit your places of power. Master new directions for self. Combine creativity and income. Listen to your internal voice, develop intuition, take decisions based on internal sensations."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through creativity. Be always in state of creator. Connect to your flow and create. Engage in favorite matter, go by own path and don't listen to advice of those around. Any activity will suit you which will be related with art: writer, composer, artist, musician, dancer, designer, illustrator and so on. Money can come through spirituality and deep knowledge. You feel people well, therefore it's possible to direct your energy on work with them: engage in psychology, esoterics, spiritual practices. Manifest soulfulness and openness to surrounding people. Professions of psychologist, yogi, spiritual teacher, mentor, healer will suit you. It's necessary for you to find mutual understanding with self, understand own deep desires and strivings. Find harmony inside, follow your flow. Believe in self and reveal your talent through creativity. To decide on activity, ask yourself questions: What do I like to engage in most of all? Where can I manifest my creative abilities? How can I help people? What do I feel? What do I want? Where am I going? What are my goals? What creativity can I create?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" },
                    { label: "Softness" },
                    { label: "Sensitivity" },
                    { label: "Intellectuality" },
                    { label: "Soulfulness" },
                    { label: "Healing" },
                    { label: "Morality" },
                    { label: "Wisdom" },
                    { label: "Calm" },
                    { label: "Harmoniousness" },
                    { label: "Modesty" },
                    { label: "Patience" },
                    { label: "Decency" },
                    { label: "Nobility" },
                    { label: "Delicate taste" },
                    { label: "Refinement" }
                ],
                description: "Soft creative energy. You are a refined nature who possesses strong spiritual and healing energy. You live and create in flow. You inspire people and charge them. Energy can manifest through creativity, creation and spirituality. First variant — creation of your art, own creative magic. You like to create in solitude and calm. You connect to flow, and ideas themselves come into your head. In you there is depth and internal peace. You understand own desires and strivings. Inside you there is always harmony. Also you possess internal core and strength of spirit. Can be leader among creative people, unite them around into collective to create together. Second variant — this is psychology, spirituality, healing and esoterics. You study secret esoteric knowledge. You have powerful flow energy. You delicately feel people and know how to help them. Possibly, there are abilities for healing. High intellect. Often live by mood and inspiration. You are a soulful person with whom it's always interesting to talk on different themes. Constantly study new and share knowledge with others. You have moral landmark to which you strive. You are a decent and noble person: communicate with people honestly and openly, not deceiving either self or others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Callousness" },
                    { label: "Soul-less-ness" },
                    { label: "Attachment to material" },
                    { label: "Touchiness" },
                    { label: "Impulsiveness" },
                    { label: "Infantilism" },
                    { label: "Going into extremes" },
                    { label: "Desire to punish and blame" },
                    { label: "Rudeness" },
                    { label: "Capriciousness" },
                    { label: "Immoderation" },
                    { label: "Greed" },
                    { label: "Vulnerability" }
                ],
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme, at times you yourself cannot decide what you want. Excessively sensitive. You are easy to offend and touch. Don't perceive criticism towards self, even constructive. Or, on contrary, you manifest harshness, daring and callousness. You are closed from people. Lead self rudely and often happen to be impulsive. Can get angry, drop everything, and then regret about taken decision. There is risk to acquire strong dependency or harmful addictions. Too much hold onto past, don't know how to forgive and let go. Not rarely there are periods of emptiness and non-belief in own forces and possibilities. You get attached to money and material values. Don't know sense of measure, you always have little of everything. Don't realize self in creativity."
            }
        ]
    },
    15: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of fifteenth energy — devil and tempter (masculine energy). This is energy of sexuality and attractiveness, which can literally strike with current and charge people. Owners of this energy can be dual: on one hand they have ability to provide help to people, and on other, under guise of providing help they can start to manage and manipulate. Characteristic feature of person possessing fifteenth energy is that those surrounding him often experience irritation, anger and hatred during interaction with him. This happens because fifteenth arcana like an X-ray person highlights painful points in people. In such way those surrounding can either go into growth, having realized true reason of their anger, or will continue to experience negative emotions in relation to person with given energy. This is an X-ray person, who feels weaknesses and vices, sees people through and can fix their problematic sides.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Global projects" },
                    { label: "Honest income without deception" },
                    { label: "Don't get fixated on money and material values" },
                    { label: "Respect people and their opinion" }
                ],
                description: "Finances can come through correction: of process, person or system. You notice defects, weak places and fix them. You know how to make beautifully, brightly and catchingly. You know how to create quality product for multitude of people. Good marketer, designer, illustrator will come out of you. You are a charming and good-natured person, what helps to easily establish contact with people. For you it will not be difficult to find approach to person and promote your idea. Can be head of company/department or create your business. Work can be related with oratory, manifestation of charisma, individuality and attractiveness. Engage in any creativity: actress (actor), blogger, model, work in media and public professions. Also you can engage in correction of people: you see their vices and help to become better. One can try self in quality of psychologist, mentor, coach, consultant, esoteric. Any spiritual practices and teachings can also be used in one's professional activity. You have deep knowledge which you can transmit to others."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Going into global projects" },
                    { label: "Engaging in favorite matter" },
                    { label: "Not searching for easy money" },
                    { label: "Not getting fixated on finances and material values" },
                    { label: "Being honest and open" },
                    { label: "Respecting people" }
                ],
                description: "Determine what you want to engage in in life and boldly move in this direction. Use strong sides of your character. Find favorite matter which will inspire you. Never deceive self and those surrounding. Respect people, accept their choice. Learn to see world and people through prism of good. Develop spiritually. Work over internal aggression. Get rid of cynicism and selfishness. Accept and forgive people, learn to be flexible. Open your heart for love, learn to gift it to others. Help people become better. Learn to relax and trust. Don't manipulate people. Engage in spiritual practices, yoga, meditation. Activate your sexual energy. Engage in creativity. Free self from bad habits and harmful dependencies. Worthily pass all trials by large money. With ease accept and let go money. Be grateful for that what already you have. Hold balance between spiritual and material."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Finances can come through correction: of process, person or system. You notice defects, weak places and fix them. You know how to make beautifully, brightly and catchingly. You know how to create quality product for people. Good marketer, designer, illustrator will come out of you. Work can be related with oratory, manifestation of charisma, individuality and attractiveness. Engage in any creativity: acting, blogging, modeling, work in media and any public professions. Also you can engage in correction of people: you see their vices and help to become better. One can try self in quality of psychologist, mentor, coach, consultant, esoteric. To decide on activity, ask yourself questions: What can I fix and where do I see weaknesses and defects? How can I help people? In what sphere can I apply my talents?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energetic" },
                    { label: "Positive" },
                    { label: "Love for entertainment and pleasures" },
                    { label: "Love for material values" },
                    { label: "Good intuition" },
                    { label: "Clairvoyance" },
                    { label: "Wisdom" },
                    { label: "Understanding of essence of things" },
                    { label: "Luck" },
                    { label: "Fascination" },
                    { label: "Attractiveness" },
                    { label: "Style" },
                    { label: "Oratorical abilities" },
                    { label: "Openness to trips and adventures" },
                    { label: "Compassion" },
                    { label: "Kindness" },
                    { label: "Ability to help others" },
                    { label: "Sexuality" }
                ],
                description: "You have a strong energy of temptation. X-ray person: you see all subtleties and defects in another person or work process, you know how to fix it and make it better. You can trigger people, call up negative emotions and lift their internal work-throughs outside. You help to fix self and become better, but do this in your special way — through temptations. However you also are subject to different temptations. You love pleasures, luxury and comfort. You love money and value benefits, but don't get fixated on them. Know how to hold balance between material and spiritual. You know how to find approach to person, immediately see where to press and where his painful points are located. You are diplomatic, know how to negotiate. You have good connection with internal voice, intuition and higher forces. Possess gift of clairvoyance. Know how to charge and direct other people. Strong esoteric energy. You are possessor of deep knowledge, therefore they often turn to you for advice. Always look good, dress stylishly, attract people by external appearance and bright charisma. Sexual and charming. Much internal energy, you want to create and create, generate ideas, move forward to your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Aggressiveness" },
                    { label: "Jealousy" },
                    { label: "Envy" },
                    { label: "Vulnerability" },
                    { label: "Dependencies" },
                    { label: "Arrogance" },
                    { label: "Thirst for power" },
                    { label: "Pride" },
                    { label: "Fixation on material" },
                    { label: "Suppression of people" },
                    { label: "Rigidity" },
                    { label: "Deception for sake of profit" },
                    { label: "Greed" },
                    { label: "Selfishness" },
                    { label: "Betrayal" },
                    { label: "Black magic" },
                    { label: "Excessive control" },
                    { label: "Manipulations" },
                    { label: "Stubbornness" },
                    { label: "Irritability" },
                    { label: "Criticality" }
                ],
                description: "You can fall into different dependencies and temptations (alcohol, drugs etc.). Manipulate people, press on their weak points, know how to touch and wound. Deceive in selfish goals. Can lead self arrogantly, want to possess power over people and try to suppress. Critically relate to opinion of others, not ready to hear and listen, dispute, lead self stubbornly, get irritated by any reason. In character there are selfishness and pride. You think only about yourself and your desires, putting other people as nothing. Love for luxury and excessive striving for material benefits make you greedy fixated on money, what interferes with revealing of talents. Can excessively guard near ones, even manifest rigidity and aggression to them. Not rarely there are situations when you betray person close to you for sake of temptations and desires."
            }
        ]
    },
    16: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of sixteenth energy — revolutionary. By classic of Tarot, sixteenth arcana is called 'tower', which symbolizes support and confidence. To people with this energy it's important to be on their path, otherwise life can start to direct them in necessary direction through destruction of habitual way. In plus such person can create new, often thanks to destruction of old. People with sixteenth energy are not afraid to refuse from outdated things and ideas which ceased to be actual. In process of life transformation they experience 'rebirth' and achieve new level in their life. Internal calm and acceptance are necessary for representatives of sixteenth energy when changes happen in their life, for that to not succumb to negative emotions, but on contrary be ready for rebirth for next, better stage of one's life. Sixteenth energy — energy of ideas and spirituality. Its owners have connection with flow, through which they draw their inspiration, charge with strength and energy for embodiment of received ideas.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Listen to yourself" },
                    { label: "Go into new" },
                    { label: "Don't get fixated on money and material values" },
                    { label: "Leadership" },
                    { label: "Spirituality" },
                    { label: "Own path" },
                    { label: "Activity" },
                    { label: "Change of setting, travels, movement" },
                    { label: "New ideas" }
                ],
                description: "Money will come through ideology. You are a revolutionary by life: break old and on this place create new. You have creative and non-standard thinking, easily generate ideas and inspire people to follow behind you. You can go into spirituality, study esoteric knowledge and transmit them to others. Good healer, psychologist, energy practitioner, yogi, mentor will come out of you. Your work should ignite and motivate you. Listen only to your internal voice, move behind idea and cast off all doubts. Your bold and daring thinking allows to look differently at habitual processes, and huge amount of energy helps to embody ideas into life. All creative and creative professions suit you, where you will be able to gather around self team of like-minded people: editor-in-chief, creative producer, art director, creative head and so on."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Listening to self" },
                    { label: "Going into new" },
                    { label: "Not clinging to material" },
                    { label: "Refusal from old" },
                    { label: "Going into spirituality" },
                    { label: "Moderation" }
                ],
                description: "The less you think about material, the more money you have. Concentrate on ideas, embody them into life, inspire people. Learn to build processes from zero. Act decisively and boldly, don't doubt in self. Work over self, become better than yesterday. Learn to live consciously, be grateful for everything what already you have. Refuse from old beliefs and settings. Cleanse your space, do decluttering, conduct cleanings. Travel, study new cultures, search for inspiration. Practice various austerities. Meditate, engage in yoga, read spiritual and esoteric literature. Work over internal aggression and free self from negative emotions. Strengthen your physical health, engage in sport. Calmly and with gratitude accept any changes in life. Change environment if it starts to pull you down. Develop and change your life for better. Share new knowledge with people, be open, trust. Not to regret about past, free self from old."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You inspire people for changes and lead behind self. Can go into spirituality, study esoteric knowledge and transmit them to others. Good healer, psychologist, energy practitioner, yogi, mentor will come out of you. Your bold and daring thinking allows to look differently at habitual processes, and huge amount of energy helps to embody ideas into life. All creative and creative professions suit you, where you will be able to gather around self team of like-minded people: editor-in-chief, creative producer, art director, creative head and so on. To decide on activity, ask yourself questions: What new I want to create? What idea drives me? What inspires me? In what I can produce revolution?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Spirituality" },
                    { label: "Clairvoyance" },
                    { label: "Energetic" },
                    { label: "Strength of spirit" },
                    { label: "Innovation" },
                    { label: "Leadership" },
                    { label: "Determination" },
                    { label: "Adventurism" },
                    { label: "Adaptability" },
                    { label: "Bravery" },
                    { label: "Development" },
                    { label: "Self-knowledge" },
                    { label: "Creativity" },
                    { label: "Creation" },
                    { label: "Honesty" }
                ],
                description: "You live here and now, look differently at things and events. Thanks to life experience you are capable to change world-view and extract important lessons from past. Strong daring energy. You are not afraid to go into new, open to changes, thanks to what you receive positive changes in life. You destroy old, dishonest, insincere, not real and create on this place new. This can be new work, completion of old relationships, change of place of residence and so on. You are a self-confident person who stands firmly on feet. Possessor of powerful strength and energy. Can inspire others, lead behind self, motivate for changes. Good ideological leader and mentor will come out of you. You have a kind and honest heart, ideas are always driving you, directed at help to others. You don't get fixated on money and material, concentrating on your ambitious ideas and their realization. Easily adapt to any conditions, can even live in asceticism if goal requires this. Also you have non-standard thinking and rich imagination. Strong flow energy: you generate creative ideas which move you forward. Love to reflect, search, try. Constantly develop and cognize new. Spiritual energy: you like deep esoteric knowledge, different practices, unusual experience. You want to try everything on yourself. Boldly experiment and search for your own."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Health problems" },
                    { label: "Aggressiveness" },
                    { label: "Categoricalness" },
                    { label: "Rigidity" },
                    { label: "Hot-temperedness" },
                    { label: "Destructiveness" },
                    { label: "Lack of spirituality" },
                    { label: "Attachment to old" },
                    { label: "Chaoticness" },
                    { label: "Pull to dangerous" },
                    { label: "Unmanageability" },
                    { label: "Fraud" },
                    { label: "Deception" },
                    { label: "Dependencies" },
                    { label: "Helplessness" },
                    { label: "Vulnerability" }
                ],
                description: "First important minus by your energy — excessive rigidity. You cut from shoulder, say in face of person everything what you think, happens to be incorrect and categorical. Aggressively go break-through and often over heads for sake of your goal. Bear destruction instead of creation. Material values and money drive you, you refuse from spiritual and can fall into dependencies. Start to deceive self and people. If you now have problems with health, then this is clear sign of energy in minus. Other side of minus energy — this is sluggishness, indecisiveness, doubts and strong attachment to old. You fear changes, not ready to go into new, it's scary for you to manifest and open to people. You don't have ideas, don't understand where you want to move. Not ready to lead people, refuse from leadership and ambitions. If you won't develop, then life will force you to do this in sharp, unpredictable and sad way — through loss of work, near person, money and so on."
            }
        ]
    },
    17: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "Archetype of seventeenth energy — star person, who realized one's talents (feminine energy). This is a soft and creative energy, which needs to follow one's star (listen to self, go for one's dream). For people with seventeenth energy it's important to shine and gather attention thanks to their creativity. People with such energy possess a strong ego, they strive for leadership and don't wish to stay in shade. It's important for them to receive praise and recognition of their abilities and talents, as well as attract attention of those surrounding. People with seventeenth energy are creative and refined, they fascinate and call admiration. Thanks to its sensitivity seventeenth energy has two vectors of directionality — creativity and spirituality. People with this energy possess well-developed intuition, ability to feel subtle energies and understand their meanings.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Creativity" },
                    { label: "Openness" },
                    { label: "Trust to people and life" },
                    { label: "Faith in self and one's abilities" },
                    { label: "Showing your talents to the world" }
                ],
                description: "Money will come through creativity or spirituality. Your essence — to show yourself to the world. You are a bright, creative person who always has many ideas and задумок. Think how you can embody them into life. Create for the benefit of others, open to the world your brightness and uniqueness. Reveal your talents and help in this to others. Any public activity suits you: actress (actor), producer, influencer, blogger, musician, singer, model, director and so on. Also you can use your creative skills in design, marketing, advertising, show business, art, creating a unique product. Form around self a team of like-minded people, be a leader, direct and inspire. It is contraindicated for you to stay in the shade or in second roles. Don't fear to demonstrate your brightness. Also you can take up spiritual and esoteric practices, using your sensitivity and strong intuition. Professions of psychologist, spiritual mentor, yogi, esoteric, healer suit you."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Engaging in creativity" },
                    { label: "Being open" },
                    { label: "Trusting people" },
                    { label: "Believing in self and one's talent" },
                    { label: "Showing self to the world" },
                    { label: "Inspiring people" },
                    { label: "Leading to spirituality" }
                ],
                description: "Be open and friendly, help people reveal their talents, inspire for changes. The more followers and fans you will have who will believe in you, the faster financial success will come. Write down your goal and in what way you can implement it. Share your thoughts and ideas with close people, receive support from them. Reveal your creative potential, show to the world your talents. Engage in creativity, create, invent, manifest. Find favorite matter which will inspire you. Follow impulses of your heart, develop intuition. Communicate with like-minded people, get acquainted with different people, be open to communication. Don't fear to experiment, be bright. Visit parties and events, go out into world. Dress up, think through your image and style. Accept your uniqueness, share it with the world. Refuse from pride and vanity. Be open, gift love. Allow self to be successful and famous. Become example for many, inspire people."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through creativity or spirituality. Your task — to show yourself to the world. You are a bright, creative person who always has many ideas and задумок. Any public activity suits you: actress (actor), producer, influencer, blogger, musician, singer, model, director and so on. Also you can use your creative skills in design, marketing, advertising, show business, art, creating a unique product. Form around self a team of like-minded people, be a leader, direct and inspire. Or you can take up spiritual and esoteric practices, using sensitivity and strong intuition. Professions of psychologist, spiritual mentor, yogi, esoteric, healer, energy practitioner suit you. Also you can be an artist, confectioner, organizer of events, designer of interiors, clothes, 3-D graphics. Journalism, trade, astronomy, research of nature: geology, archaeology etc. will suit you. To decide on activity, ask yourself questions: How I can manifest my talents? In what is my uniqueness? In what creativity I want to engage? What inspires me?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" },
                    { label: "Desire to be in center of attention" },
                    { label: "Brightness" },
                    { label: "Emotionality" },
                    { label: "Artistry" },
                    { label: "Charm" },
                    { label: "Love for self" },
                    { label: "Lightness" },
                    { label: "Sensitivity" },
                    { label: "Intuition" },
                    { label: "Individuality" },
                    { label: "Imagination" },
                    { label: "Optimism" },
                    { label: "Persistence" },
                    { label: "Ambitiousness" },
                    { label: "Openness" }
                ],
                description: "Soft creative energy. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for a dream and listen only to the internal voice. You shine for those around you, you are in the center of attention, you are admired and you are imitated. You like publicity and fame. You don't like to be in the shade and in second roles. Ambitiousness and large-scale goals motivate to move forward, to create, to produce and to demonstrate self and one's talents to the world. You have an attractive appearance, you take care of self and one's body. Often you receive compliments and attract gazes. You possess a unique imagination and creative thinking. You know how to create art which will please many. You draw inspiration from nature and from communication with like-minded people. You are a kind and open person. You can heal others, thanks to your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics. You study everything new and try it on yourself."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Unrealizedness" },
                    { label: "Lack of confidence" },
                    { label: "Pride" },
                    { label: "Stardom" },
                    { label: "Vanity" },
                    { label: "Fixation on material" },
                    { label: "Withdrawal from reality" },
                    { label: "Deception" },
                    { label: "Illusions" },
                    { label: "Selfishness" },
                    { label: "Fear of unknown" },
                    { label: "Problems with sexuality" }
                ],
                description: "First variant of manifestation of minuses by energy — this is unrealizedness. You stay in shade, don't reveal your talents, doubt in self and your forces. Don't understand where to move, what to engage in and what inspires you. You are shy to stay in center of attention, don't like to be in sight and lead a closed way of life. Confident in self, you fear everything and refuse to implement your dream. Stay in creative crisis. Second variant — pride, vanity, star sickness. You go away from reality, start to get stuck up, behave with people selfishly, command, manipulate, often advance your requirements and conditions. Not ready to go for compromise. Get fixated on your success, money and material benefits, forgetting about spiritual. Live in own illusions, can fall into dependencies: alcohol, drugs, promiscuous way of life and so on. Deceive self, thinking that with other people something is not so instead of that to search for root of problem in self. Don't accept your appearance, consider yourself an unattractive and ugly person. Often there are problems with sexuality. Shy of self and one's body."
            }
        ]
    },
    18: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy that is associated with the astral body, intuition, sensing. In the classical Tarot, this arcana is called 'The Moon,' which speaks of attraction, mystery, and the mysticism of this energy. The eighteenth energy is closely related to the subconscious and depth. It is an esoteric energy that attracts everything mysterious, secret, and unknown. It symbolizes the unconscious part of a person and can be expressed in unique abilities for perception and understanding of the surrounding world. People with the eighteenth energy are mysterious, free in spirit, 'flown away' from the real world. They are often in their internal world of thoughts and fantasies, deeply reflective and possess intuitive, sensitive perception. In plus, they find a balance between the internal world and external circumstances, can radiate positivity and optimism.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, RELEASE OF FEARS\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Studying secret knowledge" },
                    { label: "Creativity" },
                    { label: "Powerful imagination" },
                    { label: "Own path" },
                    { label: "Positive thinking" },
                    { label: "Attracting what you desire" },
                    { label: "Esoterics, magic" },
                    { label: "Absence of fears and doubts" }
                ],
                description: "Money will come through creation of your magic in any matter. Go your own way, listen to intuition and focus on your desires. You have well-developed creative and non-standard thinking. You approach work non-standardly and know how to bring creative into the creative process. Professions that are related with visualization of images may suit you: graphic designer, illustrator, interface developer, creative, director. Also thanks to your heightened sensitivity and magical skills, you can work with secret and sacred knowledge: esoteric, psychologist, philosopher, mentor, tattoo artist. Let go your fears, for you have very strong energetics, therefore you easily attract everything you think about, both bad and good. Focus on positive. Visualize and write down desires — in your case this will perfectly help in implementation."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, RELEASE OF FEARS\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Magic, psychology, esoterics" },
                    { label: "Studying secret knowledge" },
                    { label: "Creativity, unique approach" },
                    { label: "Imagination" },
                    { label: "Going your own path" },
                    { label: "Positive thinking" }
                ],
                description: "Well-being is directly related with your thinking. Refuse from illusions and fears, replace negative settings with positive. Be conscious. Any event which may seem difficult — this is your point of growth. In moments of strong anxiety and fear let worries through self, try to understand what precisely causes fear in you. Work through your fears: live through and let go. Focus on specific tasks and actions which will lead you to desired result. Develop intuition. Think positively, make vision boards, be grateful for everything what you already have in your life. Trust others, speak truth. Be more often in nature, especially near water. Lead healthy way of life. Develop your talents. Stop doubting your possibilities. Visualize positive, successful images. Learn to see opportunities in life and use them. Think creatively, use your non-standard approach in any matter. Communicate with different creative people, get acquainted, don't close in self."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, RELEASE OF FEARS\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You have well-developed creative and non-standard thinking. You think non-standardly and are capable of bringing something unusual into any creative process. Professions related with visualization may suit you: graphic designer, illustrator, interface developer, creative, director. Thanks to your heightened sensitivity and magical skills, you can work with secret sacred knowledge to help others: esoteric, psychologist, philosopher, mentor, tattoo artist. It's important for you to cope with your fears and overcome internal barriers. To decide on activity, ask yourself questions: Where I can manifest my magic? What do I do well? In what do I see depth? What am I afraid of?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, RELEASE OF FEARS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Mystery" },
                    { label: "Intuition" },
                    { label: "Materialization of thoughts" },
                    { label: "Liberation from fears" },
                    { label: "Strong imagination" },
                    { label: "Attractiveness" },
                    { label: "Sensitivity" },
                    { label: "Versatility" },
                    { label: "Success" },
                    { label: "Striving for beauty" },
                    { label: "Fast learning ability" },
                    { label: "Artistry" },
                    { label: "Positive thinking" },
                    { label: "Creative abilities" },
                    { label: "Fast exit from negative" },
                    { label: "Interest in knowledge" }
                ],
                description: "Structureless soft energy. Your energy is related to deep immersion. You possess strong intuition and the ability to attract what you desire, so it is so important for you to think positively and fight fears, otherwise you will attract them into your life. You like to study everything related to the unconscious and magical, you are fond of spiritual and esoteric practices. You are mysterious and attractive to other people, you like to decorate your body: tattoos, piercing, bright hair, unusual appearance, etc. You can calmly 'fly away' from the external, real world and go into your subconscious. Often you are in your own fantasies and thoughts, not noticing the surrounding environment. You prefer everything abstract, creative, and unusual. Structure, system, and order are not for you. You create your magic in your work or creativity, think non-standardly, are fond of esoterics, meditations, tarot, etc. You go your own way and do everything in your own way, not paying attention to the opinions of other people. You listen only to your internal voice. You are a soft and kind person, easily adapt to any conditions. You have a strongly developed sensing of yourself. You know how to help, what to say and do in a specific situation. People often turn to you for advice. You are interested in different directions of activity, whatever you take up, everything works out easily and without strain. You have a strong connection with the Moon and lunar cycles. The full moon has an especially strong impact on you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Withdrawal from reality" },
                    { label: "Addictions" },
                    { label: "Depressiveness" },
                    { label: "Anxiety" },
                    { label: "Hypocrisy" },
                    { label: "Doubts" },
                    { label: "Closedness" },
                    { label: "Victim state" },
                    { label: "Destruction" },
                    { label: "Inaction" },
                    { label: "Unrealizedness" },
                    { label: "Vindictiveness" },
                    { label: "Resentfulness" },
                    { label: "Laziness" },
                    { label: "Apathy" },
                    { label: "Indecisiveness" },
                    { label: "Whining" },
                    { label: "Anger" },
                    { label: "Touchiness" },
                    { label: "Inertness" },
                    { label: "Pessimism" },
                    { label: "Loneliness" },
                    { label: "Non-acceptance of sexuality" },
                    { label: "Magic to harm others" }
                ],
                description: "The first direction of minuses by your energy is excessive closedness and withdrawal from reality. It can reach addictions (alcohol, drugs, etc.) and depressions. You are capable of immersing yourself in your thoughts so much that you refuse to contact the real world. Sometimes you behave hypocritically, smiling to the face, but inside experiencing indignation and condemnation towards the person. You may like gossip. The second direction of minuses is fears. You constantly doubt, fear, cannot make a decision and take responsibility. You stay in the victim state, complain about the injustice of life, whine a lot, but do nothing. It's difficult for you to make the first step towards your goal, you are inert and slow. All this leads to unrealizedness, closedness, and resentment at the whole world. It's important for you to maintain positive thinking, not immersing in pessimism and negative. Your energy is capable of attracting everything you think about, so all fears and worries can easily be realized for you. Do not use your abilities to harm others (evil eye, damage, etc.)."
            }
        ]
    },
    19: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy. People with the nineteenth energy are endowed with warmth, creative potential, they can engage in global projects. They possess internal strength and move forward, striving for grand achievements. They are capable of turning their creative ideas into reality. Representatives of this energy are characterized by optimism and care for others. This is an ideological energy that inspires people to create and implement projects, capable of motivating and leading other people if the project causes delight and enthusiasm. It is important for such people to have a passionate hobby, to be devoted to their cause, to shine brightly for others and bring warmth to those around them. This energy also possesses the strength of action and great potential.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Own business" },
                    { label: "Global projects" },
                    { label: "Influencing people and leading" },
                    { label: "Good relationships with father" },
                    { label: "Charity" },
                    { label: "Favorite cause" },
                    { label: "Relaxed and calm state" },
                    { label: "Love for self" }
                ],
                description: "For you it's important to burn with your cause, inspire, be the Sun for others: lead, motivate, create. Through this state big money will come. You can take part in a global project or start your own business. Management positions in projects aimed at help and charity suit you. For example, organizer of spiritual meetings or events, founder of a charitable foundation or children's center. Any activity aimed at serving others will be a suitable option for you. Also you have well-developed creative and innovative skills, thanks to which you can create your own unique product. All creative professions suit you — art director, head of a creative team, editor-in-chief, creative director, owner of a design agency, etc. Good relationships with family, and first of all with father, will also influence your finances."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Own favorite cause" },
                    { label: "Big projects" },
                    { label: "Influencing people" },
                    { label: "Charity" },
                    { label: "Leading others" },
                    { label: "Good relationships in family" },
                    { label: "Love for self" },
                    { label: "Relaxing and having fun" }
                ],
                description: "Your financial path is large projects and international business. Realize your creative potential, don't be afraid to go into new and scale. Ignite people, inspire by your example, direct your huge energy for good. Engage in projects aimed at helping others. Find a favorite cause that you will burn with. Remember, every person has right of choice. Don't judge and don't force to act against will. Be an example for others. Communicate, get acquainted with new people, be open and benevolent. Support loved ones. Regularly rest and care for self: spa, massage, hot bath, bathhouse, sauna. Think positively. Engage in creativity, develop your creative skills. Engage in charity, help others. Wake up early, do exercises, meditate. Morning is time of big energy for you. Be grateful for what you have already now. Engage in sport, lead active way of life. Think globally."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "You can take part in a global project or start your own business. Management positions in projects aimed at help and charity suit you. For example, organizer of spiritual meetings or events, creator of a charitable foundation or children's center. Any activity aimed at serving others will be a suitable option for you. Also you have well-developed creative and creative skills, thanks to which you can create your own unique product. All creative professions suit you: art director, head of a creative team, editor-in-chief, creative director, owner of a design agency, etc. To decide on activity, ask yourself questions: Where I can manifest my leadership qualities? What inspires and ignites me? Where I can help others?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energeticness" },
                    { label: "Leadership" },
                    { label: "Carefulness" },
                    { label: "Love of life" },
                    { label: "Optimism" },
                    { label: "Success" },
                    { label: "Authoritativeness" },
                    { label: "Desire to help" },
                    { label: "Wellbeing" },
                    { label: "Creativity" },
                    { label: "Collectiveness" },
                    { label: "Activity" },
                    { label: "Ambitiousness" },
                    { label: "Kindness" },
                    { label: "Lightness" },
                    { label: "Curiosity" },
                    { label: "Sexuality" }
                ],
                description: "Leadership energy. You are a team player and are an authority for other people. You like to be in the center of attention, you have big ambitions and global goals. Your energy is the energy of the Sun. You carry warmth, light, and goodness to people through work, communication, actions. You are ready to shine and inspire, always smiling and charming. You have positive thinking and a huge flow of life energy that helps to move towards the goal. You love to engage in kind, charitable projects aimed at helping people, nature, animals, etc. You are an ideological person, it is important for you that the goal inspires and charges you. You are not ready to work only for money or material values. If there is a cool idea that you burn with, the result will not keep you waiting. You are ready to take on large-scale projects that affect many people around the world. You like to engage in creativity, create new things, and show creativity. You are free in your manifestation and always achieve success in the chosen activity. You have a strong connection with nature. You can pass powerful streams of energy through yourself, which help in achieving global goals. You are a 'battery' person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Demandingness" },
                    { label: "Vanity" },
                    { label: "Hypercontrol" },
                    { label: "Egoism" },
                    { label: "Hot temper" },
                    { label: "Aggressiveness" },
                    { label: "Fixation on the material" },
                    { label: "Irresponsibility" },
                    { label: "Fear of big projects" },
                    { label: "Pride" },
                    { label: "Fanaticism" },
                    { label: "Envy" },
                    { label: "Powerfulness" },
                    { label: "Rudeness" },
                    { label: "Feeling of guilt" },
                    { label: "Illnesses" },
                    { label: "Fuss" },
                    { label: "Chaoticness" },
                    { label: "Bad relationships with father" }
                ],
                description: "The first manifestation of minuses by your energy is rigidity and excessive demandingness towards people. You set impossible goals and unrealistic deadlines, pressure your subordinates, and sometimes demand fulfillment of set tasks in an aggressive form. You manifest hypercontrol and do not trust loved ones. You can reach fanaticism in your cause. You behave powerfully and despotically with those around you. You often envy, constantly comparing yourself with others. At the same time, you have an inflated ego, you pay attention only to yourself, fixate on your desires, not thinking about others. Not infrequently you focus only on money and financial success, completely forgetting about the higher goal and inspiration. The second manifestation is fading, apathy, doubts, and fears. You are not ready to take responsibility and become a leader, you are afraid to move towards your goal, you get lost and act chaotically. Fear to start a big, global project is possible, since you constantly experience a feeling of guilt, doubt, and dissatisfaction with yourself. In childhood, bad relationships with father could have formed, or he was a powerful and despotic person, suppressed you and your desires, or the reverse situation — he was too soft, indecisive, and others suppressed him."
            }
        ]
    },
    20: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "This energy is one of the most complex to understand. The twentieth energy lacks a clear structure and archetype. According to the classical Tarot, this is the 'Judgment' arcana, which hints that a person with this energy can be just, knows how to judge and condemn. The energy of the twentieth arcana is associated with the concept of connection, as its goal is to combine different aspects, both spiritual and physical, as well as to unite people among themselves. Owners of this energy are capable of creating integral products from different components (often manifested in producers, marketers). They can also help other people find integrity in their lives. This is an esoteric energy with developed intuition, which can connect with a flow and pass it through self, expressing what is seen in creativity or a product. It is important for people with the twentieth energy to be in a state of creative inspiration and manifest their creativity.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Good relationships within family" },
                    { label: "Trying new things" },
                    { label: "Developing intuition" },
                    { label: "Creating the integral" },
                    { label: "Balance in life" },
                    { label: "Helping people" },
                    { label: "Gathering a team" },
                    { label: "Uniting people" },
                    { label: "Favorite cause" }
                ],
                description: "Money will come through the creation of integral systems, searching for errors and their elimination. You feel trends in advance and know how to create a finished high-quality product. You easily unite people around you and gather a team. Create in a flow and inspire others. You can try yourself in the role of a producer, artist, painter, marketer, and someone who creates a product. You have high sensitivity and the gift of clairvoyance. You like studying everything new, spiritual, and esoteric. You can use these skills to help other people. Professions of a mentor, coach, healer, consultant, psychologist will suit you. Also finances can come through family: family business or work with relatives."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Good relationships with relatives" },
                    { label: "Going into the new" },
                    { label: "Developing intuition" },
                    { label: "Creating the whole" }
                ],
                description: "Create integrity in your life and help others find it. Engage in work that appeals to your soul and inspires you. Develop your intuition and sensitivity. Try new things. Study esoteric knowledge and spiritual practices. Maintain harmonious relationships in the family, gather together more often, arrange holidays and joint events. Engage in spiritual practices, meditation, yoga. Lead a healthy way of life. Engage in creativity. Live in a flow. Engage in sport. Transmit your wisdom to others. Develop sensuality, intuition, clairvoyance. Learn to create the integral, help people find integrity. Write down your goals and tasks, follow the plan. Practice forgiveness and acceptance. Communicate more often with relatives, spend time with family. Study your ancestry: family history, genealogy, etc. Maintain family traditions and values."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through the creation of integral systems. You feel trends in advance and know how to create a finished high-quality product. You easily unite people around you and gather a team. You can try yourself in the role of a producer, artist, painter, marketer, and someone who creates a product. You have high sensitivity and the gift of clairvoyance. You like studying everything new, spiritual, and esoteric. You can use these skills to help other people. Professions of a mentor, coach, healer, consultant, psychologist will suit you. Also finances can come through family: family business or work with relatives. To decide on activity, ask yourself questions: what do I feel and see? What whole can I create? What integral product can I make? How can I help people find integrity?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Claircognizance" },
                    { label: "Healing" },
                    { label: "Intuition" },
                    { label: "Ideologicalness" },
                    { label: "Mysteriousness" },
                    { label: "Sensitivity" },
                    { label: "Interest in the unusual" },
                    { label: "Versatility" },
                    { label: "Wisdom" },
                    { label: "Stability" },
                    { label: "Authoritativeness" },
                    { label: "Adaptability" },
                    { label: "Ability to manage" },
                    { label: "Scale" },
                    { label: "Family-orientedness" },
                    { label: "Connection with ancestry" }
                ],
                description: "You have a talent for uniting and creating something integral. You can create new projects, unique products, or unite people. You manage to find a balance between the spiritual and the material. You see what a person or a project lacks to become integral, what flaws and shortcomings exist, and how to fix them. You have strong sensitivity and a powerful gift of clairvoyance. When you live in a flow, interesting ideas and insights can unexpectedly come. Intuition is well-developed, you trust your internal voice. You are sometimes mysterious in the eyes of other people. You like to help. You possess deep life wisdom and people often come to you for advice and support. You are a versatile and interesting personality. You are drawn to everything unusual and esoteric. You are fond of psychology, studying deep and sacred knowledge. You easily adapt to new conditions. You are stable in any changes and stressful situations. You can manage people, but do not strive for this. You like uniting and working together more. You have a strong connection with your family and ancestry. You value relationships and home comfort, gather loved ones together, help to solve conflict situations and disputes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Judgment" },
                    { label: "Resentments" },
                    { label: "Problems with relatives" },
                    { label: "Pride" },
                    { label: "Aggressiveness" },
                    { label: "Categoricalness" },
                    { label: "Rigidity" },
                    { label: "Fear of changes" },
                    { label: "Fear of criticism" },
                    { label: "Bad habits" },
                    { label: "Weakness of character" },
                    { label: "Lack of spirituality" },
                    { label: "Anger" }
                ],
                description: "You lack integrity and balance in life. You cannot find a soul-appealing cause, do not understand where to move and what you want. You cannot assemble yourself, it is scary for you to go into something new, there is a fear of changes. You don't believe in yourself and your talents, often doubt. All this leads to weak character, bad habits, and addictions. It may happen that you fixate on material values and money, and not on an idea and a favorite cause, which eventually leads to losses. Or vice versa, you may behave as a rigid and authoritarian person. You constantly demand something from others, are not ready to share, lead a secretive lifestyle. In conflicts, you manifest your aggression, which can offend a loved one. Not infrequently there are problems with family: quarrels, conflicts, and misunderstanding lead to cessation of communication with relatives."
            }
        ]
    },
    21: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to a peaceful solution of problems and to harmonization of everything around. The twenty-first energy is open to the world and surrounding people, ready to accept and respect other points of view and cultures. This is the energy of diplomacy, love, expansion. It is harmonious, ready to go into the new. People with the twenty-first energy can be called a Person of the World, who unites everyone around. People with this energy are kind, strive for peace in the whole world, for harmonious relationships. Also this is the energy of expansion of activity or consciousness. The energy gives you readiness to lead others and promote your ideas. Representatives of this energy love to travel in order to expand their horizon and learn more about lives of people from different cultures and countries. They are distinguished by good adaptability, the ability to quickly adapt to new circumstances and people.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Communicability" },
                    { label: "Absence of debts" },
                    { label: "Openness to the new" },
                    { label: "Traveling, trips" },
                    { label: "Studying foreign languages and other cultures" },
                    { label: "Cognition of self and the world" },
                    { label: "Global thinking" },
                    { label: "International projects" },
                    { label: "Ideologicalness" },
                    { label: "Uniting people all over the world" }
                ],
                description: "Money will come through expansion, large-scale tasks and work with people. Your activity can be associated with world projects and frequent travels. You can scale an already existing business or start your own cause. Study foreign languages and other cultures. Communicate as much as possible with various people, learn from them, find out new things, go into expansion. Visit events and participate in conferences which are aimed at uniting people. You can make this world better. Such professions suit you as a negotiator, diplomat, ideologue, creative director, travel blogger and so on. Also you can try your forces in work with people. You have strong healing energy and high sensitivity. You know how to expand consciousness of others, show them new edges, open possibilities which they didn't know about. One can work as a healer, psychologist, coach, mentor, consultant."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Communicability" },
                    { label: "Absence of debts" },
                    { label: "Desire to go into the new" },
                    { label: "Expansion, scale, internet" },
                    { label: "Traveling" },
                    { label: "Foreign languages and new cultures" },
                    { label: "Cognition of the world" },
                    { label: "Global goals" }
                ],
                description: "You are capable of changing the world for the better. Your ideas are aimed at good, they inspire people and motivate you. Boldly go into expansion, try new things, travel, experiment. Develop your talent for healing, listen to your intuition and believe in your forces. Expand the consciousness of other people, help them reveal their possibilities. Study foreign languages. Travel. Manifest interest in other cultures and countries. Write down your fears, find causes, work through them and let go. Dream, think about global, write down your goals. Go beyond frames. Be grateful for everything what you have already. Engage in sport. Lead a healthy, eco-friendly way of life. Accept world and people such as they are, develop tolerance. Share with people, show your life, open up. One can start leading a blog in internet. Increase qualification, master new techniques and programs. Be patient, manifest flexibility, adapting to new conditions and circumstances. Lead started cause to end. Practice acceptance. Do your work for good and with kind message."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through expansion, large-scale tasks and work with people. You can scale an already existing business or start your own cause. Study foreign languages and culture of other nations. Communicate as much as possible with various people, learn from them, find out new things, go into expansion. Such professions suit you as a negotiator, diplomat, ideologue, creative director, travel blogger and so on. Also you can try your forces in work with people. You have strong healing energy and high sensitivity. You know how to expand consciousness of other people, show them new edges, open possibilities which they didn't know about. One can work as a healer, psychologist, coach, mentor, consultant and so on. To decide on activity, ask yourself questions: What and in what way can I expand? In what global project can I take participation? How can I unite people all over the world?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Diplomacy" },
                    { label: "Ability to lead" },
                    { label: "Interest in travel" },
                    { label: "Adaptability" },
                    { label: "Uniting people" },
                    { label: "Sensitivity" },
                    { label: "Healing" },
                    { label: "Freedom" },
                    { label: "Communicability" },
                    { label: "Ideologicalness" },
                    { label: "Globality" },
                    { label: "Tolerance" },
                    { label: "Openness" },
                    { label: "Scale" }
                ],
                description: "Soft female energy. You are open to the new and unknown, love to receive diverse experience and experiment in everything. You have flexible thinking, you easily adapt to new conditions and circumstances. You are a cheerful, kind, and smiling person. You like to engage in creativity and generate creative ideas. Your energy is very ideological, therefore you can become inspired by some idea, gather a team and lead it to the goal. You are for harmony and peace in the whole world, always smooth over conflict situations and sharp corners. You know how to negotiate, find a compromise in any situation, listen and hear your interlocutor. You think positively, are always open and help people. Healing, clairvoyance, and intuition are well-developed in you. You think globally, scale projects. You like to study all edges and possibilities of your personality, you are ready to go beyond usual frames and generally accepted standards. You travel often, study other cultures and languages. You are open to communication, very communicative, easily make new acquaintances."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Militance" },
                    { label: "Categoricalness" },
                    { label: "Judgment" },
                    { label: "Conflictness" },
                    { label: "Destruction" },
                    { label: "Closedness" },
                    { label: "Aloofness" },
                    { label: "Whining" },
                    { label: "Distrust" },
                    { label: "Unconfidence" },
                    { label: "Mood swings" },
                    { label: "Desire to dominate" },
                    { label: "Emotionality" },
                    { label: "Ingratitude" },
                    { label: "Workaholism" }
                ],
                description: "You behave aggressively, often argue with people, which leads to conflicts and quarrels. You judge another person and their actions if they contradict your convictions. Categoricalness and desire to dominate are present in the character, and this prevents you from establishing trusting and open relationships with people. You carry destruction instead of creation. Eventually this leads to closedness, you become aloof and lead a solitary way of life. The second variant of manifestation of minuses by your energy is fear to go into the new, constant doubts in self and one's talents. You are unconfident, don't know what you want from life, what you would like to engage in and where to move. You don't trust people, are too emotional and experience frequent mood swings. Everything global and large-scale scares you: projects, ideas, plans. You are not ready to master new professions, refuse to travel and get acquainted with new people."
            }
        ]
    },
    22: {
        title: "Financial channel",
        intro: "By activating the energy of the financial channel, we can increase the amount of money, opportunities, and resources that come into our lives. The energy of the financial channel is one of those energies that is not only responsible for the flow of money but also influences the direction of professional activities.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world. In classical Tarot the zero arcana (the twenty-second energy) — the Fool — has right to what may be forbidden or inappropriate for others, since he follows his own rules and does not limit self with traditions or social norms. This energy endows people with an absence of boundaries and frames, they are free to say and do what they please. A person with the twenty-second energy feels one's freedom and can help other people gain freedom. This is a deep energy which can help people explore and understand deeper aspects of life and oneself. Work with a rigid schedule and clear boundaries does not suit people with the twenty-second energy: this will lead the energy into minus. It will be comfortable for people with this energy to work as freelancers and manifest self freely in creativity.",
        tabs: [
            {
                id: "wideningFlow",
                label: "Widening the financial flow",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThis describes the energies that are responsible for your money channel (in the matrix this energy is located to the right of the dollar sign – x2) and for entering the money channel (point c1). These energies are responsible for bringing money, opportunities, and other resources into our lives.",
                items: [
                    { label: "Own cause" },
                    { label: "Freedom and lightness" },
                    { label: "Absence of fixation on the material" },
                    { label: "Traveling" },
                    { label: "Absence of dependencies and limitations" },
                    { label: "Leadership" },
                    { label: "Ideologicalness" },
                    { label: "Inspiring people" },
                    { label: "Creativity" },
                    { label: "Creating the new" },
                    { label: "Creativity" }
                ],
                description: "Money will come through freedom and expansion of boundaries. For you it is important absence of limitations and full freedom in actions. You can engage in creativity, creative projects, scale business or expand consciousness of a person. You are a natural-born startuper and ideologue. One can engage in various projects. Good, if work will be associated with children, but this is not mandatory. Constantly be in search of the new, try, develop, travel. One can create own project or engage in freelance. Work in hire (employment) and by schedule — is not for you. Activity can be associated with trips, opening boundaries, studying new. You have well-developed creative thinking, you are full of creative and non-standard ideas. One can try oneself in the role of creative designer, illustrator, art-director, artist, etc. Also you can work with people, expand their consciousness and help them go beyond frames. Professions of psychologist, coach, mentor, consultant suit you."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThis describes recommendations for enhancing cash flow.",
                items: [
                    { label: "Work for oneself" },
                    { label: "Freedom and lightness" },
                    { label: "Absence of fixation on money" },
                    { label: "Traveling" },
                    { label: "Freedom" },
                    { label: "Inspiring people" }
                ],
                description: "Embody your ideas into life and broadly move forward. As soon as you become a truly free person, big money will come to you. Engage in your projects, manifest creative vision and creative approach. Travel a lot and communicate with various people. Don't get fixated on the material. Don't fear to go into the new and start from zero. Travel. Engage in creativity. One can develop acting abilities, perform in public. Spend time with children, charge from them with lightness and freedom. Don't load self with heavy tasks. Reduce communication with toxic people. Don't pile up grudges in self, communicate honestly and openly. Lead a healthy way of life, get rid of dependencies. Choose freelance, seasonal or project work in online-format, to work from any point of world. Implement your creative ideas. Don't limit freedom of other people, accept their opinion, views and worldview. Trust the Universe, accept everything with lightness and optimism. Engage in sport, lead an active way of life."
            },
            {
                id: "professionalDirection",
                label: "Professional direction",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThis describes the strengths of energy in terms of implementation, as well as recommended courses of action.",
                items: [],
                description: "Money will come through freedom and expansion of boundaries. You can engage in creativity, creative projects, scale business or expand consciousness of a person. You are a natural-born startuper and ideologue. One can engage in various projects. Good, if work will be associated with children. One can create own project or engage in freelance. Work in hire and by schedule definitely is not for you. Activity can be associated with travels, opening boundaries, studying new. You have well-developed creative thinking, you are full of creative and non-standard ideas. One can try oneself in the role of creative designer, illustrator, art-director, artist and so on. Also you can work with people, expand their consciousness and help go beyond frames. Professions of psychologist, coach, mentor, consultant will suit you. To decide on activity, ask yourself questions: What creative and new can I create? What can I expand? How can I help people?"
            },
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" },
                    { label: "Freedom" },
                    { label: "Innovation" },
                    { label: "Openness" },
                    { label: "Adaptability" },
                    { label: "Optimism" },
                    { label: "Kindness" },
                    { label: "Communicability" },
                    { label: "Adventurism" },
                    { label: "Independence" },
                    { label: "Going beyond frames" },
                    { label: "Activity" },
                    { label: "Movement" },
                    { label: "Creativity" }
                ],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations, you are open to everything new, not afraid of experiments and bright sensations. You do not accept any prohibitions, do not like work by schedule and routine. You are a free person in all manifestations. Possess limitless perception of self and life. In you there is your own depth, you can transform the consciousness of other people. Creative thinking and original ideas help you approach any task non-standardly. You bring innovation and creativity into your cause or project. Active in life, constantly in movement, travel a lot, get acquainted with interesting people. Easily adapt to new conditions. If necessary, you are ready to lead an ascetic way of life and give up material benefits for sake of your idea."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Irresponsibility" },
                    { label: "Heaviness" },
                    { label: "Lateness" },
                    { label: "Unreliability" },
                    { label: "Fixation on the material" },
                    { label: "Jealousy" },
                    { label: "Overpoweringness" },
                    { label: "Inadequacy" },
                    { label: "Dependencies" },
                    { label: "Suppression" },
                    { label: "Debts" },
                    { label: "Dissoluteness" },
                    { label: "Apathy" },
                    { label: "Non-freedom" }
                ],
                description: "You have too non-serious and irresponsible attitude to life. You do not fulfill your promises, miss deadlines, often are late for important meetings. Can behave inadequately, suppress other people or be excessively jealous. Absence of frames in a bad sense of this word leads you to a dissolute way of life, dependencies, as well as to problems with law and debts. Can get fixated on material values and money, completely forgetting about ideas and inspiration. The second variant of manifestation of minuses is tension and too serious attitude to everything. You lack lightness, you constantly worry and are in a stressful state. Don't know how to relax, don't trust life, are afraid and doubt. A sense of internal non-freedom can lead you to apathy and heavy psychological states. You don't know what you want to engage in, where you go and what inspires you."
            }
        ]
    }
}

// Prosperity energy
export const prosperityEnergyData: Record<number, FinanceSectionData> ={

}



export const financeExpansionSector = (energy: number): SectorCardContent | undefined =>
    financeExpansionData[energy] ? { identitySections: [financeExpansionData[energy]] } : undefined;

export const financeChannelSector = (energy: number): SectorCardContent | undefined =>
    financeChannelData[energy] ? { identitySections: [financeChannelData[energy]] } : undefined;
export const financeProsperitySector = (_energy: number): SectorCardContent | undefined => undefined;
export const financeBlocksSector = (_energy: number): SectorCardContent | undefined => undefined;
export const financeBalanceSector = (_energy: number): SectorCardContent | undefined => undefined;
