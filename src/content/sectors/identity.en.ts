import { SectorCardContent } from "../sectorInterpretations.en";

type IdentityTab = {
    id: string;
    label: string;
    intro?: string;
    items?: { label: string }[];
    description?: string;
};

type IdentitySectionData = {
    title: string;
    intro?: string;
    comfortZoneText?: string;
    archetype?: string;
    tabs: IdentityTab[];
};

type SectorCardDetail = {
    title: string;
    intro?: string;
    comfortZoneText?: string;
    archetype?: string;
    tabs: {
        id: string;
        label: string;
        intro?: string;
        items?: { label: string }[];
        description?: string;
    }[];
};

// WHO AM I SECTIONS
export const whoAmIData: Record<number, IdentitySectionData> = {

    1: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the first arcana is the Magician.\nThis energy makes a person focused, capable of immersing themselves in work and creative processes.",
        // DUPLICATE_START
        // DUPLICATE_START
        // DUPLICATE_START
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Decisiveness" }, { label: "Persistence" }, { label: "Independence" }, { label: "Attractiveness" }, { label: "Leadership" }, { label: "Energy" }, { label: "Communication" }, { label: "Charisma" }, { label: "Oratory" }, { label: "Intellectuality" }, { label: "Individuality" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Adventurism" }, { label: "Ingenuity" }, { label: "Optimism" }],
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You are able to completely abstract yourself and immerse yourself in activity. You love to study everything: yourself, people, nature, life.\nYou have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are slow to move and open to any experiment person. Love for something new and pulling toward learning pump your intelligence. Sharp mind and good ingenuity help to non-standardly solve any task. You are an optimist for life and ready to go for risk if necessary.\nOften possess extrasensory abilities: you thinly feel people and understand them on an intuitive level. These abilities can be useful when implementing your ideas and projects.\nIf necessary, you can create and manage a team, speak in public to promote your plans and projects.\nLove to stand out among others, which helps you in work. Have a clear connection with the soul and inner Self, know how to make decisions in the moment. Independence in your thoughts and actions is important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Overstated/understated self-esteem" }, { label: "Inflated ego" }, { label: "Closedness" }, { label: "Suppression of others" }, { label: "Powerfulness" }, { label: "Conflictness" }, { label: "Aggression" }, { label: "Uncertainty" }, { label: "Pride" }, { label: "Indecisiveness" }, { label: "Intolerance" }, { label: "Self-interest" }, { label: "Manipulations" }, { label: "Secretiveness" }, { label: "Impatience" }, { label: "Loneliness" }, { label: "Vindictiveness" }, { label: "Envy" }],
                description: "Another variant of energy manifestation in minus is understated self-esteem. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. All this prevents your realization. You want to try everything at once, grab different activities and in the end do not bring anything to the finish, drop the case halfway. Accustom yourself to finish what you started. Evaluate your strength before taking on anything, and learn to set priorities correctly.\nAlso you can suppress others for your own, sometimes selfish goals. You begin to manipulate and manage, as you know how to feel people well and use this skill. You are vindictive and keep a grudge in yourself for a long time. Painfully perceive any criticism of your ideas, even if it is constructive.\nYou have a fear of theft of ideas, so you close even from loved ones and do not share your plans, dreams, thoughts. As a result, you lead a secret lifestyle. You do not want to hear your inner voice, grab everything from the fear of missing an opportunity, and at the same time cannot enjoy a truly interesting business, lose the taste for life, becoming angry and envious."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Creativity, creating objects with your own hands: jewelry, clothing, paintings" }, { label: "Spontaneous trips, events, meetings" }, { label: "Communication, parties, seminars" }, { label: "Walking" }, { label: "Travel" }, { label: "Yoga, meditations, breathing practices" }, { label: "Sports, pool, active rest" }, { label: "Freedom in any manifestation" }, { label: "Holidays in national style, traditional parties, national dances in costumes" }, { label: "Being alone with yourself" }, { label: "Reading good practical books, developing and with deep meaning" }],
                description: "Here are described actions that can fill your resource zone:"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nRealize your ideas.\nIf a new thought came to you, then immediately write it down and try to start the implementation in the near future.\nBelieve in yourself and your talents. Do not doubt your abilities.\nBe decisive, initiative and active. Focus on your self-realization. Do not push ideas to the background.\nCreate new, even if it is scary and there are doubts. This is an experience that will be useful to you in life, even if it does not lead to the desired success.\nShare your experience and knowledge with other people. Pass information. Tell your ideas.\nLearn to work in a team, unite and help each other.\nLearn to forgive and do not keep evil.\nDevelop your creative abilities and creativity.\nStudy secret knowledge: work with the subconscious, esotericism, hypnosis, visualization of desires, meditations, practices, spiritual teachings. Develop intuition and feeling."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e\nFor you it is important to believe in yourself and your forces. Go your own way, not comparing yourself with other people. Express yourself in everything, even in small things. Choose the best for yourself. Do not be shy to stand out, strive to be the first in everything, but without fanaticism. Choose only what you like, and do not adapt to other people. You have a bright personality and a special, your own, vision.\nDevelop positive thinking, work on your thoughts, track events that happen in your life, make conclusions and trust the Universe.\nEngage in creativity, develop creative vision and observation. Be sure to embody your ideas in life. Immediately, as a thought appeared, fix it in a notebook and try to take the first steps for embodiment.\nLearn, get new knowledge, check everything in practice. Search for new approaches, experiment, do what no one has tried before. Take various courses, trainings and seminars and do not forget to apply the knowledge gained in real life, as well as pass it on to other people.\nDevelop feeling, more often listen to your intuition. Through these abilities you can promote your ideas, agree with people, find an approach, inspire and lead.\nEngage in sports, and also devote time to your body: spa, massage, beauty salon, baths and so on."
            },
        ]
    },
    2: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Kindness" }, { label: "Compassion" }, { label: "Intuition" }, { label: "Modesty" }, { label: "Romanticism" }, { label: "Mystery" }, { label: "Sensitivity" }, { label: "Empathy" }, { label: "Wisdom" }, { label: "Softness" }, { label: "Openness" }, { label: "Communicativeness" }],
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around.\nYou have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation. You will always find the right words, support a person and help.\nYou accept the world and people as they are, without judgment and patterns. Sometimes you can romanticize events, believe in fate and signs of the Universe. At times you are mysterious - this is part of your energetic. But do not forget about the balance between the spiritual and material. Find your middle ground and do not go to extremes.\nYou are always calm and know your value. You are selective in everything and love to take care of yourself. Surround yourself with beautiful objects, wear stylish clothes and original handmade jewelry.\nYou know how to relieve physical pain, can be a healer. You can transfer energy to people through creativity: painting, music, creating clothing or jewelry, etc."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Distrust" }, { label: "Uncertainty" }, { label: "Doubts" }, { label: "Inconstancy" }, { label: "Caprices" }, { label: "Conflictness" }, { label: "Malice" }, { label: "Confusion" }, { label: "Secretiveness" }, { label: "Tearfulness" }, { label: "Hypocrisy" }, { label: "Jealousy" }, { label: "Gossip" }, { label: "Manipulations" }, { label: "Coldness" }, { label: "Untidiness" }, { label: "Dependency" }],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn.\nYou doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view. You cannot focus on one thing and confidently move toward the goal. You are thrown from side to side, you doubt the correctness of your actions and depend on the opinions of other people. In the end you can close from everyone, refuse your own realization and harbor a grudge against those around instead of gaining courage to implement the idea.\nYou may have two sides: either you are too jealous, hot-tempered and demanding toward people, or, on the contrary, behave coldly, indifferently. You become indifferent to those around and their problems.\nYou can excessively fixate on your appearance, forgetting about inner qualities. Or the opposite situation: untidiness, negligence in affairs, mess in the house."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Listen to your inner voice and intuition" }, { label: "Communication with people" }, { label: "Spend time with family" }, { label: "Accept yourself and those around, show love and care" }, { label: "Walk in nature" }, { label: "Provide disinterested help" }, { label: "Arrange dates for yourself, take care of your body: spa, sauna, massage, bath with oils" }, { label: "Work on your consciousness and studying the \"inner Self\"" }, { label: "Try all kinds of body and spiritual practices, meditations, yoga" }, { label: "Shopping" }, { label: "Sports, active rest" }, { label: "Creating beauty through creativity" }, { label: "Share information, help with advice" }, { label: "Solitude" }],
                description: "Here are described actions that can fill your resource zone:"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nDevelop your intuition. Listen to your inner voice.\nStudy spiritual practices, meditations, yoga.\nMove, travel, go for walking tours.\nEngage in sports, ground yourself and disperse energy throughout the body. Spend time in nature.\nTake care of yourself and your body. Visit spa, massage, beauty salons.\nTry to be in calm and harmony.\nDo not make hasty conclusions, do not hang labels and patterns on people. Learn to look at things from different angles.\nDo not participate in intrigues and gossip. Be honest.\nOpenly state your feelings and desires. Do not be afraid to express your opinion.\nShare knowledge and help with advice.\nWomen need to develop their sexuality and looseness. Take up dances and body practices. Men need to focus on such qualities as responsibility, courage and decisiveness."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e Develop your sensitivity, trust your inner voice more, and not logic and rational judgments. Find harmony within yourself. Maintain balance of spiritual and material, help other people with this. Engage in spiritual practices: breathing, meditations, yoga.\nYou have powerful healing energy, you know how to relieve physical pain. You can use this energy to help other people.\nAlways try to create a comfortable and cozy environment around yourself.\nUnite people. Get acquainted with different nationalities, religions and cultures. You know how to competently build communication and find common language with very different people. Use diplomacy skill for your self-realization in society.\nExpress your individuality through creativity: music, dances, painting and so on. You are capable of endowing things with your energetics, therefore you can focus on creating various objects."
            },
        ]
    },
    3: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the third arcana is the Empress (female energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, FERTILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Organizational abilities" }, { label: "Self-love" }, { label: "Care for others" }, { label: "Responsibility" }, { label: "Success in business" }, { label: "Generosity" }, { label: "Order in affairs" }, { label: "Love for comfort" }, { label: "Material prosperity" }, { label: "Taste and sense of style" }, { label: "Authority" }, { label: "Natural charm" }, { label: "Attractiveness" }, { label: "Creativity" }, { label: "Kindness" }, { label: "Good relations with women" }, { label: "Respect from men" }, { label: "Housekeeping" }, { label: "Sensitivity" }, { label: "Femininity" }, { label: "Calm and softness" }, { label: "Sexuality" }, { label: "Love for beauty" }, { label: "Respect for men" }, { label: "Love for plants, animals" }, { label: "Carefulness" }],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround only with beautiful objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children and value family. Take more responsibility on yourself, become an authoritative head, provide for relatives materially.\nYou feel comfortable in the society of women. But for harmonious relationships, cultivate a leadership position in yourself. In business, excessive softness may hinder you, so learn to take initiative and independently make decisions.\nYour task is to try to translate your third energy into the male fourth. Female energy. Empress. You love beauty, luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround with beautiful interior objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children, love your partner and value family. Educate children and build harmonious relationships within the family. Be a caring keeper of the home hearth, gather relatives together for general holidays, support traditions.\nYou can be successful in business and simultaneously create your family - importantly, find a balance. Respect men and find a common language with other women.\nYou are a beautiful, soft, sexual and sensual woman. Always know your value and are not ready to agree to less."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" }, { label: "Soft-bodiedness" }, { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Being \"under the heel\" (dominated by women)" }, { label: "Lack of money and career" }, { label: "No relationships" }, { label: "Rejection of women" }, { label: "Problems with women" }, { label: "Loneliness" }, { label: "Stinginess" }, { label: "Closedness" }, { label: "Obsession with appearance" }, { label: "Untidiness" }, { label: "Infantilism" }, { label: "Hyper-control" }, { label: "Hyper-responsibility" }, { label: "Lack of care for oneself" }, { label: "No time for oneself" }, { label: "Despotism" }, { label: "Destruction" }, { label: "Pressure on men" }, { label: "Tyranny" }, { label: "Choice between career and family" }, { label: "Merchantilism" }, { label: "Calculation" }, { label: "Problems with money" }, { label: "Unwillingness to have children" }, { label: "Possession of power" }, { label: "Egoism" }, { label: "Problems with sexuality" }, { label: "Conflicts with women" }, { label: "Caprices" }, { label: "Negligence" }, { label: "Workaholism" }],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nProblems in communication with women may arise: you don't respect them, don't accept care and affection, condemn their behavior. As a result, this leads to loneliness and lack of any relationships. Or vice-versa: become excessively soft, put a woman at the head, listen to her implicitly and allow to manage you, refusing your own opinion.\nIt's hard for you to succeed in male professions and business. Can be soft and indecisive because of this it's hard for you to take responsibility. Often avoid independence and initiative. In a team take a passive position and don't let talents reveal. As a result, you have neither career nor money. You close in yourself, blame those around, become stingy and greedy. Your main task is to try to translate the third energy into the male fourth. You lash out at loved ones due to your hysteria and emotionality. Don't know how to forgive, condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can start to intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nMay pressure men and press them. Don't respect their decisions, behave too emotionally and irresponsibly. Try to manage and manipulate, which leads to quarrels.\nIt's hard for you to make a choice between family and business, always sacrificing something. Often choose professional realization and refuse to have children, which leads to loneliness and closedness. At times too obsessed with your appearance or, vice-versa, become untidy and negligent."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Your task is to translate the third energy into the fourth (see entrance to comfort zone by fourth energy)." }, { label: "Successes in creativity" }, { label: "Feel comfortable in a female collective" }, { label: "Receive any benefits from men" }, { label: "Abundance reigns around you: happy family, talented children, material prosperity" }, { label: "Strong connection with nature, fertility, own garden" }, { label: "Wise leader and caring housekeeper" }, { label: "Leadership and responsibility, success in career" }, { label: "Natural charm and attractiveness" }, { label: "Strong female energetics" }, { label: "Sexuality, attract men" }],
                description: "Head of family and authoritative leader Own family and raising children, or development of own projects."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Meditations" }, { label: "Creative activities: drawing, music, photography" }, { label: "Self-care: spa, massage, baths" }, { label: "Creating a stylish image for yourself: hairstyle, clothing" }, { label: "Healthy sleep in comfort and coziness" }, { label: "Visit a beautiful place: restaurant, theater, exhibition" }, { label: "Solitude" }, { label: "Cooking through pleasure and love" }, { label: "Sport: swimming, gym, fitness, dancing, stretching" }, { label: "Communication with different people" }, { label: "Work on yourself: consultations with a psychologist, coach, study of spiritual practices" }, { label: "Travels, long roads" }, { label: "Visiting places of power" }, { label: "Passionate sex with a loved person" }, { label: "Walking in nature, in the forest, or in beautiful places in the city" }, { label: "Watching beautiful movies" }, { label: "Rearranging furniture, cleaning" }, { label: "Giving compliments to others, receiving them in return" }, { label: "New, interesting acquaintances" }, { label: "Meetings with family and loved ones" }],
                description: ""
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Develop male qualities, take responsibility for the team.\nProvide for family, become head and support.\nBe generous.\nDon't conflict with women. Learn respect and trust.\nBecome an authoritative leader.\nDevelop decisiveness and initiative in yourself.\nEngage in sports.\nMake independent decisions.\nDevelop your relationships with women.\nRaise level of comfort for yourself and for loved ones. Manage people through wisdom and softness.\nDevelop femininity, accept men and material benefits from them.\nSupport your partner.\nDevote time to yourself, take care of your body: massage, spa, sport.\nEngage in creativity.\nDon't use commanding tone in speech.\nFix relations with mom, let go of all childhood grudges.\nCreate your family, raise children.\nDevelop generosity in yourself, help others to grow.\nDelegate work and domestic affairs. Don't take everything on yourself.\nSpend time in nature. One can start one's own garden or a domestic pet.\nLearn to combine career, raising children and household."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Strive to embody your mission - be a prosperous and generous person, successful in career and wise in family. Care for loved ones, but without intrusiveness and authoritarianism.\nCreate coziness, harmony and beauty around you. Take care of the house, but herewith don't get stuck in routine domestic affairs. Delegate your obligations to helpers or other family members.\nLet go of excessive guardianship and concern for relatives. Give them opportunity to develop and independently make decisions in life. Herewith you can become a support: support and give needed advice.\nTreat people as equals regardless of their status and financial position. Learn not to cling to material and don't chase after success. In due time success itself will come to you thanks to your talents and persistence."
            },
        ]
    },
    4: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Carefulness" }, { label: "Housekeeping" }, { label: "Leadership" }, { label: "Calm" }, { label: "Confidence" }, { label: "Responsibility" }, { label: "Work capacity" }, { label: "Organizational skills" }, { label: "Logicality" }, { label: "Reliability" }, { label: "Purposefulness" }, { label: "Authority" }, { label: "Charisma" }, { label: "Good relations with men" }, { label: "Respect for men" }, { label: "Good relations with mom" }, { label: "Order in money and affairs" }, { label: "Motherhood" }, { label: "Prosperity" }, { label: "Femininity" }, { label: "Sense of style and taste" }],
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance in your career, occupying high positions in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You have good diplomatic skills: you skillfully conduct negotiations and successfully reach agreements with people.\nYou are a strong leader and a charismatic person. Your priority is to give the family a decent level of life and provide for them materially. For loved ones, you are an authority; your advice is listened to and trusted. It is characteristic for you to always keep your word and fulfill your promises. Male strong-willed energy. You possess a global vision of things and strategic thinking. This allows you to successfully implement large projects and quickly advance on the career ladder, occupying high posts in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You skillfully conduct negotiations and successfully reach agreements with people.\nYou have a strong strong-willed character. You like to be in the society of men and easily find a common language with them. But, for harmonious relationships, do not forget about your tenderness and softness. Try to devote more time to yourself and caring for your body. Spend time with other women, engage in family life and care for relatives. Engage in creativity, dancing, reveal your female component.\nYour task is to try to translate the fourth energy into the plus third."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - TYRANNY, WEAKNESS, CHAOS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Authoritativeness" }, { label: "Tyranny" }, { label: "Obsession with the material" }, { label: "Hyper-control" }, { label: "Aggression" }, { label: "Inaction" }, { label: "Whining" }, { label: "Irresponsibility" }, { label: "Weakness" }, { label: "Uncertainty" }, { label: "Stubbornness" }, { label: "Jealousy" }, { label: "Fussiness" }, { label: "Cruelty" }, { label: "Belligerence" }, { label: "Disrespect for men" }, { label: "Intolerance" }, { label: "Criticality" }, { label: "Conflict nature" }, { label: "Categoricalness" }, { label: "Loneliness" }, { label: "Greed" }, { label: "No career" }, { label: "No money" }],
                description: "The first option is tyranny and despotism. You interfere in all working processes and family affairs. You abuse power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you show aggressiveness and cruelty toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. Constant doubts in your own decisions prevent you from taking decisive steps, and you are prone to complaints about the injustice of life, which leads to passivity and laziness. Your behavior becomes irresponsible, and you do not show readiness to care for the financial well-being of the family.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. It is characteristic for you to behave like an authoritative tough emperor. You control everything excessively. Often you set excessive requirements, set unfulfillable goals and deadlines for your subordinates. You don't know how to forgive people and go for compromises. In relationships you show despotism, you are not interested in family affairs, you suppress your partner and order around your loved ones. The first is tyranny and despotism. You interfere in all working processes and family affairs. You abuse your power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you are sometimes aggressive and cruel toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. You constantly doubt your decisions and experience difficulties with making a choice. You start to whine and complain about the injustice of life, become passive and lazy. You behave irresponsibly.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. Excessive independence and aggression will not allow building full-fledged harmonious relationships with a partner. At home you behave like an authoritarian leader, interfering in the private affairs of each family member.\nExcessive harshness and increased demandingness at work create tension in the collective, which, in turn, leads to frequent dismissals and financial losses.\nYour main task is to try to translate the fourth energy into the female third."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in business" }, { label: "High material prosperity, you provide for relatives" }, { label: "Easily master any profession" }, { label: "Successful in negotiations" }, { label: "Subordinates and colleagues respect you" }, { label: "Always get what you want" }, { label: "Ready to carry responsibility for the team" }, { label: "Care for your family" }, { label: "Flawless reputation" }, { label: "Sense of taste, special attitude toward oneself" }, { label: "Your task is to translate the fourth energy into the female third (see entrance to comfort zone by the third energy)." }],
                description: "Professional in your field and authoritative leader. You need to create your family and engage in raising children or develop your own projects."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Walks in nature, travels, any activity" }, { label: "Self-care: care procedures, massage, baths" }, { label: "Sport: swimming, gym, fitness, running, dancing" }, { label: "Communication with loved ones and friends" }, { label: "Work on yourself: consultations with a psychologist or coach, study of esoterics" }, { label: "Sex with a loved person" }, { label: "Walks in nature, in the forest" }, { label: "Watching movies and TV shows, going to the cinema, reading books" }, { label: "New interesting acquaintances" }, { label: "Time with family" }, { label: "Enjoying silence" }, { label: "Solitude" }, { label: "Healthy sleep" }, { label: "Communication with children" }],
                description: ""
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome defender and reliable support for family. Provide for relatives materially.\nEngage in sports. Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome keeper of the hearth and caring mom.\nBe a support for your man.\nEngage in sports.\nDevelop creative skills.\nDevote time to yourself, take care of your body.\nSpend more time in nature and with other women."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For you it's important to stay in balance between spiritual and material. Treat people as equals, and not evaluating them by achievements or place in society.\nHelp not only your family and loved ones, but also subordinates at work. Give them opportunity for career growth.\nStop excessively controlling every sphere of life. Don't impose your point of view and trust your inner voice.\nDevelop physically: engage in sports, lead a healthy lifestyle, eat correctly.\nThink strategically, build your own empire and manage people through wisdom, and not authoritarianism. You quickly achieve good position in society, you are an example for many. Use your strength and power for good, for help to people.\nProvide family and loved ones with all necessary things: food, clothing, housing, education and so on. You are head of family and authoritative leader."
            },
        ]
    },
    5: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for learning" }, { label: "Oratory skills" }, { label: "Management skills" }, { label: "Conservatism" }, { label: "Desire to teach" }, { label: "Help to loved ones" }, { label: "Family orientation" }, { label: "Love for traditions" }, { label: "Professionalism" }, { label: "Correctness" }, { label: "Systematic nature" }, { label: "Pedantry" }, { label: "Accuracy" }, { label: "Logicality" }, { label: "Order in affairs" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Kindness" }],
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony. You can be a leader and a good manager, but you don't strive for it.\nYou are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others. For this you have expertise, excellent oratory skills and a strong voice. The main thing is to remain open to the world and pass your knowledge to people.\nYou love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Spontaneity, disorder and chaos can knock you out of balance.\nAnother way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions. Absence of family and trustful relationships negatively affect your energy."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Intolerance" }, { label: "Conflict nature" }, { label: "Emotionality" }, { label: "Egoism" }, { label: "Hyper-control" }, { label: "Judgment" }, { label: "Pride" }, { label: "Desire to suppress and teach" }, { label: "Limitation" }, { label: "Categoricalness" }, { label: "Harshness" }, { label: "Arrogance" }, { label: "Unwillingness to pass knowledge" }, { label: "Uncertainty" }, { label: "Fear of competition" }, { label: "Desire to argue" }, { label: "Rebellion" }, { label: "Fanaticism" }, { label: "Excessive correctness" }, { label: "Problems with family" }],
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. Sometimes emotions can overflow you and become the reason for hot-tempered reactions that can damage relationships with loved ones. You may start to control everyone around, stop trusting people, acknowledge only your truth. You harshly push your position, suppressing others. You can behave arrogantly.\nYou are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice. You can learn endlessly, get diplomas and awards, but for you it's much more important - to pass knowledge, and not to possess them in theory. There may be problems with family and creating relationships. Frequent conflicts and full discord in private life lead to loneliness and apathy. Especially important are your relationships with father."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Happy family, where you are a spiritual leader" }, { label: "Your advice is listened to by others" }, { label: "Success in a male collective" }, { label: "Lead a healthy lifestyle" }, { label: "Pass knowledge further, teach others" }, { label: "Success in exact sciences" }, { label: "Patronage from a man is possible (husband or male boss)" }, { label: "You have your own direction or school, many students and followers" }, { label: "Revelation of extrasensory abilities" }, { label: "Order in affairs and finances" }],
                description: "Harmonious relationships with father and in the family."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Reading books and studying the new" }, { label: "Self-knowledge" }, { label: "Systematizing processes and affairs" }, { label: "Bringing order at home, in affairs, at the workplace and within oneself" }, { label: "Passing knowledge, teaching others" }, { label: "Oratory or singing, work with voice" }, { label: "Time with family" }, { label: "Communication with different interesting people" }, { label: "New acquaintances" }, { label: "Generation of new ideas and creation of own projects" }, { label: "Inspiring those around" }, { label: "Planning and organization" }, { label: "Manifestation of care, especially about family and children" }, { label: "Listening to or watching educational videos, webinars, interviews" }, { label: "Morning exercise" }, { label: "Meditations, spiritual practices, yoga" }, { label: "Sport" }, { label: "Listening to music" }, { label: "Walks in the forest" }, { label: "Solitude" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAcknowledge different knowledge and systems. Don't get fixated on one thing.\nStudy new information, expand your horizon.\nLearn.\nThink positively.\nPass accumulated knowledge to others.\nDevelop oratory skills. One can engage in vocals or oratory art.\nCreate and maintain family traditions.\nSpend time with family.\nDon't go for next learning until started using previous knowledge.\nListen to your intuition.\nReduce control regarding loved ones, relate to others with patience and respect. Each has his own path.\nInspire and motivate people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn the new and pass your knowledge further. You know how to re-process information through your prism and make the complex simple and clear. Openly share your experience, helping other people improve life. Use your life experience, share your wisdom.\nLearn to see the world in all its multi-faceted nature, accept everything new, be open. Don't get fixated on one teaching. Refuse from the old and outlived. Study different concepts, communicate with people, accept any experience.\nFor you it's important to maintain warm relations in family. Gather together for holidays, and also arrange joint trips and travels. Family is what charges and feeds you with energy.\nTry to control other people less. Be confident in yourself and you will be able to achieve much, occupying a leadership position in life."
            },
        ]
    },
    6: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the sixth energy is the Lovers.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Loving nature" }, { label: "Communicability" }, { label: "Artistry" }, { label: "Charm" }, { label: "Attractiveness" }, { label: "Sensuality" }, { label: "Communication skills" }, { label: "Sense of taste and style" }, { label: "Amorousness" }, { label: "Ability to organize" }, { label: "Loyalty" }, { label: "Adaptability" }, { label: "Carefulness" }, { label: "Selflessness" }, { label: "Festivity" }, { label: "Emotionality" }, { label: "Cling to comfort" }, { label: "Liberalism of views" }, { label: "Attention to details" }],
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love.\nLove to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language. Therefore, as a rule, you have an extensive circle of friends and acquaintances.\nYou like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier.\nEngage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Living in illusions" }, { label: "Fixation on relationships" }, { label: "Frequent change of partners" }, { label: "Inability to make a choice" }, { label: "Doubts" }, { label: "Vulnerability" }, { label: "Depressive nature" }, { label: "Uncommunicativeness" }, { label: "Infantilism" }, { label: "Idealism" }, { label: "Revengefulness" }, { label: "Touchidness" }, { label: "Fixation on appearance" }, { label: "Egoism" }, { label: "Uncertainty" }, { label: "Problems with finances" }, { label: "Apathy" }, { label: "Loneliness" }, { label: "Dependence on people's opinion" }, { label: "Impulsivity" }, { label: "Distrust" }, { label: "Self-dislike" }, { label: "Desire to seem better" }],
                description: "Main minuses by your energy go due to high sensitivity. You idealize and too quickly fall in love, and then for a long time stay in your delusions, which can lead to disappointment in a person. Often fixate on one relationship, and then with difficulty survive the departure. This concerns not only love, but friendly and work relationships. As a result, you may start to chaotically change partners, friends or projects, fearing to be disappointed and remain lonely.\nIn your character exists a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy, don't understand what you want, where to move and where to develop. Start to listen to opinion of other people instead of taking initiative into your hands and making an independent step.\nIf you go too much into idleness and lightness, then problems with finances start and debts appear."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in family life;" }, { label: "Loyalty and love in relationships with spouse;" }, { label: "Trustful and harmonious relationships with relatives of spouse;" }, { label: "Success in any partnership;" }, { label: "Reliable and loyal friends surround you;" }, { label: "Balance of external and internal beauty;" }, { label: "Flawless taste, beautiful atmosphere around, cozy home setting." }],
                description: "Own family, harmonious relationships with spouse and relatives."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Creating beautiful space around oneself" }, { label: "Creating aesthetic decor for home" }, { label: "Decorating premises for a holiday or event" }, { label: "Participation in thematic parties, where you need to dress up, masquerades" }, { label: "Communication with different people" }, { label: "Acquaintances with new people" }, { label: "Love intrigues, flirt, playfulness" }, { label: "Self-care and care of your body, manifestation of love for self: bath, spa, massage, beauty salons, shopping, etc." }, { label: "Buying gifts for oneself" }, { label: "Giving gifts to loved ones, caring for them" }, { label: "Buying beautiful things" }, { label: "Meetings with loved people" }, { label: "Time with family" }, { label: "Manifestation of love, feeling yourself loved" }, { label: "Visiting or arranging various events and holidays" }, { label: "Rest in a beautiful comfortable place" }, { label: "Rest in solitude" }, { label: "Harmonious relationships with opposite sex" }, { label: "Hugs, affection, tenderness in relationships" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't strive for ideal — this will lead you to disappointment. Do everything through love for self and world.\nFocus on positive qualities in people. Don't judge others and don't lead self aggressively.\nDevelop own taste and style, follow fashion and tendencies.\nManifest love for self and care for your body: shopping, spa, massage, sport.\nGive self and others gifts.\nVisit bright events and arrange thematic parties.\nGather together with friends, celebrate holidays. Spend time in circle of family.\nLearn to make independent choice, stop depending on opinion of those around.\nLearn to forgive people and accept them such as they are.\nDon't betray your partner. In relationships be sincere and open.\nHelp selflessly and from heart, not expecting nothing in return.\nDon't hold on to past. Let go of people and non-interesting projects. Don't be afraid to commit mistakes."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Surround yourself with beauty and help other people in this. Give feeling of lightness and celebration. Accept people such as they are - without judgment, gossip or idealization.\nLearn not only to accept love, but also give it to others. Less cling to appearance of person, try more to learn about internal qualities. Don't judge only by first impression.\nTry to think positively in any situations and be honest first of all with self. Orient only on your inner feelings and sensations, and not on opinions of those around. Be confident in self and your strength, move to your goals. Engage only in what you like.\nDon't strive for ideal and don't idealize others. Try realistically to look at world, and not through pink glasses. Learn on mistakes, make conclusions and move further."
            },
        ]
    },
    7: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Goal-orientedness" }, { label: "Leadership" }, { label: "Responsibility" }, { label: "Skill to lead" }, { label: "Recognition" }, { label: "Teamwork" }, { label: "Decisiveness" }, { label: "Activity" }, { label: "Ambition" }, { label: "Flexibility" }, { label: "Organizedness" }, { label: "Control of emotions" }, { label: "Respect for people" }, { label: "Optimism" }, { label: "Work capacity" }],
                description: "Male volitional energy. You are a leader and lead people. You are not bothered by appearance, much more important are internal qualities: goal-orientedness, ambition and decisiveness. You set clear goals before yourself and quickly reach them. For the sake of set task you are ready to search for ways to negotiate, know how to be flexible and diplomatic.\nYou throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you. These can be difficulties in life, diseases, financial complexities. Therefore it's very important to independently set yourself inspiring goals and immediately proceed to their realization.\nYou love activity, it charges you and gives additional resource. It's simply necessary for you to be in movement, starting from sport and travels to educational courses and spiritual practices.\nYour energy — entrepreneurial. You are independent and ready to take responsibility for self and team, know how to direct people, form strategy and build plans. You are easy on the rise, charge with optimism and energy everyone around. Main thing - don't doubt yourself, continue movement and then any your dream will come true."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Destructiveness" }, { label: "Desire to reach goal at any cost" }, { label: "Struggle" }, { label: "Aggression" }, { label: "Categoricalness" }, { label: "Overstrain" }, { label: "Workaholism" }, { label: "Dissatisfaction with achievements" }, { label: "Loss of goals and sense" }, { label: "Irresponsibility" }, { label: "Fear of leadership" }, { label: "Stagnation" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Emotionality" }, { label: "Non-realization" }, { label: "Uncertainty" }, { label: "Fussiness" }],
                description: "Main minuses by your energy — warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force and wish to reach it at any cost. Suffer from own workaholism and force others to work excessively. When reach set goal, still remain dissatisfied with result. Don't value what already have, always want more.\nAbsence of movement and challenge in life lead to stagnation. If you have no concrete goal, then start to lead meaningless struggle in one place, fuss much, commit unnecessary actions, which in the end only takes energy and doesn't lead to desired result. In the end lose interest, drop matter halfway and don't finish what was started.\nIf feel yourself non-realized and don't understand where to move, then this is a clear sign of energy in minus. Insufficient realization of your needs and goals can lead to frequent and serious problems with health.\nStrong emotionality repels people from you and prevents creation of harmonious relationships.\nIn character sacrifice may be present. You fear taking responsibility and role of leader. There may be problems with decisiveness, for a long time stay in apathy and in one place."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Quick success in career;" }, { label: "Realize your challenges, set new ones;" }, { label: "Successful moves and many travels;" }, { label: "Professional driving of transport vehicle;" }, { label: "Healthy musculoskeletal apparatus;" }, { label: "Respect and recognition from side of colleagues and subordinates;" }, { label: "Leadership;" }, { label: "Calmness;" }, { label: "Ambition;" }, { label: "Activity;" }, { label: "Large amount of energy." }],
                description: "Realization of any challenge: moving to another city or country, getting education, creating a family, own business etc."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Striving for changes" }, { label: "Freedom of actions, life outside frames" }, { label: "Faith in self and your luck" }, { label: "Time with family, games with children" }, { label: "Purchases from state of abundance and love" }, { label: "Inspiring other people" }, { label: "Self-knowledge, spiritual practices, reading books" }, { label: "Leading social networks: share, inspire, motivate" }, { label: "Walks around the city" }, { label: "New interesting knowledge" }, { label: "Cleaning the space" }, { label: "Active sport: cardio-trainings, running, bicycle, swimming" }, { label: "Meetings with friends" }, { label: "Travels, long distance trips" }, { label: "Singing and dancing" }, { label: "Early rises" }, { label: "Dynamic meditations" }, { label: "Practice of active yoga" }, { label: "Thinking through clear plans and strategy" }, { label: "Compiling schedule of affairs for the day" }, { label: "Overcoming difficulties" }, { label: "Change of activity" }, { label: "Deep immersion in work, concentration on current task" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nUse your potential for peaceful goals, direct energy to creation.\nRefuse from meaningless struggle and goals that don't motivate you.\nMake emphasis on your leadership qualities. Become an example to follow.\nManage your emotions and restrain warrior-likeness and aggressiveness.\nCarefully plan, write down stages of reaching goal, think through strategy.\nShare your achievements with people, inspire others.\nListen to self and trust intuition.\nDelegate obligations.\nEngage in spiritual practices: meditations, yoga, breathing.\nEngage in active sport.\nLead team behind you, take responsibility.\nLead active and healthy way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Use your potential for good. Try so that your activity works not only for your realization, but also brings benefit to other people. Don't divide world only into white and black. Hold under control your inner proclivity to warrior-likeness, learn to control your emotions and effectively cope with bouts of aggression. Remember that it's important to devote attention to inner and spiritual development on par with physical. Learn to listen to self and trust inner sensations. Learn to delegate: after all laziness, doubts, passivity, which can suddenly arise in you, are easier to overcome jointly with team. Learn to openly speak about your desires, feelings and try to convey your thoughts to those around."
            },
        ]
    },
    8: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The eighth energy, by its nature, doesn't yield to rigid definition of archetype. To the greatest degree it's corresponded by \"Balinese esotericist\".",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Reliability" }, { label: "Responsibility" }, { label: "Openness" }, { label: "Kindness" }, { label: "Honesty" }, { label: "Loyalty" }, { label: "Courage" }, { label: "Confidence" }, { label: "Logicalness" }, { label: "Insightfulness" }, { label: "Adaptability" }, { label: "Pedantry" }, { label: "Intuition" }, { label: "Diplomacy" }, { label: "Correctness" }],
                description: "Energy of justice and calmness. You are a peaceful and kind person, it's hard to get you out of yourself, however, if this happens, you become irritable and aggressive. For you it's important to find balance in all spheres of life. If balance is not there, then you will snap at those around. Also you can help others find their balance, for example, with help of meditations, spiritual practices and even usual heart-to-heart conversations.\nFor you it's important that everything is honest and by law. You always are in search of truth, but learn to do this through acceptance, kindness and open dialogue. Without aggression and excessive emotionality. You protect rights of other people and are ready to stand on side of the weak.\nPerceive whole world through prism of depth and logic. You dive into work processes or family situations with head, reach the essence, sorting out each detail.\nVery consistent, reliable, always keep your word and ready to take responsibility. You have leadership energy, you know how to communicate with people and form professional team."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Conflictness" }, { label: "Categoricalness" }, { label: "Aggression" }, { label: "Sharpness" }, { label: "Pride" }, { label: "Hot-temperedness" }, { label: "Loss of balance" }, { label: "Irresponsibility or hyper-responsibility" }, { label: "Self-criticalness" }, { label: "Touchiness" }, { label: "Manipulations" }, { label: "Lie" }, { label: "Revengefulness" }, { label: "Cruelty" }, { label: "Infidelity" }],
                description: "Full opposite of energy in plus. You in aggressive manner prove your rightness, which leads to frequent quarrels and conflicts with people. If in your life there are courts, then this is a clear sign of energy in minus. You need to learn to negotiate with those around. Often your pride prevents recognizing own wrongness.\nIf in life there is no balance, then you are thrown from extreme to extreme. You don't recognize existence of other points of view. Suppress people, often argue. Can behave sharply and hot-temperedly. Judge actions of others, refuse to understand them. Try to control loved ones and manipulate them.\nOften same situations in life repeat. Need to learn to notice them and try to lead energy out of minus. Always search for your balance.\nIf engage in own business, then legally and with payment of all taxes. If relationships, then open and honest. Be loyal to your partner."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in resolution of any legal issues, understanding of laws;" }, { label: "Success in legal sphere;" }, { label: "Organizational abilities, skill to coordinate;" }, { label: "Respect from side of colleagues and partners;" }, { label: "Can receive inheritance or win lottery;" }, { label: "Success in negotiations;" }, { label: "Well sort out cause-and-effect links;" }, { label: "Logical thinking;" }, { label: "Respect alternative opinion;" }, { label: "Have authority of a just and honest person;" }, { label: "Leader, inspire people." }],
                description: "Observance of law and fulfillment of taken obligations.\nHonesty and openness in affairs."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Meditations, breathing practices, yoga" }, { label: "Freedom in manifestation of feelings" }, { label: "Meetings with loved people" }, { label: "Time with family" }, { label: "Learning" }, { label: "Application of new knowledge on practice" }, { label: "Creation of system and routine" }, { label: "Planning" }, { label: "Order at home and in affairs" }, { label: "Study of deep knowledge" }, { label: "Absence of debts and fulfillment of promises" }, { label: "Solitude" }, { label: "Staying in silence and peace" }, { label: "Engaging in creativity" }, { label: "Read books, watch films and deep interviews, listen to music" }, { label: "Self-care: bath, sauna, massage, spa, steam bath" }, { label: "Time on nature, walks" }, { label: "Healthy sleep" }, { label: "Communication with friends" }, { label: "Engaging in sport" }, { label: "Communication with children" }, { label: "Conveying your knowledge, sharing experience" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't judge acts of other people.\nPreserve inner balance. One can use for this breathing practices, meditations, yoga.\nStudy deep knowledge and cause-and-effect links.\nObserve laws, be honest and open.\nKeep your word. Don't deceive and don't betray.\nDon't take credits, try not to borrow money.\nSearch for justice, but through wisdom and open dialogue.\nShow your true feelings to other people.\nConvey your knowledge further.\nCreate your family.\nLearn to see truth and hidden motives that drive people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to stick in everything to the golden middle and preserve neutrality. For you it's important not to achieve justice, but search for truth, hidden motives and processes that drive people and events. Develop in yourself and those around positive thinking and in each complex situation try to see life lesson and extract benefit for self. Don't interfere in arguments and proceedings without necessity. Stop judging anyone. Learn more and develop, be open to everything new. Don't try rather to convey just received information, you should live through it on own experience and let it through yourself."
            },
        ]
    },
    9: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "Ninth arcana likes to study self, surrounding world, and dive into depth of its matter: it's necessary for them to maximally sort out in questions interesting them.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Loyalty" }, { label: "Calmness" }, { label: "Seclusion" }, { label: "Learning new" }, { label: "Understanding people" }, { label: "Tactfulness" }, { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Carefulness" }, { label: "Attentiveness" }, { label: "Desire to convey knowledge" }, { label: "Modesty" }],
                description: "Sage. Closed energy. You love to dive into self and your thoughts. For you it's comfortable to lead a secluded way of life. It happens that you look a bit from above down on people. Your main task — don't close from world, but on contrary shine and convey your knowledge further, otherwise risk becoming a hermit.\nFrom birth you are endowed with special wisdom, you have rich life experience. Know how to interpret situations, give useful advice, thereby help others. You better than rest understand processes and see depth in everything. Subtly feel moods of people, know what's necessary to say and what words to pick. Tactful and attentive to those around.\nYou like solitude and silence, this way you quickly fill with energy. You are comfortable working in solitude or spending time on nature with very self.\nYou are a responsible person who thoroughfully approaches any question and carefully studies everything. You always can be relied on. You keep your word and fulfill promises."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Reservedness" }, { label: "Excessive asceticism" }, { label: "Dislike for self and people" }, { label: "Pride" }, { label: "Judgment" }, { label: "Unwillingness to help" }, { label: "Fear of solitude" }, { label: "Devaluing" }, { label: "Distrustfulness" }, { label: "Indiscriminate ties" }, { label: "Problems with money" }, { label: "Neglect" }, { label: "Fixation on material" }, { label: "Fear of relationships" }, { label: "Uncertainty" }, { label: "Non-realization" }, { label: "Idealization of people" }],
                description: "Secluded way of life leads to reservedness and closedness. You not rarely are alone. Go into asceticness, refusing from all material benefits. Deny money and achievements, what leads to problems with finances. You need to search for balance between spiritual and material.\nWisdom and rich experience provoke you to arrogance and pride, you judge people and any their actions. Not rarely consider self smarter and better. Refuse to help people, what even more drives you into solitude.\nYour energy is subject to impostor syndrome: you are indecisive and constantly doubt in your ideas, fear to convey knowledge to others, since consider that you have insufficient skills and competencies. In end don't realize self and your talents, become apathetic and alone."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in realization" }, { label: "Good teachers and mentors are encountered" }, { label: "Strong connection with loved people" }, { label: "Warm relationships with relatives" }, { label: "You are comfortable being in seclusion" }, { label: "Study deep knowledge" }, { label: "There are students and followers" }, { label: "Material abundance" }, { label: "Revealing extrasensory abilities" }, { label: "Strong intuition" }, { label: "Engaging in creativity" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Walk in solitude on nature" }, { label: "Watching documentary films" }, { label: "Meditation, breathing practices, yoga" }, { label: "Trip behind wheel" }, { label: "Helping people" }, { label: "Listen to music, read books, especially about philosophy and psychology" }, { label: "Travels, trips, new places" }, { label: "Healthy sleep" }, { label: "Communication with different people" }, { label: "Time with family" }, { label: "Getting new knowledge" }, { label: "Conveying knowledge" }, { label: "Creation of new" }, { label: "Seclusion, peace, silence" }, { label: "Visiting places of power" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSearch for depth in everything you engage in and what fascinates you.\nStudy secret philosophical knowledge and use them for help to others.\nOpen your heart to people, share accumulated experience.\nWork with emotions and feelings, learn to speak openly and honestly.\nTrust people.\nDon't fear solitude, enjoy seclusion and silence.\nDraw strength in walks in solitude. Visit your places of power. More often spend time on nature.\nLearn to be loyal to self, listen to your intuition.\nLead diaries or notes of your thoughts, insights, epiphanies.\nCommunicate only with people pleasant for you and don't waste energy on empty communication.\nYou have huge potential for creation of your unique method or approach, which will have many followers.\nLook at past experience under different angle, extract lessons.\nReceive pleasure from sexual life and closeness with partner."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Any kind of activity which is to your liking will suit you, and you necessarily will succeed in it. Your strong side - intellectual labor. Develop not only logical thinking, but also intuition. Listen to your inner voice. Don't forget to share your knowledge and received information with surrounding people upon necessity. Don't fear solitude, because exactly in seclusion to you come main realizations and discoveries. Main thing - don't go into self for long. Learn to let go of grudges and mistakes of past, with open heart accept new experience into your life. To trust from side of people, answer with same and open your soul. At lack of strength and life energy, it would be not bad to rest on nature."
            },
        ]
    },
    10: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "For tenth energy lightness and joy is important, as well as necessity of constant movement.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Inspiration" }, { label: "Luck" }, { label: "Openness" }, { label: "Leadership" }, { label: "Adventurism" }, { label: "Ideality" }, { label: "Success in matters" }, { label: "Persistence" }, { label: "Intuition" }, { label: "Movement" }, { label: "Sociability" }, { label: "Communicativeness" }, { label: "Kindness" }, { label: "Optimism" }],
                description: "Energy of luck and inspiration. Lucky one in life. Rules and systems are not important for you, you act only from flow. For your energy constant movement and development is important, you generate many new ideas. Can be a leader, but don't strive for this. You are open to new people, knowledge and experience.\nDon't bother over details and don't like routine. Any idea can inspire you, you charge up, start movement and thereby attract success to self. To you suddenly right people are encountered, unexpectedly money comes and circumstances turn out successfully. Main thing, don't deceive and don't act from mercenary goals. And also don't search for easy money or fast earning.\nMaintain state of inspiration — this will strengthen your energy. Engage in favorite matter, spend much time with like-minded people, communicate with different people. In any circumstances remain cheerful and open. If there is no inspiration and movement, then you start to lose luck, become apathetic and risk going into depression.\nKnow how to relax and let go of situation, don't worry over trifles. This only strengthens your energy and attracts even more opportunities into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Heaviness" }, { label: "Tension" }, { label: "Unwillingness to move" }, { label: "Laziness" }, { label: "Passivity" }, { label: "Apathy" }, { label: "Suggestibility" }, { label: "Worries" }, { label: "Pessimism" }, { label: "Disrespect to people" }, { label: "Inconsistency" }, { label: "Unsystematicness" }, { label: "Stubbornness" }, { label: "Harmful habits" }, { label: "Lack of independence" }, { label: "Debts" }, { label: "Fears" }, { label: "Worrisomeness" }],
                description: "Your main minuses — this is absence of movement. You are initiative-less, no ideas and desire to move forward to your goals. As consequence, you lose inspiration and luck. Harmful habits and problems with money can form.\nIf there is no movement in life, then you go into apathy. Constantly whimsical, judge those around and complain on life. Fears - one more manifestation of your minuses. You fear to take for new matter, don't believe in that luck will be on your side.\nMain rule for you: even if lazy, all the same continue at least some movement. This can be whatever: go for walk in park, start reading book, meet with friends or sign up for courses, which you for long time postponed. Activity will lead your energy into plus and all circumstances themselves will start to turn out in successful way."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in financial questions" }, { label: "Life without debts and credits" }, { label: "Many large good deals in business" }, { label: "Success in own matter and freelance" }, { label: "Favorite matter which brings stable income" }, { label: "Luck, success, winnings" }, { label: "Irreproachable reputation of honest and responsible partner in business" }, { label: "Positive thinking" }, { label: "Inspire people" }, { label: "Success in non-standard spheres of activity" }, { label: "Money is given easily" }, { label: "Easily attract necessary resources: need information — you get it, worker — is found" }],
                description: "Financial help to loved one, family or children on constant basis.\nOwn business where you pay good salary to workers and help grow in career."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Communication with different people" }, { label: "Visiting parties, interesting events, networking" }, { label: "Enjoying life" }, { label: "Spontaneous travels or activities" }, { label: "Group practices (yoga, meditations)" }, { label: "Creativity" }, { label: "Reading psychological books, watching inspiring and motivating films" }, { label: "Meetings with friends" }, { label: "Time with family" }, { label: "Learning new" }, { label: "New acquaintances" }, { label: "Time on nature" }, { label: "Cleanliness and order in house" }, { label: "To see off beautiful sunsets, meet sunrises" }, { label: "Systematize matters and plans" }, { label: "Lead diary of gratitudes and self-programming" }, { label: "Create comfort and beauty around" }, { label: "Care for self and body: spa, massage, saunas, baths" }, { label: "Engage in sports" }, { label: "Going to shops" }, { label: "Go to concert with friends" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAvoid stagnation, eradicate laziness and motivate self to move forward.\nTravel, go on spontaneous trips.\nEngage in creativity.\nTake part in interesting projects which inspire you.\nCommunicate with different people, make acquaintances.\nFind for self goal in which you can apply all accumulated experience.\nRefuse from controversial offers which promise easy money.\nConcentrate on your main goals, don't be distracted by secondary tasks.\nLet go of hypercontrol, stop worrying.\nLive in moment here and now.\nCare about well-being of your family.\nRegularly rest, relax: spa, bath with salt, massage, sauna.\nWatch inspiring films, read motivational books.\nLead healthy way of life.\nWork over self-discipline.\nBuild plans and record them in diary. Engage in practices: meditations, yoga, breathing.\nLearn to competently plan your finances.\nReceive pleasure from your activity.\nListen to self and your desires.\nWork in team, inspire and support each other.\nAccept any help.\nVoice aloud your desires and intentions.\nGo your way.\nBe grateful for everything what you already have, and at failure be grateful for experience.\nDevelop your individuality and independence."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Luck will accompany you in everything if you do everything correctly and follow your life path. Trust your fate, listen to hints of your inner voice and follow them. Don't try to radically change something in your life, otherwise luck can turn away from you and difficulties will come. Think positively, relate to everything easily. You need a firm inner core, which will help you in preserving soul equilibrium at any circumstances. Learn discipline and planning. It would be not bad to start a diary and record there your thoughts and realizations. Be active, use to full your opportunities, preserving your individuality, independence and faith in success."
            },
        ]
    },
    11: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "Personalities endowed with this energy possess the gift of seeing potential in people and projects, they are ready to invest their forces to help this potential unfold.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Responsibility" }, { label: "Capacity for work" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Adaptability" }, { label: "Practicality" }, { label: "Curiosity" }, { label: "Individuality" }, { label: "Organizational skills" }, { label: "Skill to lead behind self" }, { label: "Charisma" }, { label: "Sincerity" }, { label: "Integrity" }, { label: "Desire to create new" }, { label: "In what is my potential?" }, { label: "What idea can be promising?" }, { label: "How can I reveal potential of project or person?" }],
                description: "Masculine volitional energy. You are a person with strong character and internal core. Love for work and huge life energy motivate you to move forward. You are practical, search for benefit in everything and build processes maximally effectively, avoiding unnecessary routine and meaningless actions. Constantly study new directions, very curious.\nPossess ability to see and reveal potential: in advance see perspective in project or person, apply efforts for its revealing. You know exactly what idea can shoot in future and on what need to make a stake.\nTo reveal this energy, ask yourself questions:\nYou love to be in first place and feel self a winner. Ready to take responsibility and initiative in your hands, possess leadership entrepreneurial energy. Always strive for individuality, being a charismatic and bright personality. You have good physical strength. Actively engage in sports, you have strong health. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Workaholism" }, { label: "Overstrain" }, { label: "Ignoring problems" }, { label: "Impatience" }, { label: "Aggressiveness" }, { label: "Irritability" }, { label: "Suppressing others" }, { label: "Laziness" }, { label: "Whining" }, { label: "Rudeness" }, { label: "Powerlessness" }, { label: "Weakness" }, { label: "Indecisiveness" }, { label: "Conflictness" }, { label: "Hysteria" }, { label: "Greed" }, { label: "Problems with mom" }, { label: "Problems in sex" }],
                description: "Due to excessive workaholism you overstrain too much at work and rest little. Press on people and force to work beyond measure. Become impatient, lead self audaciously and rudely. Or on the contrary, lack of will power and decisiveness force you to be lazy and complain on life, what leads to weak-characteredness.\nYou fear conflicts and try to avoid them, but on other hand cannot control your emotions and start to quarrel without visible reasons. Happen to be petty and greedy.\nLikely, in childhood there was strong role model in person of mom, who unconsciously suppressed you or self and her desires, what led to tense relationships between you.\nYou don't accept your body and sexuality, constantly ill, lead unhealthy way of life and are shy of your appearance."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Strong physical and psychological health" }, { label: "You see potential in project or person" }, { label: "In advance predict trends" }, { label: "Feel intuitively physical state of another person" }, { label: "Successful in competitive struggle" }, { label: "Know how to manage emotions" }, { label: "Charge with your energy, motivate others" }, { label: "Successful operations, successful births" }, { label: "Healing abilities" }],
                description: "Rendering help to people, patronage and care."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Sport, best of all in which strength and endurance is manifested" }, { label: "Participation in competitions, races, marathons" }, { label: "Healthy sleep" }, { label: "Clear strategy and daily routine" }, { label: "Constant movement: fitness, walks, rest out of city" }, { label: "To set self goals and plans for day" }, { label: "Time alone with self" }, { label: "Order in matters and at home" }, { label: "Driving" }, { label: "Body care: bath, spa, massage, saunas" }, { label: "Time with family and loved ones" }, { label: "Watching interesting films, series, reading developing books" }, { label: "Cleaning house or renovation, rearrangement" }, { label: "Studying new" }, { label: "Spiritual practices, meditations, work with breath, yoga, nail standing" }, { label: "Observation of nature" }, { label: "Listening to music, dancing" }, { label: "Helping other people" }, { label: "Early rises, morning exercise" }, { label: "Riding bicycle" }, { label: "Traveling" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to manage your strength, use it for good.\nEngage in sports and lead active healthy way of life.\nCommunicate with successful people, get inspired.\nLearn to be in state of here and now.\nManage your emotions.\nWatch after voice and speech, don't use imperative tone.\nThink through strategy, record plans and follow them.\nBe calm and patient.\nDon't judge unhurriedness of others.\nBecome leader in your sphere.\nLearn to yield and go for compromise.\nInteract with people, and not suppress.\nMore often be on nature.\nRest, relax, meditate."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to timely relax and rest. Engage in development of body and alternate with full relaxation. Don't press and don't rush people, accept them such as they are. Not everyone has so much energy and life force, how much it is in you, don't forget about this. Don't overstrain, delegate part of your matters, master time-management. Control flashes of anger. Develop spiritually to learn to manage your energy. It's not worth going to result by any way and achieve everything by force, otherwise you will create for self enemies or obstacles in empty place. Grow up, gain independence and “cut umbilical cord” in relationships with mom. Desirably not to share your plans with her - if she will not approve your choice, you will not be able to implement what was planned."
            },
        ]
    },
    12: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "Twelfth energy means “suspendedness”. Person sees the world as if upside down, differently, in other way, not like others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Compassion" }, { label: "Support" }, { label: "Healing" }, { label: "Generation of ideas" }, { label: "Self-discipline" }, { label: "Openness" }, { label: "Love for learning" }, { label: "Easy resolution of problems" }, { label: "Amorousness" }, { label: "Inventiveness" }, { label: "Individuality" }, { label: "Love for nature" }, { label: "Sensitivity" }],
                description: "You look at world differently, not like everyone. You have a different look on processes and events. Know how to see and interpret signs and symbols which are understandable only to you. Love to do everything in your own way, creatively and innovatively approach resolution of any task, so, as no one did this before. You are a bright individuality, see self as special and stand out among others.\nYou are an idea-person. Well-read, can with ease explain even the most complex information. Work in flow, come up with ideas on the go and love to improvise. This is your element. Feel people, energy, space well. Extremely inventive, what at times helps to find non-standard way out of difficult situation.\nYou have an open and kind heart. Responsive and ready to always come to help. At times can go into victimhood, forgetting about self and your desires. You need to learn to say people “no”.\nYou like to make people's lives better, what brings internal satisfaction. More often act not from logic, but in sincere impulse of soul. Know how to serve selflessly, not demanding anything in return. Accept people such as they are."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Victimhood" }, { label: "Touchiness" }, { label: "Depressions" }, { label: "Negativity" }, { label: "Inability to refuse" }, { label: "Desire to be good" }, { label: "Doubts" }, { label: "Non-confidence" }, { label: "Need for love" }, { label: "Strong attachment to people" }, { label: "Panic" }, { label: "Self-destruction" }, { label: "Subconscious feeling of guilt" }, { label: "Lack of money" }, { label: "Dislike for self" }, { label: "Illusions" }],
                description: "You are in the role of victim. It seems to you that you do everything for people, but don't get anything in return. Much you take close to heart, extremely vulnerable and touchy. In aggregate all this can lead to self-destruction: problems with alcohol, dependencies, depression and solitude.\nAt times forget about self and your desires. Try to be good for everyone. Don't know how to say “no” to other people. Very dependent on opinion of those around, constantly wait for praise and approval. If you don't get them, start to blame and hate self. Accept self and people such as they are. Don't build illusions and expectations.\nThere can be problems with creativity and unique look on life. It's difficult for you to realize your own ideas, often stay in creative crisis. Don't know how to promote your vision, doubts and non-confidence in self interfere. Hence non-realizedness.\nValue and love self, care about your comfort and put your desires in priority."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Feel other people, know how to help" }, { label: "Success in creative and innovative projects" }, { label: "Generate plurality of ideas" }, { label: "Material well-being" }, { label: "Many grateful reviews about your work" }, { label: "Love to learn and find out new" }, { label: "Know how to interpret information in your own way" }, { label: "Have your own look on things" }, { label: "Inventively approach resolution of tasks" }, { label: "Easily improvise, can create literally on the go" }, { label: "Engage in charity" }],
                description: "Creative and inventive approach in any matter, as well as selfless serving to people."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "To do breathing practices, engage in yoga, stretching, meditations" }, { label: "To travel, go on hikes" }, { label: "Engage in creativity" }, { label: "Read books and interesting articles" }, { label: "Know how to refuse people" }, { label: "Engage in cleaning in house, get rid of excess" }, { label: "Generate new ideas" }, { label: "Think over creative projects" }, { label: "Inspire people" }, { label: "Create comfort" }, { label: "Study esoterics, try different practices" }, { label: "Surround self with beautiful things" }, { label: "Listen to music, dance" }, { label: "Share deep thoughts, discuss secrets and esoterics" }, { label: "Receive gratitude from people" }, { label: "Smile" }, { label: "Spend time with family" }, { label: "Visit places of power" }, { label: "More often be on nature" }, { label: "Study new" }, { label: "Care after your body: baths, saunas, massage, spa" }, { label: "Gift presents" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to look at habitual things in a new way.\nDevelop creativity.\nLearn everything unusual and interesting.\nDevelop writing skills.\nLearn to non-standardly approach resolution of tasks.\nSay \"no\" in time and don't take on self someone else's work.\nClearly build personal boundaries.\nDon't devalue your labor, set fair price.\nRaise self-esteem, strengthen faith in self.\nMake yourself presents and learn to live for self, and not only for sake of others.\nIt's important to love self and exit from state of victim.\nDo kind deeds not expecting approval.\nSupport social projects, help those in need, engage in volunteer activity.\nFigure out why you attract negative situations in which you are offended, not valued or used."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Gift love and care, and also learn to accept them. Help others, but also manage to develop, realizing your creativity and participating in unusual projects. This will charge you with energy and positive. Help only those who needs this, in this consists your destiny. But don't try to please everyone, this will lead to tiredness, burnout and depression. It's important for you to let go of people and situations, not hold on to old, control your life. Don't be a victim and know how to stand up for self. Don't act to detriment of self, help only from state of filledness and abundance. Don't be shy to take money for your work and learn timely to refuse. Exit from state of longing and apathy. In this creativity, physical activity and travels will help you."
            },
        ]
    },
    13: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "Thirteenth energy doesn't have a specific archetype, it is structureless.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for life" }, { label: "Bravery" }, { label: "Activity" }, { label: "Fearlessness" }, { label: "Inspiration" }, { label: "Desire for changes" }, { label: "Straightforwardness" }, { label: "Honesty" }, { label: "Unpredictability" }, { label: "Leadership" }, { label: "Adaptability" }, { label: "Sexuality" }, { label: "Efficiency" }, { label: "Practicality" }],
                description: "You are an interesting and unusual person. You are surrounded by atmosphere of mysteriousness and mysticism. Structureless esoteric energy.\nYou are capable to transform thinking of people or working processes. Inspire into new, help overcome difficulties and non-simple events. It's important for you to constantly change something in your life, receive new experience, go to the end, having refused from fears and doubts. Global transformations interest you which will help make life better.\nYou know how to refuse from old and obsolete, that what already long ago doesn't work. You don't like predictability. Any stability you break and change under yourself.\nIntersted in different aspects of life, curious and creative, easily get involved in everything new and unusual.\nAlways hold self confidently and will not get lost even in extreme situation. Easily concentrate, and in complex conditions act without panic. You have dulled fear of danger, therefore extreme types of sport can attract you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Harshness" }, { label: "Pessimism" }, { label: "Aggressiveness" }, { label: "Fear of death" }, { label: "Recklessness" }, { label: "Fussiness" }, { label: "Timidity" }, { label: "Passivity" }, { label: "Stagnation" }, { label: "Coldness" }, { label: "Calculativeness" }, { label: "Carelessness" }, { label: "Riskiness" }],
                description: "If energy is in minus zone, then you fear changes. It's fearful for you to go into new, you get stuck on one place and don't realize your talents. Clutch at past and already obsolete. Accumulate junk at home, stack, preserve and fear to lose.\nIn minus doubts in self appear, fears, unnecessary fussiness. If you will not act independently, then your energy self will start to attract forced changes: dismissals, loss of loved ones or money and so on.\nOn other hand, you can lead self harshly and aggressively. Try to bring changes forcibly where they are not ready yet for them. There can be mood swings, excessive emotionality. Constantly change work, cannot choose something one. Can take for several matters at once and not a single one lead to end.\nLove to stay on edge of life and death, go for unsubstantiated and at times stupid risk. Situations are not excluded where you can turn out on edge of life and death: accidents, illnesses, clinical death."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Create new through death of old" }, { label: "Create transformations (of people or projects)" }, { label: "Resolve non-standard tasks" }, { label: "Multi-tasking" }, { label: "Success in restoration, resuscitation or creation of new life" }, { label: "Calm in extreme conditions" }, { label: "Save lives of people" }, { label: "Good intuition" }, { label: "Attract everything unusual and mysterious" }, { label: "Lead people behind self, inspire into changes" }, { label: "Gift of persuasion" }, { label: "Worthily pass crises" }],
                description: "Saving and transformation of life of other people"
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Travels, change of environment, trips" }, { label: "Visiting interesting and unusual places" }, { label: "Receiving new knowledge" }, { label: "Communication with close people" }, { label: "Time with family" }, { label: "Dances" }, { label: "Sport, activity" }, { label: "Meetings with interesting people" }, { label: "Visiting museums, theaters, exhibitions" }, { label: "Engagement in creativity" }, { label: "Spend time with pets" }, { label: "Solitude" }, { label: "Care about self: massage, spa, baths, saunas, beauty salon" }, { label: "Rest on nature: swimming in sea or hike in mountains" }, { label: "Study of esoteric knowledge" }, { label: "Practice of yoga, meditation, breathing practices" }, { label: "Constantly try new: hobbies, rearrangement, cooking" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSet order in matters, things and relationships.\nFix in writing your ideas, plans and dreams.\nEngage in creativity.\nGet rid of that what doesn't lead you to result.\nDon't take for multitude of matters at once, concentrate on something one.\nLead any matter to end.\nLearn to be more calm and peaceful.\nLive here and now, get rid of fussiness.\nStop being afraid for relatives and close ones, as well as excessively worry.\nBe joyful and optimistic.\nExperiment in all spheres: in relationships, at work, with style in clothing, interior of home and so on.\nIf you risk, then justifiedly.\nWork over positive thinking, search for pluses even in the most complex situations.\nRecord good what happened with you during day.\nBravely start new stages in your life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "From birth you are endowed with excellent memory, strength and skill to concentrate and lead self collectedly in complex situations. You easily can teach people that what you know yourselves, since you understand and accept logic of happening events. One can try self in role of rescuer or crisis-manager for that to ecologically apply your interest to situations on edge. It's not worth going for unjustified, reckless risk, but better to apply your opportunities for help to people. Don't try to interfere into course of events which even so happen harmoniously, without your participation. Avoid imposing your opinion on surrounding people. Refusal from old and construction of new should be planned and expected, both in system self, and in life of people. Learn to listen and hear self, your internal sensations. Learn to control emotions, as well as live by your own energetic cycles. Allow yourself from time to time to relax and value your life."
            },
        ]
    },
    14: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "First orientation of this energy — creativity, creation of works of art.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Softness" }, { label: "Sensitivity" }, { label: "Intellectuality" }, { label: "Soulfulness" }, { label: "Healing" }, { label: "Morality" }, { label: "Wisdom" }, { label: "Calm" }, { label: "Harmoniousness" }, { label: "Modesty" }, { label: "Patience" }, { label: "Decency" }, { label: "Nobility" }, { label: "Delicate taste" }, { label: "Refinement" }],
                description: "Soft creative energy. You are a refined nature who possesses strong spiritual and healing energy. You live and create in flow.\nYou inspire people and charge them. Energy can manifest through creativity, creation and spirituality.\nFirst variant — creation of your art, own creative magic. You like to create in solitude and calm. You connect to flow, and ideas themselves come into your head. In you there is depth and internal peace. You understand own desires and strivings. Inside you there is always harmony.\nAlso you possess internal core and strength of spirit. Can be leader among creative people, unite them around into collective to create together.\nSecond variant — this is psychology, spirituality, healing and esoterics. You study secret esoteric knowledge. You have powerful flow energy. You delicately feel people and know how to help them. Possibly, there are abilities for healing. High intellect.\nOften live by mood and inspiration. You are a soulful person with whom it's always interesting to talk on different themes. Constantly study new and share knowledge with others.\nYou have moral landmark to which you strive. You are a decent and noble person: communicate with people honestly and openly, not deceiving either self or others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Callousness" }, { label: "Soul-less-ness" }, { label: "Attachment to material" }, { label: "Touchiness" }, { label: "Impulsiveness" }, { label: "Infantilism" }, { label: "Going into extremes" }, { label: "Desire to punish and blame" }, { label: "Rudeness" }, { label: "Capriciousness" }, { label: "Immoderation" }, { label: "Greed" }, { label: "Vulnerability" }],
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme, at times you yourself cannot decide what you want. Excessively sensitive. You are easy to offend and touch. Don't perceive criticism towards self, even constructive.\nOr, on contrary, you manifest harshness, daring and callousness. You are closed from people. Lead self rudely and often happen to be impulsive. Can get angry, drop everything, and then regret about taken decision.\nThere is risk to acquire strong dependency or harmful addictions.\nToo much hold onto past, don't know how to forgive and let go. Not rarely there are periods of emptiness and non-belief in own forces and possibilities.\nYou get attached to money and material values. Don't know sense of measure, you always have little of everything. Don't realize self in creativity."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Harmony with self and world" }, { label: "Revealing of creative talent" }, { label: "Easy resolution of household questions" }, { label: "Success in one's business" }, { label: "Authority of kind and decent person" }, { label: "Fast reaching of own goals" }, { label: "High income" }, { label: "Rich imagination" }, { label: "Powerful flow" }, { label: "Deep spiritual knowledge" }, { label: "Feel people well" }, { label: "Strong intuition" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Creativity" }, { label: "Singing, dancing, drawing" }, { label: "Creation of beauty" }, { label: "Listening to classical music" }, { label: "Meditations, breathing practices, yoga" }, { label: "Walks in nature" }, { label: "Study of art: visiting concerts, theaters, museums, exhibitions" }, { label: "Trips, travels, interesting excursions" }, { label: "Study of secret knowledge and esoterics" }, { label: "Rest in hot bath, banya, spa, sauna" }, { label: "Watching interesting interviews" }, { label: "Communication with different creative people" }, { label: "Time with family" }, { label: "Healthy way of life" }, { label: "Meetings with friends" }, { label: "Engagement in sports" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nExpress emotions openly, don't suppress them.\nFight with bad habits, lead healthy way of life.\nManifest honesty and openness in matters and with people.\nLearn moderation and patience.\nReceive high from uncertainty and unpredictability.\nMeditate, engage in spiritual practices.\nInspire self through study of art: music, literature, painting, theater.\nRest, take hot bath, visit baths, saunas, aroma-steaming.\nWalk more often in parks and outside city.\nLeave for new places.\nVisit your places of power.\nMaster new directions for self.\nCombine creativity and income.\nListen to your internal voice, develop intuition, take decisions based on internal sensations."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Delicate soul organization is given to you for that to you could find beautiful even in common things. You can engage in creativity to bring your vision to other people. It's best of all to write verses and create musical works in solitude, but it's important not to close in self. It's necessary for you to maintain connection with surrounding world, where you draw inspiration.\nGet rid of negative emotions, nourish your reason and cleanse soul. Nourish by positive energy from works of art. Spend more time by water. In general, all contacts with water are very useful for you.\nFight with dependencies and your weaknesses, avoid immoderation in everything. Always believe in self and your creative possibilities, develop them."
            },
        ]
    },
    15: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "Characteristic feature of person possessing fifteenth energy is that those surrounding him often experience irritation, anger and hatred during interaction with him.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energetic" }, { label: "Positive" }, { label: "Love for entertainment and pleasures" }, { label: "Love for material values" }, { label: "Good intuition" }, { label: "Clairvoyance" }, { label: "Wisdom" }, { label: "Understanding of essence of things" }, { label: "Luck" }, { label: "Fascination" }, { label: "Attractiveness" }, { label: "Style" }, { label: "Oratorical abilities" }, { label: "Openness to trips and adventures" }, { label: "Compassion" }, { label: "Kindness" }, { label: "Ability to help others" }, { label: "Sexuality" }],
                description: "You have a strong energy of temptation. X-ray person: you see all subtleties and defects in another person or work process, you know how to fix it and make it better. You can trigger people, call up negative emotions and lift their internal work-throughs outside.\nYou help to fix self and become better, but do this in your special way — through temptations. However you also are subject to different temptations. You love pleasures, luxury and comfort. You love money and value benefits, but don't get fixated on them. Know how to hold balance between material and spiritual.\nYou know how to find approach to person, immediately see where to press and where his painful points are located. You are diplomatic, know how to negotiate.\nYou have good connection with internal voice, intuition and higher forces. Possess gift of clairvoyance. Know how to charge and direct other people. Strong esoteric energy. You are possessor of deep knowledge, therefore they often turn to you for advice. Always look good, dress stylishly, attract people by external appearance and bright charisma. Sexual and charming.\nMuch internal energy, you want to create and create, generate ideas, move forward to your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Aggressiveness" }, { label: "Jealousy" }, { label: "Envy" }, { label: "Vulnerability" }, { label: "Dependencies" }, { label: "Arrogance" }, { label: "Thirst for power" }, { label: "Pride" }, { label: "Fixation on material" }, { label: "Suppression of people" }, { label: "Rigidity" }, { label: "Deception for sake of profit" }, { label: "Greed" }, { label: "Selfishness" }, { label: "Betrayal" }, { label: "Black magic" }, { label: "Excessive control" }, { label: "Manipulations" }, { label: "Stubbornness" }, { label: "Irritability" }, { label: "Criticality" }],
                description: "You can fall into different dependencies and temptations (alcohol, drugs etc.).\nManipulate people, press on their weak points, know how to touch and wound. Deceive in selfish goals. Can lead self arrogantly, want to possess power over people and try to suppress. Critically relate to opinion of others, not ready to hear and listen, dispute, lead self stubbornly, get irritated by any reason.\nIn character there are selfishness and pride. You think only about yourself and your desires, putting other people as nothing.\nLove for luxury and excessive striving for material benefits make you greedy fixated on money, what interferes with revealing of talents.\nCan excessively guard near ones, even manifest rigidity and aggression to them. Not rarely there are situations when you betray person close to you for sake of temptations and desires."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Financial sufficiency" }, { label: "Possession of power" }, { label: "Love for luxury" }, { label: "Know how to build ties, diplomacy" }, { label: "Possess your sexual energy" }, { label: "Capable to cope with crisis situations" }, { label: "Know how to earn money" }, { label: "See essence of things, notice smallest details" }, { label: "Can help person exit from heavy dependencies and states" }, { label: "Know how to transform another through temptations and vices" }, { label: "See what and where needs to be fixed" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Sport: running, fitness, dances to energetic music" }, { label: "Preparation of tasty and useful food, beautiful serving" }, { label: "To surround self with beauty and luxury" }, { label: "Rest in beautiful and luxurious place" }, { label: "Enjoy the moment" }, { label: "Creativity" }, { label: "Rest in nature" }, { label: "Light conversations, meetings with interesting people" }, { label: "Care for self: massage, beauty salon, spa" }, { label: "Purchases of quality and expensive things, pampering self" }, { label: "Watching films and interviews with deep meaning" }, { label: "Conversations about spiritual and esoteric with other people" }, { label: "Helping people" }, { label: "Receiving new knowledge" }, { label: "Healthy way of life" }, { label: "Time with family" }, { label: "Communication with friends" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to see world and people through prism of good.\nDevelop spiritually.\nWork over internal aggression.\nGet rid of cynicism and selfishness.\nAccept and forgive people, learn to be flexible.\nOpen your heart for love, learn to gift it to others.\nHelp people become better.\nLearn to relax and trust.\nDon't manipulate people.\nEngage in spiritual practices, yoga, meditation.\nActivate your sexual energy.\nEngage in creativity.\nFor men it's good to engage in martial arts, take care of self and find one's style.\nTake care of your body, pamper self.\nLearn to ecologically get rid of negative emotions.\nCorrectly tell people about their defects. Free self from bad habits and harmful dependencies.\nWorthily pass all trials by large money.\nWith ease accept and let go money.\nBe grateful for that what already you have.\nHold balance between spiritual and material."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your unique abilities need constant development, never stop on achieved. Shift focus of your attention from material values to spiritual development. Learn to see in people not only their weaknesses and vices, but also their strong sides. Accept events happening in your life unconditionally and try to preserve positive in any situation. Always observe balance \"take-give\" if you are aimed at further development and prosperity. Don't criticize people for their weaknesses, but on contrary, support them and help grow. Avoid use of your strength for control over people. Learn to easily let go unpleasant situations and abstract from them. Accept the fact that every person is free to act and live proceeding from one's views and beliefs, even if they are far from truth."
            },
        ]
    },
    16: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "In plus such person can create new, often thanks to destruction of old.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Spirituality" }, { label: "Clairvoyance" }, { label: "Energetic" }, { label: "Strength of spirit" }, { label: "Innovation" }, { label: "Leadership" }, { label: "Determination" }, { label: "Adventurism" }, { label: "Adaptability" }, { label: "Bravery" }, { label: "Development" }, { label: "Self-knowledge" }, { label: "Creativity" }, { label: "Creation" }, { label: "Honesty" }],
                description: "You live here and now, look differently at things and events. Thanks to life experience you are capable to change world-view and extract important lessons from past.\nStrong daring energy. You are not afraid to go into new, open to changes, thanks to what you receive positive changes in life. You destroy old, dishonest, insincere, not real and create on this place new. This can be new work, completion of old relationships, change of place of residence and so on.\nYou are a self-confident person who stands firmly on feet. Possessor of powerful strength and energy. Can inspire others, lead behind self, motivate for changes. Good ideological leader and mentor will come out of you. You have a kind and honest heart, ideas are always driving you, directed at help to others. You don't get fixated on money and material, concentrating on your ambitious ideas and their realization. Easily adapt to any conditions, can even live in asceticism if goal requires this.\nAlso you have non-standard thinking and rich imagination. Strong flow energy: you generate creative ideas which move you forward. Love to reflect, search, try. Constantly develop and cognize new. Spiritual energy: you like deep esoteric knowledge, different practices, unusual experience. You want to try everything on yourself. Boldly experiment and search for your own."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Health problems" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Hot-temperedness" }, { label: "Destructiveness" }, { label: "Lack of spirituality" }, { label: "Attachment to old" }, { label: "Chaoticness" }, { label: "Pull to dangerous" }, { label: "Unmanageability" }, { label: "Fraud" }, { label: "Deception" }, { label: "Dependencies" }, { label: "Helplessness" }, { label: "Vulnerability" }],
                description: "First important minus by your energy — excessive rigidity. You cut from shoulder, say in face of person everything what you think, happens to be incorrect and categorical. Aggressively go break-through and often over heads for sake of your goal. Bear destruction instead of creation.\nMaterial values and money drive you, you refuse from spiritual and can fall into dependencies. Start to deceive self and people. If you now have problems with health, then this is clear sign of energy in minus.\nOther side of minus energy — this is sluggishness, indecisiveness, doubts and strong attachment to old. You fear changes, not ready to go into new, it's scary for you to manifest and open to people. You don't have ideas, don't understand where you want to move. Not ready to lead people, refuse from leadership and ambitions.\nIf you won't develop, then life will force you to do this in sharp, unpredictable and sad way — through loss of work, near person, money and so on."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Strong willed character" }, { label: "Open to new and changes" }, { label: "Success through cardinal changes in life" }, { label: "Cope with any crisis" }, { label: "People trust you" }, { label: "Inspire for changes" }, { label: "Can lead behind self, motivate" }, { label: "Authority of spiritual leader" }, { label: "Honesty and openness" }, { label: "Strong healthy organism which is ready to withstand any trials" }, { label: "Ascetic image of thinking" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Cleansing of space, decluttering of home, cleaning" }, { label: "Active sport, walks, rest" }, { label: "Spiritual practices, yoga, meditation" }, { label: "Books, courses, videos, podcasts on self-knowledge" }, { label: "Visiting places of power" }, { label: "Care for you: spa, massage, beauty salon" }, { label: "Creativity: dances, drawing, singing" }, { label: "Minimalism, asceticism" }, { label: "Solitude" }, { label: "Study of new" }, { label: "Time with family" }, { label: "Sharing information with others" }, { label: "Meetings with like-minded people" }, { label: "Communication with new interesting people" }, { label: "Study psychology, esoterics, spiritual knowledge" }, { label: "Helping people" }, { label: "Traveling" }, { label: "Frequent trips, change of setting, moving" }, { label: "Reading biographies of famous people" }, { label: "Being in the moment “here and now”" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAct decisively and boldly, don't doubt in self.\nWork over self, become better than yesterday.\nLearn to live consciously, be grateful for everything what already you have.\nRefuse from old beliefs and settings.\nCleanse your space, do decluttering, conduct cleanings.\nTravel, study new cultures, search for inspiration.\nPractice various austerities.\nMeditate, engage in yoga, read spiritual and esoteric literature.\nWork over internal aggression and free self from negative emotions.\nStrengthen your physical health, engage in sport.\nTake care of your body: spa, baths, massage, saunas.\nCalmly and with gratitude accept any changes in life.\nGo out to nature: to mountains or to sea.\nChange environment if it starts to pull you down.\nDevelop and change your life for better.\nShare new knowledge with people, be open, trust.\nNot to regret about past, free self from old.\nLearn to alternate activity and peace."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Try to support your physical body, leading correct way of life, and, at this, don't forget about spiritual development. Don't cling to old, boldly go forward, towards changes. Learn to trust people, open your heart, gift them your love, share your knowledge and experience. Having chosen your path, cast off all doubts and boldly go forward. You will be able to lead behind self many people if your path is correct. Develop in self skill of awareness, easily let go old: people, things, relationships, settings. Leave past in past, don't look back. Learn to see signs which fate and Universe send, listen to self and your internal voice. It is under your power to launch new cycles of life, awaken people, show habitual things in different light. Use your abilities for good, as well as, transmit your spiritual experience."
            },
        ]
    },
    17: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "People with such energy possess a strong ego, they strive for leadership and don't wish to stay in shade.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Desire to be in center of attention" }, { label: "Brightness" }, { label: "Emotionality" }, { label: "Artistry" }, { label: "Charm" }, { label: "Love for self" }, { label: "Lightness" }, { label: "Sensitivity" }, { label: "Intuition" }, { label: "Individuality" }, { label: "Imagination" }, { label: "Optimism" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Openness" }],
                description: "Soft creative energy. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for a dream and listen only to the internal voice.\nYou shine for those around you, you are in the center of attention, you are admired and you are imitated. You like publicity and fame. You don't like to be in the shade and in second roles. Ambitiousness and large-scale goals motivate to move forward, to create, to produce and to demonstrate self and one's talents to the world.\nYou have an attractive appearance, you take care of self and one's body. Often you receive compliments and attract gazes.\nYou possess a unique imagination and creative thinking. You know how to create art which will please many. You draw inspiration from nature and from communication with like-minded people.\nYou are a kind and open person. You can heal others, thanks to your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics. You study everything new and try it on yourself."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Unrealizedness" }, { label: "Lack of confidence" }, { label: "Pride" }, { label: "Stardom" }, { label: "Vanity" }, { label: "Fixation on material" }, { label: "Withdrawal from reality" }, { label: "Deception" }, { label: "Illusions" }, { label: "Selfishness" }, { label: "Fear of unknown" }, { label: "Problems with sexuality" }],
                description: "First variant of manifestation of minuses by energy — this is unrealizedness. You stay in shade, don't reveal your talents, doubt in self and your forces. Don't understand where to move, what to engage in and what inspires you. You are shy to stay in center of attention, don't like to be in sight and lead a closed way of life. Confident in self, you fear everything and refuse to implement your dream. Stay in creative crisis.\nSecond variant — pride, vanity, star sickness. You go away from reality, start to get stuck up, behave with people selfishly, command, manipulate, often advance your requirements and conditions. Not ready to go for compromise. Get fixated on your success, money and material benefits, forgetting about spiritual. Live in own illusions, can fall into dependencies: alcohol, drugs, promiscuous way of life and so on.\nDeceive self, thinking that with other people something is not so instead of that to search for root of problem in self.\nDon't accept your appearance, consider yourself an unattractive and ugly person. Often there are problems with sexuality. Shy of self and one's body."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in art and creativity" }, { label: "Reveal your potential" }, { label: "Feel other people well" }, { label: "Public success, popularity, fame" }, { label: "Many fans and followers" }, { label: "You are admired" }, { label: "Authority of honest person with irreproachable reputation" }, { label: "External and internal beauty" }, { label: "Recognition and respect from side of colleagues" }, { label: "Love to be in center of attention" }, { label: "Many friends and acquaintances" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Creativity: dances, drawing, singing" }, { label: "Freedom in manifestation" }, { label: "Public speeches" }, { label: "Spending time in large companies, staying in center of attention" }, { label: "Visiting bright events" }, { label: "Implementing creative ideas, creating unique product" }, { label: "Sport, active rest" }, { label: "Success, public recognition, fame" }, { label: "Shopping, beautiful purchases for self" }, { label: "Visiting spa, beauty salon, massage" }, { label: "Traveling" }, { label: "Interesting conversations with creative people" }, { label: "Meeting new people, getting acquainted" }, { label: "Team work" }, { label: "Performing on stage" }, { label: "Learning new" }, { label: "Watching inspiring films, listening to music" }, { label: "Filming content, video, sharing in social networks" }, { label: "Leading your blog" }, { label: "Spending time with family" }, { label: "Meditations, yoga, spiritual practices" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nWrite down your goal and in what way you can implement it.\nShare your thoughts and ideas with close people, receive support from them.\nReveal your creative potential, show to the world your talents.\nEngage in creativity, create, invent, manifest.\nFind favorite matter which will inspire you.\nFollow impulses of your heart, develop intuition.\nCommunicate with like-minded people, get acquainted with different people, be open to communication.\nDon't fear to experiment, be bright.\nVisit parties and events, go out into world.\nDress up, think through your image and style.\nAccept your uniqueness, share it with the world.\nRefuse from pride and vanity. Be open, gift love.\nAllow self to be successful and famous.\nBecome example for many, inspire people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Live real life, but don't refuse from your creative abilities. Develop your strong sides, but remember that success is based on diligence and hard work. Don't forget to set clear goals before self, but choose that activity which is according to your soul. If you choose a creative profession, for example: actor or singer, then do this not so much for sake of fame, but for help to people. In your roles and images you can show that, what's worth avoiding in reality, you give life lessons. Look at various situations with optimism and always preserve calm. Avoid extremes: learn to overcome periods of despondency and absence of faith in own forces. For support of your physical body, as well as soul equilibrium, choose balanced nutrition, regular engagements in sport and rest in nature. Choose moderation in everything."
            },
        ]
    },
    18: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy that is associated with the astral body, intuition, sensing.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Mystery" }, { label: "Intuition" }, { label: "Materialization of thoughts" }, { label: "Liberation from fears" }, { label: "Strong imagination" }, { label: "Attractiveness" }, { label: "Sensitivity" }, { label: "Versatility" }, { label: "Success" }, { label: "Striving for beauty" }, { label: "Fast learning ability" }, { label: "Artistry" }, { label: "Positive thinking" }, { label: "Creative abilities" }, { label: "Fast exit from negative" }, { label: "Interest in knowledge" }],
                description: "Structureless soft energy. Your energy is related to deep immersion. You possess strong intuition and the ability to attract what you desire, so it is so important for you to think positively and fight fears, otherwise you will attract them into your life.\nYou like to study everything related to the unconscious and magical, you are fond of spiritual and esoteric practices. You are mysterious and attractive to other people, you like to decorate your body: tattoos, piercing, bright hair, unusual appearance, etc.\nYou can calmly \"fly away\" from the external, real world and go into your subconscious. Often you are in your own fantasies and thoughts, not noticing the surrounding environment. You prefer everything abstract, creative, and unusual. Structure, system, and order are not for you.\nYou create your magic in your work or creativity, think non-standardly, are fond of esoterics, meditations, tarot, etc. You go your own way and do everything in your own way, not paying attention to the opinions of other people. You listen only to your internal voice.\nYou are a soft and kind person, easily adapt to any conditions. You have a strongly developed sensing of yourself. You know how to help, what to say and do in a specific situation. People often turn to you for advice. You are interested in different directions of activity, whatever you take up, everything works out easily and without strain. You have a strong connection with the Moon and lunar cycles. The full moon has an especially strong impact on you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Withdrawal from reality" }, { label: "Addictions" }, { label: "Depressiveness" }, { label: "Anxiety" }, { label: "Hypocrisy" }, { label: "Doubts" }, { label: "Closedness" }, { label: "Victim state" }, { label: "Destruction" }, { label: "Inaction" }, { label: "Unrealizedness" }, { label: "Vindictiveness" }, { label: "Resentfulness" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Indecisiveness" }, { label: "Whining" }, { label: "Anger" }, { label: "Touchiness" }, { label: "Inertness" }, { label: "Pessimism" }, { label: "Loneliness" }, { label: "Non-acceptance of sexuality" }, { label: "Magic to harm others" }],
                description: "The first direction of minuses by your energy is excessive closedness and withdrawal from reality. It can reach addictions (alcohol, drugs, etc.) and depressions. You are capable of immersing yourself in your thoughts so much that you refuse to contact the real world. Sometimes you behave hypocritically, smiling to the face, but inside experiencing indignation and condemnation towards the person. You may like gossip.\nThe second direction of minuses is fears. You constantly doubt, fear, cannot make a decision and take responsibility. You stay in the victim state, complain about the injustice of life, whine a lot, but do nothing. It's difficult for you to make the first step towards your goal, you are inert and slow. All this leads to unrealizedness, closedness, and resentment at the whole world.\nIt's important for you to maintain positive thinking, not immersing in pessimism and negative. Your energy is capable of attracting everything you think about, so all fears and worries can easily be realized for you. Do not use your abilities to harm others (evil eye, damage, etc.)."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Know how to feel other people" }, { label: "Extrasensory abilities" }, { label: "Success in any matter" }, { label: "Healing" }, { label: "Immerse into depth, stay in your thoughts" }, { label: "Harmonious relationships with those surrounding" }, { label: "Studying sacred knowledge" }, { label: "Quickly attract what you desire" }, { label: "Creativity, unique approach, non-standard approach" }, { label: "Endow objects with energy" }],
                description: "Mastering any matter on professional level. Creating own magic."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Solitude" }, { label: "Spiritual practices, meditations, yoga, work with the unconscious" }, { label: "Walks in nature, especially near water" }, { label: "Studying deep and esoteric knowledge" }, { label: "Keeping a gratitude diary, fixing the positive for the day" }, { label: "Visiting art galleries, exhibitions, art events, creative meetings" }, { label: "Cleaning and decluttering the space" }, { label: "Body care: massage, aroma steams, spa, bathhouse, etc." }, { label: "Giving gifts to others" }, { label: "Going to theaters, museums" }, { label: "Shopping for self" }, { label: "Healthy sleep" }, { label: "Sport, yoga" }, { label: "Reading deep esoteric literature" }, { label: "Traveling to places of power" }, { label: "Learning new practices, trying them on yourself" }, { label: "Watching films with deep meaning, reading psychological literature" }, { label: "Engaging in creativity" }, { label: "Creating something with your own hands" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nIn moments of strong anxiety and fear let worries through self, try to understand what precisely causes fear in you.\nWork through your fears: live through and let go.\nFocus on specific tasks and actions which will lead you to desired result.\nDevelop intuition.\nThink positively, make vision boards, be grateful for everything what you already have in your life.\nTrust others, speak truth.\nBe more often in nature, especially near water.\nLead healthy way of life.\nDevelop your talents.\nStop doubting your possibilities.\nVisualize positive, successful images.\nLearn to see opportunities in life and use them.\nThink creatively, use your non-standard approach in any matter.\nCommunicate with different creative people, get acquainted, don't close in self."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Devote more attention to development of creative abilities. Create kind and positive emotions, surrounding self with pleasant people. Listen to your sensations and intuition, following your life rhythms. Start visualization from phone wallpaper and continue with vision board for implementation of what is desired. Maintain purity of thoughts and emotions, concentrating attention on positive. Meditations near water, walks or swimming can balance you and bring internal harmony. Keep gratitude diary for getting rid of fears and doubts. Having realized your power, direct it into help to others, this will be favorable for you. Don't refuse from esoteric knowledge and your abilities, however preserve real and sober look on things. Live consciously, independently defining your priorities."
            },
        ]
    },
    19: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energeticness" }, { label: "Leadership" }, { label: "Carefulness" }, { label: "Love of life" }, { label: "Optimism" }, { label: "Success" }, { label: "Authoritativeness" }, { label: "Desire to help" }, { label: "Wellbeing" }, { label: "Creativity" }, { label: "Collectiveness" }, { label: "Activity" }, { label: "Ambitiousness" }, { label: "Kindness" }, { label: "Lightness" }, { label: "Curiosity" }, { label: "Sexuality" }],
                description: "Leadership energy. You are a team player and are an authority for other people. You like to be in the center of attention, you have big ambitions and global goals. Your energy is the energy of the Sun. You carry warmth, light, and goodness to people through work, communication, actions. You are ready to shine and inspire, always smiling and charming. You have positive thinking and a huge flow of life energy that helps to move towards the goal. You love to engage in kind, charitable projects aimed at helping people, nature, animals, etc.\nYou are an ideological person, it is important for you that the goal inspires and charges you. You are not ready to work only for money or material values. If there is a cool idea that you burn with, the result will not keep you waiting. You are ready to take on large-scale projects that affect many people around the world.\nYou like to engage in creativity, create new things, and show creativity. You are free in your manifestation and always achieve success in the chosen activity.\nYou have a strong connection with nature. You can pass powerful streams of energy through yourself, which help in achieving global goals. You are a \"battery\" person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Egoism" }, { label: "Hot temper" }, { label: "Aggressiveness" }, { label: "Fixation on the material" }, { label: "Irresponsibility" }, { label: "Fear of big projects" }, { label: "Pride" }, { label: "Fanaticism" }, { label: "Envy" }, { label: "Powerfulness" }, { label: "Rudeness" }, { label: "Feeling of guilt" }, { label: "Illnesses" }, { label: "Fuss" }, { label: "Chaoticness" }, { label: "Bad relationships with father" }],
                description: "The first manifestation of minuses by your energy is rigidity and excessive demandingness towards people. You set impossible goals and unrealistic deadlines, pressure your subordinates, and sometimes demand fulfillment of set tasks in an aggressive form. You manifest hypercontrol and do not trust loved ones. You can reach fanaticism in your cause. You behave powerfully and despotically with those around you.\nYou often envy, constantly comparing yourself with others. At the same time, you have an inflated ego, you pay attention only to yourself, fixate on your desires, not thinking about others. Not infrequently you focus only on money and financial success, completely forgetting about the higher goal and inspiration. The second manifestation is fading, apathy, doubts, and fears. You are not ready to take responsibility and become a leader, you are afraid to move towards your goal, you get lost and act chaotically. Fear to start a big, global project is possible, since you constantly experience a feeling of guilt, doubt, and dissatisfaction with yourself.\nIn childhood, bad relationships with father could have formed, or he was a powerful and despotic person, suppressed you and your desires, or the reverse situation — he was too soft, indecisive, and others suppressed him."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Success in any matter" }, { label: "Being an authority for many" }, { label: "Team player" }, { label: "Helping others to realize talents" }, { label: "Engaging in projects aimed at charity and help" }, { label: "Inspiring people" }, { label: "Loving to be in the center of attention" }, { label: "Positive thinking" }, { label: "Childlike naivety and ease" }, { label: "Global projects" }],
                description: "Helping others in career growth"
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Walking, strolls in nature" }, { label: "Cleaning the house, decluttering the space" }, { label: "Listening to music, dancing, getting inspired" }, { label: "Traveling" }, { label: "Tasty food" }, { label: "Yoga, meditations, breathing practices" }, { label: "Watching inspiring films" }, { label: "Studying esoterics, deep knowledge" }, { label: "Painting" }, { label: "Communication with like-minded people" }, { label: "Healthy sleep" }, { label: "Sport, running, activity" }, { label: "Vocal, oratory courses" }, { label: "New acquaintances" }, { label: "Shopping" }, { label: "Solitude" }, { label: "Trainings, seminars, lectures, studying new things" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nRemember, every person has right of choice. Don't judge and don't force to act against will.\nBe an example for others.\nCommunicate, get acquainted with new people, be open and benevolent.\nSupport loved ones.\nRegularly rest and care for self: spa, massage, hot bath, bathhouse, sauna.\nThink positively.\nEngage in creativity, develop your creative skills.\nEngage in charity, help others.\nWake up early, do exercises, meditate. Morning is time of big energy for you.\nBe grateful for what you have already now.\nEngage in sport, lead active way of life.\nDevelop your oratory talents, one can engage in vocal.\nGet rid of aggression and feeling of guilt.\nLearn to rejoice in simple things.\nThink globally. Work through childhood traumas and heal your internal child."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "It's important to realize self in society, be open, manifest one's knowledge and embody most large and ambitious projects. Don't be afraid to take responsibility upon self and learn flexibility, if one has to correct plans by external circumstances not depending on you. Don't forget also about creative side of your personality, which is important to realize at least in form of hobby. Avoid excessive workaholism and control over people and circumstances. Don't forget to rest and care for self. Concentrate on positive moments and don't collapse all your energy and love on one person. For you it's important to live and act in society. It's important to engage in favorite cause, and not work only for sake of prestige and money. Then you will be able to achieve real success and prosperity in finances."
            },
        ]
    },
    20: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "This energy is one of the most complex to understand.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Claircognizance" }, { label: "Healing" }, { label: "Intuition" }, { label: "Ideologicalness" }, { label: "Mysteriousness" }, { label: "Sensitivity" }, { label: "Interest in the unusual" }, { label: "Versatility" }, { label: "Wisdom" }, { label: "Stability" }, { label: "Authoritativeness" }, { label: "Adaptability" }, { label: "Ability to manage" }, { label: "Scale" }, { label: "Family-orientedness" }, { label: "Connection with ancestry" }],
                description: "You have a talent for uniting and creating something integral. You can create new projects, unique products, or unite people. You manage to find a balance between the spiritual and the material. You see what a person or a project lacks to become integral, what flaws and shortcomings exist, and how to fix them.\nYou have strong sensitivity and a powerful gift of clairvoyance. When you live in a flow, interesting ideas and insights can unexpectedly come. Intuition is well-developed, you trust your internal voice. You are sometimes mysterious in the eyes of other people.\nYou like to help. You possess deep life wisdom and people often come to you for advice and support. You are a versatile and interesting personality. You are drawn to everything unusual and esoteric. You are fond of psychology, studying deep and sacred knowledge.\nYou easily adapt to new conditions. You are stable in any changes and stressful situations. You can manage people, but do not strive for this. You like uniting and working together more.\nYou have a strong connection with your family and ancestry. You value relationships and home comfort, gather loved ones together, help to solve conflict situations and disputes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Judgment" }, { label: "Resentments" }, { label: "Problems with relatives" }, { label: "Pride" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Fear of changes" }, { label: "Fear of criticism" }, { label: "Bad habits" }, { label: "Weakness of character" }, { label: "Lack of spirituality" }, { label: "Anger" }],
                description: "You lack integrity and balance in life. You cannot find a soul-appealing cause, do not understand where to move and what you want. You cannot assemble yourself, it is scary for you to go into something new, there is a fear of changes. You don't believe in yourself and your talents, often doubt. All this leads to weak character, bad habits, and addictions.\nIt may happen that you fixate on material values and money, and not on an idea and a favorite cause, which eventually leads to losses.\nOr vice versa, you may behave as a rigid and authoritarian person. You constantly demand something from others, are not ready to share, lead a secretive lifestyle. In conflicts, you manifest your aggression, which can offend a loved one.\nNot infrequently there are problems with family: quarrels, conflicts, and misunderstanding lead to cessation of communication with relatives."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Family business" }, { label: "Successful creation of the integral, healing" }, { label: "Strong intuition, clairvoyance" }, { label: "Increased sensitivity" }, { label: "Uniting people, own team" }, { label: "Authoritativeness" }, { label: "Many interests, hobbies, passions" }, { label: "Easily adapting to new conditions" }],
                description: "Providing financial help to family and loved ones"
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Good sleep" }, { label: "Communication with loved ones" }, { label: "Watching soul-warming films" }, { label: "Water procedures: hot shower, swimming pool, bathhouse" }, { label: "Traveling, driving a car" }, { label: "Inspiring those around" }, { label: "Favorite cause" }, { label: "Self-care: spa, massage, beauty salon" }, { label: "Cooking tasty food" }, { label: "Walking in nature" }, { label: "Shopping" }, { label: "Time with family" }, { label: "Studying your family and ancestry, compiling a genealogy" }, { label: "Organizing family evenings, birthdays, and holidays" }, { label: "Traveling with family" }, { label: "Helping relatives" }, { label: "Solitude" }, { label: "Working through relationships with parents, acceptance and forgiveness" }, { label: "Spiritual practices: yoga, meditation, breathing" }, { label: "Studying esoteric knowledge" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nEngage in spiritual practices, meditation, yoga.\nLead a healthy way of life.\nEngage in creativity.\nLive in a flow.\nEngage in sport.\nTransmit your wisdom to others.\nDevelop sensuality, intuition, clairvoyance.\nLearn to create the integral, help people find integrity.\nWrite down your goals and tasks, follow the plan.\nPractice forgiveness and acceptance.\nCommunicate more often with relatives, spend time with family.\nStudy your ancestry: family history, genealogy, etc.\nMaintain family traditions and values."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "You should use your unique possibilities for resolution of problems in family and elimination of repeating scenarios. You can break repetition of negative events, directing attention of whole family to violated ancestral scenarios. Possible appearance of such scenario: someone from elder family members feels self-undervalued, and younger experiences absence of love of relatives. In your power is to change scenario of negative events and direct life of whole family into positive channel. Help with kind words and acts, don't close in self, use your unique knowledge for good of people. Free self from negative in various aspects of life. Striving for material prosperity, devote attention to spiritual development. Engage in your health and develop individual abilities."
            },
        ]
    },
    21: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to a peaceful solution of problems and to harmonization of everything around.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Ability to lead" }, { label: "Interest in travel" }, { label: "Adaptability" }, { label: "Uniting people" }, { label: "Sensitivity" }, { label: "Healing" }, { label: "Freedom" }, { label: "Communicability" }, { label: "Ideologicalness" }, { label: "Globality" }, { label: "Tolerance" }, { label: "Openness" }, { label: "Scale" }],
                description: "Soft female energy. You are open to the new and unknown, love to receive diverse experience and experiment in everything. You have flexible thinking, you easily adapt to new conditions and circumstances.\nYou are a cheerful, kind, and smiling person. You like to engage in creativity and generate creative ideas. Your energy is very ideological, therefore you can become inspired by some idea, gather a team and lead it to the goal.\nYou are for harmony and peace in the whole world, always smooth over conflict situations and sharp corners. You know how to negotiate, find a compromise in any situation, listen and hear your interlocutor. You think positively, are always open and help people.\nHealing, clairvoyance, and intuition are well-developed in you.\nYou think globally, scale projects. You like to study all edges and possibilities of your personality, you are ready to go beyond usual frames and generally accepted standards.\nYou travel often, study other cultures and languages. You are open to communication, very communicative, easily make new acquaintances."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Militance" }, { label: "Categoricalness" }, { label: "Judgment" }, { label: "Conflictness" }, { label: "Destruction" }, { label: "Closedness" }, { label: "Aloofness" }, { label: "Whining" }, { label: "Distrust" }, { label: "Unconfidence" }, { label: "Mood swings" }, { label: "Desire to dominate" }, { label: "Emotionality" }, { label: "Ingratitude" }, { label: "Workaholism" }],
                description: "You behave aggressively, often argue with people, which leads to conflicts and quarrels. You judge another person and their actions if they contradict your convictions.\nCategoricalness and desire to dominate are present in the character, and this prevents you from establishing trusting and open relationships with people. You carry destruction instead of creation. Eventually this leads to closedness, you become aloof and lead a solitary way of life.\nThe second variant of manifestation of minuses by your energy is fear to go into the new, constant doubts in self and one's talents. You are unconfident, don't know what you want from life, what you would like to engage in and where to move. You don't trust people, are too emotional and experience frequent mood swings.\nEverything global and large-scale scares you: projects, ideas, plans. You are not ready to master new professions, refuse to travel and get acquainted with new people."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Traveling a lot, frequent trips" }, { label: "Studying foreign languages and other cultures" }, { label: "Creating global projects" }, { label: "Representing interests of your city, country or nation at various events, projects, etc." }, { label: "Actively promoting your ideas" }, { label: "Leading people, uniting, inspiring" }, { label: "Participation in an international project" }, { label: "Many foreign friends all over the world" }],
                description: "Creating a global project: an event for the whole city, an international conference, a mobile app, etc."
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Healthy way of life, useful habits" }, { label: "Communication with new people, acquaintances" }, { label: "Studying foreign languages and other cultures" }, { label: "Traveling" }, { label: "Creating global projects" }, { label: "Rest in nature" }, { label: "Yoga, meditations, spiritual practices" }, { label: "Concerts, international events" }, { label: "Walks" }, { label: "Sport" }, { label: "Healthy sleep" }, { label: "Watching motivational films and videos" }, { label: "Reading books that inspire you" }, { label: "Listening to music" }, { label: "Visualization, board of wishes, writing intentions" }, { label: "Setting goals for the future, planning" }, { label: "Expanding knowledge, receiving new information" }, { label: "Learning diplomacy and ability to negotiate" }, { label: "Mastering new professions, trying your forces" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nStudy foreign languages.\nTravel.\nManifest interest in other cultures and countries.\nWrite down your fears, find causes, work through them and let go.\nDream, think about global, write down your goals.\nGo beyond frames.\nBe grateful for everything what you have already.\nEngage in sport.\nLead a healthy, eco-friendly way of life.\nAccept world and people such as they are, develop tolerance.\nShare with people, show your life, open up.\nOne can start leading a blog in internet.\nIncrease qualification, master new techniques and programs.\nBe patient, manifest flexibility, adapting to new conditions and circumstances.\nLead started cause to end. Practice acceptance.\nDo your work for good and with kind message."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Unite people only from kind motives. Don't be attached to home, travel a lot. Your peacemaking activity and good deeds are capable of bringing to people the idea of closeness and equality. Develop your global vision, participate in world projects, at this don't lose connection with real life. Study the art of \"small steps\". Try to avoid debts and credits. Help those who turned to you, but don't impose your help to those, who don't need it. Your mission consists in fact, to not be attached to material, always be open to new and carry unification all over the world in ease."
            },
        ]
    },
    22: {
        title: "Who am I?",
        intro: "This section reveals your core identity, soul tasks, and personal energy signature.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Freedom" }, { label: "Innovation" }, { label: "Openness" }, { label: "Adaptability" }, { label: "Optimism" }, { label: "Kindness" }, { label: "Communicability" }, { label: "Adventurism" }, { label: "Independence" }, { label: "Going beyond frames" }, { label: "Activity" }, { label: "Movement" }, { label: "Creativity" }],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations, you are open to everything new, not afraid of experiments and bright sensations. You do not accept any prohibitions, do not like work by schedule and routine. You are a free person in all manifestations. Possess limitless perception of self and life.\nIn you there is your own depth, you can transform the consciousness of other people.\nCreative thinking and original ideas help you approach any task non-standardly. You bring innovation and creativity into your cause or project.\nActive in life, constantly in movement, travel a lot, get acquainted with interesting people. Easily adapt to new conditions. If necessary, you are ready to lead an ascetic way of life and give up material benefits for sake of your idea."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Lateness" }, { label: "Unreliability" }, { label: "Fixation on the material" }, { label: "Jealousy" }, { label: "Overpoweringness" }, { label: "Inadequacy" }, { label: "Dependencies" }, { label: "Suppression" }, { label: "Debts" }, { label: "Dissoluteness" }, { label: "Apathy" }, { label: "Non-freedom" }],
                description: "You have too non-serious and irresponsible attitude to life. You do not fulfill your promises, miss deadlines, often are late for important meetings. Can behave inadequately, suppress other people or be excessively jealous. Absence of frames in a bad sense of this word leads you to a dissolute way of life, dependencies, as well as to problems with law and debts.\nCan get fixated on material values and money, completely forgetting about ideas and inspiration.\nThe second variant of manifestation of minuses is tension and too serious attitude to everything. You lack lightness, you constantly worry and are in a stressful state. Don't know how to relax, don't trust life, are afraid and doubt.\nA sense of internal non-freedom can lead you to apathy and heavy psychological states. You don't know what you want to engage in, where you go and what inspires you."
            },
            {
                id: "personalStrength",
                label: "My personal strength",
                intro: "Developing these qualities will strengthen your personal power.",
                items: [{ label: "Easily find a common language with children" }, { label: "Implement your talents" }, { label: "Multitasking" }, { label: "Communicability" }, { label: "Diplomacy" }, { label: "Global thinking" }, { label: "Freedom in manifestation" }, { label: "Openness to the new" }],
                description: ""
            },
            {
                id: "resource",
                label: "Activation of life energy",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [{ label: "Long walks on foot" }, { label: "Traveling and trips" }, { label: "Communication with friends and close ones" }, { label: "Creativity" }, { label: "Time in nature" }, { label: "Spiritual practices, meditation, yoga" }, { label: "Care for your body, relaxation: massage, spa, bathhouse, sauna" }, { label: "Physical exercises, dances, sport, running" }, { label: "Healthy way of life" }, { label: "Useful habits" }, { label: "Listening to music and watching films" }, { label: "Observing elements: fire, water" }, { label: "Solitude" }, { label: "Time with family" }, { label: "Going beyond frames of the usual, experiments" }, { label: "Cognition of the new, learning" }],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't fear to go into the new and start from zero.\nTravel.\nEngage in creativity.\nOne can develop acting abilities, perform in public.\nSpend time with children, charge from them with lightness and freedom.\nDon't load self with heavy tasks.\nReduce communication with toxic people.\nDon't pile up grudges in self, communicate honestly and openly.\nLead a healthy way of life, get rid of dependencies.\nChoose freelance, seasonal or project work in online-format, to work from any point of world.\nImplement your creative ideas.\nDon't limit freedom of other people, accept their opinion, views and worldview.\nTrust the Universe, accept everything with lightness and optimism.\nEngage in sport, lead an active way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For choice of type of activity listen to self and develop in it. Try to not pile up what can limit you in something. This concerns grudges, limiting convictions, as well as material benefits. For creation of family a light-on-feet partner with similar views on life will suit you. Travels will allow you to give to world your ideas of good, unity and freedom. Lower your requirements, wear comfortable clothes, add lightness to your way of life. Learn to easily let go everything unnecessary from your life, as well as help other people, who need liberation from attachments. Work through your fears and limiting convictions, easily let go attachments from your life and get rid of dependencies."
            },
        ]
    },
};

// MY STRENGTHS SECTIONS
export const myStrengthsData: Record<number, IdentitySectionData> = {
    1: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the first arcana is the Magician.\nThis energy makes a person focused, capable of immersing themselves in work and creative processes.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Decisiveness" }, { label: "Persistence" }, { label: "Independence" }, { label: "Attractiveness" }, { label: "Leadership" }, { label: "Energy" }, { label: "Communication" }, { label: "Charisma" }, { label: "Oratory" }, { label: "Intellectuality" }, { label: "Individuality" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Adventurism" }, { label: "Ingenuity" }, { label: "Optimism" }],
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You are able to completely abstract yourself and immerse yourself in activity. You love to study everything: yourself, people, nature, life.\nYou have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are slow to move and open to any experiment person. Love for something new and pulling toward learning pump your intelligence. Sharp mind and good ingenuity help to non-standardly solve any task. You are an optimist for life and ready to go for risk if necessary.\nOften possess extrasensory abilities: you thinly feel people and understand them on an intuitive level. These abilities can be useful when implementing your ideas and projects.\nIf necessary, you can create and manage a team, speak in public to promote your plans and projects.\nLove to stand out among others, which helps you in work. Have a clear connection with the soul and inner Self, know how to make decisions in the moment. Independence in your thoughts and actions is important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Overstated/understated self-esteem" }, { label: "Inflated ego" }, { label: "Closedness" }, { label: "Suppression of others" }, { label: "Powerfulness" }, { label: "Conflictness" }, { label: "Aggression" }, { label: "Uncertainty" }, { label: "Pride" }, { label: "Indecisiveness" }, { label: "Intolerance" }, { label: "Self-interest" }, { label: "Manipulations" }, { label: "Secretiveness" }, { label: "Impatience" }, { label: "Loneliness" }, { label: "Vindictiveness" }, { label: "Envy" }],
                description: "Another variant of energy manifestation in minus is understated self-esteem. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. All this prevents your realization. You want to try everything at once, grab different activities and in the end do not bring anything to the finish, drop the case halfway. Accustom yourself to finish what you started. Evaluate your strength before taking on anything, and learn to set priorities correctly.\nAlso you can suppress others for your own, sometimes selfish goals. You begin to manipulate and manage, as you know how to feel people well and use this skill. You are vindictive and keep a grudge in yourself for a long time. Painfully perceive any criticism of your ideas, even if it is constructive.\nYou have a fear of theft of ideas, so you close even from loved ones and do not share your plans, dreams, thoughts. As a result, you lead a secret lifestyle. You do not want to hear your inner voice, grab everything from the fear of missing an opportunity, and at the same time cannot enjoy a truly interesting business, lose the taste for life, becoming angry and envious."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Leader who can lead others" }, { label: "Possess increased sensitivity and extrasensory abilities" }, { label: "Ability to quickly make decisions from intuition and inner response" }, { label: "Creating new through creativity" }, { label: "Can transfer deep knowledge from the position of \"guru\"" }, { label: "High level of intelligence, love for study" }, { label: "Ability to organize people through adventurism and ideology" }, { label: "Ability to create and create" }, { label: "Fast generation and implementation of ideas" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Egoism" }, { label: "Unfinished projects" }, { label: "Pride" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nRealize your ideas.\nIf a new thought came to you, then immediately write it down and try to start the implementation in the near future.\nBelieve in yourself and your talents. Do not doubt your abilities.\nBe decisive, initiative and active. Focus on your self-realization. Do not push ideas to the background.\nCreate new, even if it is scary and there are doubts. This is an experience that will be useful to you in life, even if it does not lead to the desired success.\nShare your experience and knowledge with other people. Pass information. Tell your ideas.\nLearn to work in a team, unite and help each other.\nLearn to forgive and do not keep evil.\nDevelop your creative abilities and creativity.\nStudy secret knowledge: work with the subconscious, esotericism, hypnosis, visualization of desires, meditations, practices, spiritual teachings. Develop intuition and feeling."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e\nFor you it is important to believe in yourself and your forces. Go your own way, not comparing yourself with other people. Express yourself in everything, even in small things. Choose the best for yourself. Do not be shy to stand out, strive to be the first in everything, but without fanaticism. Choose only what you like, and do not adapt to other people. You have a bright personality and a special, your own, vision.\nDevelop positive thinking, work on your thoughts, track events that happen in your life, make conclusions and trust the Universe.\nEngage in creativity, develop creative vision and observation. Be sure to embody your ideas in life. Immediately, as a thought appeared, fix it in a notebook and try to take the first steps for embodiment.\nLearn, get new knowledge, check everything in practice. Search for new approaches, experiment, do what no one has tried before. Take various courses, trainings and seminars and do not forget to apply the knowledge gained in real life, as well as pass it on to other people.\nDevelop feeling, more often listen to your intuition. Through these abilities you can promote your ideas, agree with people, find an approach, inspire and lead.\nEngage in sports, and also devote time to your body: spa, massage, beauty salon, baths and so on."
            },
        ]
    },
    2: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Kindness" }, { label: "Compassion" }, { label: "Intuition" }, { label: "Modesty" }, { label: "Romanticism" }, { label: "Mystery" }, { label: "Sensitivity" }, { label: "Empathy" }, { label: "Wisdom" }, { label: "Softness" }, { label: "Openness" }, { label: "Communicativeness" }],
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around.\nYou have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation. You will always find the right words, support a person and help.\nYou accept the world and people as they are, without judgment and patterns. Sometimes you can romanticize events, believe in fate and signs of the Universe. At times you are mysterious - this is part of your energetic. But do not forget about the balance between the spiritual and material. Find your middle ground and do not go to extremes.\nYou are always calm and know your value. You are selective in everything and love to take care of yourself. Surround yourself with beautiful objects, wear stylish clothes and original handmade jewelry.\nYou know how to relieve physical pain, can be a healer. You can transfer energy to people through creativity: painting, music, creating clothing or jewelry, etc."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Distrust" }, { label: "Uncertainty" }, { label: "Doubts" }, { label: "Inconstancy" }, { label: "Caprices" }, { label: "Conflictness" }, { label: "Malice" }, { label: "Confusion" }, { label: "Secretiveness" }, { label: "Tearfulness" }, { label: "Hypocrisy" }, { label: "Jealousy" }, { label: "Gossip" }, { label: "Manipulations" }, { label: "Coldness" }, { label: "Untidiness" }, { label: "Dependency" }],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn.\nYou doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view. You cannot focus on one thing and confidently move toward the goal. You are thrown from side to side, you doubt the correctness of your actions and depend on the opinions of other people. In the end you can close from everyone, refuse your own realization and harbor a grudge against those around instead of gaining courage to implement the idea.\nYou may have two sides: either you are too jealous, hot-tempered and demanding toward people, or, on the contrary, behave coldly, indifferently. You become indifferent to those around and their problems.\nYou can excessively fixate on your appearance, forgetting about inner qualities. Or the opposite situation: untidiness, negligence in affairs, mess in the house."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Bad relationship with mom" }, { label: "Hypocrisy" }, { label: "Aggressiveness" }, { label: "Oratory skill: you can talk much and beautifully" }, { label: "Get knowledge and information through space and inner voice" }, { label: "Increased sensitivity and intuition" }, { label: "Feeling of sincere compassion, desire to help" }, { label: "Abilities for healing, healing people" }, { label: "Can transfer knowledge from the position of \"guru\"" }, { label: "Harmonize people and space" }, { label: "Innate calm" }, { label: "Easily adapt to new conditions" }, { label: "Can be a good actor/actress, know how to live into a role" }, { label: "Lay deep meaning into information and pass it further" }, { label: "Diplomatic abilities - you can reconcile people around" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Lies" }, { label: "Gossip" }, { label: "Distortion of information" }, { label: "Conflicts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nDevelop your intuition. Listen to your inner voice.\nStudy spiritual practices, meditations, yoga.\nMove, travel, go for walking tours.\nEngage in sports, ground yourself and disperse energy throughout the body. Spend time in nature.\nTake care of yourself and your body. Visit spa, massage, beauty salons.\nTry to be in calm and harmony.\nDo not make hasty conclusions, do not hang labels and patterns on people. Learn to look at things from different angles.\nDo not participate in intrigues and gossip. Be honest.\nOpenly state your feelings and desires. Do not be afraid to express your opinion.\nShare knowledge and help with advice.\nWomen need to develop their sexuality and looseness. Take up dances and body practices. Men need to focus on such qualities as responsibility, courage and decisiveness."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e Develop your sensitivity, trust your inner voice more, and not logic and rational judgments. Find harmony within yourself. Maintain balance of spiritual and material, help other people with this. Engage in spiritual practices: breathing, meditations, yoga.\nYou have powerful healing energy, you know how to relieve physical pain. You can use this energy to help other people.\nAlways try to create a comfortable and cozy environment around yourself.\nUnite people. Get acquainted with different nationalities, religions and cultures. You know how to competently build communication and find common language with very different people. Use diplomacy skill for your self-realization in society.\nExpress your individuality through creativity: music, dances, painting and so on. You are capable of endowing things with your energetics, therefore you can focus on creating various objects."
            },
        ]
    },
    3: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the third arcana is the Empress (female energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, FERTILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Organizational abilities" }, { label: "Self-love" }, { label: "Care for others" }, { label: "Responsibility" }, { label: "Success in business" }, { label: "Generosity" }, { label: "Order in affairs" }, { label: "Love for comfort" }, { label: "Material prosperity" }, { label: "Taste and sense of style" }, { label: "Authority" }, { label: "Natural charm" }, { label: "Attractiveness" }, { label: "Creativity" }, { label: "Kindness" }, { label: "Good relations with women" }, { label: "Respect from men" }, { label: "Housekeeping" }, { label: "Sensitivity" }, { label: "Femininity" }, { label: "Calm and softness" }, { label: "Sexuality" }, { label: "Love for beauty" }, { label: "Respect for men" }, { label: "Love for plants, animals" }, { label: "Carefulness" }],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround only with beautiful objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children and value family. Take more responsibility on yourself, become an authoritative head, provide for relatives materially.\nYou feel comfortable in the society of women. But for harmonious relationships, cultivate a leadership position in yourself. In business, excessive softness may hinder you, so learn to take initiative and independently make decisions.\nYour task is to try to translate your third energy into the male fourth. Female energy. Empress. You love beauty, luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround with beautiful interior objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children, love your partner and value family. Educate children and build harmonious relationships within the family. Be a caring keeper of the home hearth, gather relatives together for general holidays, support traditions.\nYou can be successful in business and simultaneously create your family - importantly, find a balance. Respect men and find a common language with other women.\nYou are a beautiful, soft, sexual and sensual woman. Always know your value and are not ready to agree to less."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" }, { label: "Soft-bodiedness" }, { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Being \"under the heel\" (dominated by women)" }, { label: "Lack of money and career" }, { label: "No relationships" }, { label: "Rejection of women" }, { label: "Problems with women" }, { label: "Loneliness" }, { label: "Stinginess" }, { label: "Closedness" }, { label: "Obsession with appearance" }, { label: "Untidiness" }, { label: "Infantilism" }, { label: "Hyper-control" }, { label: "Hyper-responsibility" }, { label: "Lack of care for oneself" }, { label: "No time for oneself" }, { label: "Despotism" }, { label: "Destruction" }, { label: "Pressure on men" }, { label: "Tyranny" }, { label: "Choice between career and family" }, { label: "Merchantilism" }, { label: "Calculation" }, { label: "Problems with money" }, { label: "Unwillingness to have children" }, { label: "Possession of power" }, { label: "Egoism" }, { label: "Problems with sexuality" }, { label: "Conflicts with women" }, { label: "Caprices" }, { label: "Negligence" }, { label: "Workaholism" }],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nProblems in communication with women may arise: you don't respect them, don't accept care and affection, condemn their behavior. As a result, this leads to loneliness and lack of any relationships. Or vice-versa: become excessively soft, put a woman at the head, listen to her implicitly and allow to manage you, refusing your own opinion.\nIt's hard for you to succeed in male professions and business. Can be soft and indecisive because of this it's hard for you to take responsibility. Often avoid independence and initiative. In a team take a passive position and don't let talents reveal. As a result, you have neither career nor money. You close in yourself, blame those around, become stingy and greedy. Your main task is to try to translate the third energy into the male fourth. You lash out at loved ones due to your hysteria and emotionality. Don't know how to forgive, condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can start to intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nMay pressure men and press them. Don't respect their decisions, behave too emotionally and irresponsibly. Try to manage and manipulate, which leads to quarrels.\nIt's hard for you to make a choice between family and business, always sacrificing something. Often choose professional realization and refuse to have children, which leads to loneliness and closedness. At times too obsessed with your appearance or, vice-versa, become untidy and negligent."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "For men it's important to translate the third energy into the plus fourth." }, { label: "Housekeeping, ability to manage resources" }, { label: "Possess a special field of abundance and fertility" }, { label: "Can receive money without tension, through passive income" }, { label: "Inspire those around" }, { label: "Leadership and wisdom" }, { label: "Understand women well" }, { label: "Respect from men" }, { label: "Innate taste for beauty and aesthetics" }, { label: "Know how to form a team and wisely manage people" }, { label: "Much beauty around you: clothing, interior, things" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Excessive activity" }, { label: "Lack of independence" }, { label: "Aggressiveness" }, { label: "Tension" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Develop male qualities, take responsibility for the team.\nProvide for family, become head and support.\nBe generous.\nDon't conflict with women. Learn respect and trust.\nBecome an authoritative leader.\nDevelop decisiveness and initiative in yourself.\nEngage in sports.\nMake independent decisions.\nDevelop your relationships with women.\nRaise level of comfort for yourself and for loved ones. Manage people through wisdom and softness.\nDevelop femininity, accept men and material benefits from them.\nSupport your partner.\nDevote time to yourself, take care of your body: massage, spa, sport.\nEngage in creativity.\nDon't use commanding tone in speech.\nFix relations with mom, let go of all childhood grudges.\nCreate your family, raise children.\nDevelop generosity in yourself, help others to grow.\nDelegate work and domestic affairs. Don't take everything on yourself.\nSpend time in nature. One can start one's own garden or a domestic pet.\nLearn to combine career, raising children and household."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Strive to embody your mission - be a prosperous and generous person, successful in career and wise in family. Care for loved ones, but without intrusiveness and authoritarianism.\nCreate coziness, harmony and beauty around you. Take care of the house, but herewith don't get stuck in routine domestic affairs. Delegate your obligations to helpers or other family members.\nLet go of excessive guardianship and concern for relatives. Give them opportunity to develop and independently make decisions in life. Herewith you can become a support: support and give needed advice.\nTreat people as equals regardless of their status and financial position. Learn not to cling to material and don't chase after success. In due time success itself will come to you thanks to your talents and persistence."
            },
        ]
    },
    4: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Carefulness" }, { label: "Housekeeping" }, { label: "Leadership" }, { label: "Calm" }, { label: "Confidence" }, { label: "Responsibility" }, { label: "Work capacity" }, { label: "Organizational skills" }, { label: "Logicality" }, { label: "Reliability" }, { label: "Purposefulness" }, { label: "Authority" }, { label: "Charisma" }, { label: "Good relations with men" }, { label: "Respect for men" }, { label: "Good relations with mom" }, { label: "Order in money and affairs" }, { label: "Motherhood" }, { label: "Prosperity" }, { label: "Femininity" }, { label: "Sense of style and taste" }],
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance in your career, occupying high positions in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You have good diplomatic skills: you skillfully conduct negotiations and successfully reach agreements with people.\nYou are a strong leader and a charismatic person. Your priority is to give the family a decent level of life and provide for them materially. For loved ones, you are an authority; your advice is listened to and trusted. It is characteristic for you to always keep your word and fulfill your promises. Male strong-willed energy. You possess a global vision of things and strategic thinking. This allows you to successfully implement large projects and quickly advance on the career ladder, occupying high posts in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You skillfully conduct negotiations and successfully reach agreements with people.\nYou have a strong strong-willed character. You like to be in the society of men and easily find a common language with them. But, for harmonious relationships, do not forget about your tenderness and softness. Try to devote more time to yourself and caring for your body. Spend time with other women, engage in family life and care for relatives. Engage in creativity, dancing, reveal your female component.\nYour task is to try to translate the fourth energy into the plus third."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - TYRANNY, WEAKNESS, CHAOS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Authoritativeness" }, { label: "Tyranny" }, { label: "Obsession with the material" }, { label: "Hyper-control" }, { label: "Aggression" }, { label: "Inaction" }, { label: "Whining" }, { label: "Irresponsibility" }, { label: "Weakness" }, { label: "Uncertainty" }, { label: "Stubbornness" }, { label: "Jealousy" }, { label: "Fussiness" }, { label: "Cruelty" }, { label: "Belligerence" }, { label: "Disrespect for men" }, { label: "Intolerance" }, { label: "Criticality" }, { label: "Conflict nature" }, { label: "Categoricalness" }, { label: "Loneliness" }, { label: "Greed" }, { label: "No career" }, { label: "No money" }],
                description: "The first option is tyranny and despotism. You interfere in all working processes and family affairs. You abuse power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you show aggressiveness and cruelty toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. Constant doubts in your own decisions prevent you from taking decisive steps, and you are prone to complaints about the injustice of life, which leads to passivity and laziness. Your behavior becomes irresponsible, and you do not show readiness to care for the financial well-being of the family.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. It is characteristic for you to behave like an authoritative tough emperor. You control everything excessively. Often you set excessive requirements, set unfulfillable goals and deadlines for your subordinates. You don't know how to forgive people and go for compromises. In relationships you show despotism, you are not interested in family affairs, you suppress your partner and order around your loved ones. The first is tyranny and despotism. You interfere in all working processes and family affairs. You abuse your power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you are sometimes aggressive and cruel toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. You constantly doubt your decisions and experience difficulties with making a choice. You start to whine and complain about the injustice of life, become passive and lazy. You behave irresponsibly.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. Excessive independence and aggression will not allow building full-fledged harmonious relationships with a partner. At home you behave like an authoritarian leader, interfering in the private affairs of each family member.\nExcessive harshness and increased demandingness at work create tension in the collective, which, in turn, leads to frequent dismissals and financial losses.\nYour main task is to try to translate the fourth energy into the female third."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Increased requirements for people" }, { label: "Abuse of power" }, { label: "For women it's important to translate the fourth energy into the plus third." }, { label: "Can create a new business or company" }, { label: "Talented manager and leader" }, { label: "Strategic thinking" }, { label: "Responsibility and decisiveness" }, { label: "Global vision" }, { label: "Skill of scaling and multiplication" }, { label: "Initiativeness" }, { label: "Ability to gather a team" }, { label: "Order in affairs and finances" }, { label: "Diplomatic skills" }, { label: "Rationality and logicality" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Laziness" }, { label: "Authoritarianism" }, { label: "Unwillingness to develop" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome defender and reliable support for family. Provide for relatives materially.\nEngage in sports. Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome keeper of the hearth and caring mom.\nBe a support for your man.\nEngage in sports.\nDevelop creative skills.\nDevote time to yourself, take care of your body.\nSpend more time in nature and with other women."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For you it's important to stay in balance between spiritual and material. Treat people as equals, and not evaluating them by achievements or place in society.\nHelp not only your family and loved ones, but also subordinates at work. Give them opportunity for career growth.\nStop excessively controlling every sphere of life. Don't impose your point of view and trust your inner voice.\nDevelop physically: engage in sports, lead a healthy lifestyle, eat correctly.\nThink strategically, build your own empire and manage people through wisdom, and not authoritarianism. You quickly achieve good position in society, you are an example for many. Use your strength and power for good, for help to people.\nProvide family and loved ones with all necessary things: food, clothing, housing, education and so on. You are head of family and authoritative leader."
            },
        ]
    },
    5: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for learning" }, { label: "Oratory skills" }, { label: "Management skills" }, { label: "Conservatism" }, { label: "Desire to teach" }, { label: "Help to loved ones" }, { label: "Family orientation" }, { label: "Love for traditions" }, { label: "Professionalism" }, { label: "Correctness" }, { label: "Systematic nature" }, { label: "Pedantry" }, { label: "Accuracy" }, { label: "Logicality" }, { label: "Order in affairs" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Kindness" }],
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony. You can be a leader and a good manager, but you don't strive for it.\nYou are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others. For this you have expertise, excellent oratory skills and a strong voice. The main thing is to remain open to the world and pass your knowledge to people.\nYou love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Spontaneity, disorder and chaos can knock you out of balance.\nAnother way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions. Absence of family and trustful relationships negatively affect your energy."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Intolerance" }, { label: "Conflict nature" }, { label: "Emotionality" }, { label: "Egoism" }, { label: "Hyper-control" }, { label: "Judgment" }, { label: "Pride" }, { label: "Desire to suppress and teach" }, { label: "Limitation" }, { label: "Categoricalness" }, { label: "Harshness" }, { label: "Arrogance" }, { label: "Unwillingness to pass knowledge" }, { label: "Uncertainty" }, { label: "Fear of competition" }, { label: "Desire to argue" }, { label: "Rebellion" }, { label: "Fanaticism" }, { label: "Excessive correctness" }, { label: "Problems with family" }],
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. Sometimes emotions can overflow you and become the reason for hot-tempered reactions that can damage relationships with loved ones. You may start to control everyone around, stop trusting people, acknowledge only your truth. You harshly push your position, suppressing others. You can behave arrogantly.\nYou are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice. You can learn endlessly, get diplomas and awards, but for you it's much more important - to pass knowledge, and not to possess them in theory. There may be problems with family and creating relationships. Frequent conflicts and full discord in private life lead to loneliness and apathy. Especially important are your relationships with father."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Refusal to pass knowledge" }, { label: "Passing knowledge, good teacher" }, { label: "Love for learning and knowing the new" }, { label: "Create order and systematicity" }, { label: "Unite people, leader from the position of teacher" }, { label: "Oratory skills" }, { label: "Ability to structure" }, { label: "Create the whole through order" }, { label: "Practicality - use knowledge in life" }, { label: "Increased sensitivity and extrasensory perception" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Conservatism" }, { label: "Imposing your rules" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAcknowledge different knowledge and systems. Don't get fixated on one thing.\nStudy new information, expand your horizon.\nLearn.\nThink positively.\nPass accumulated knowledge to others.\nDevelop oratory skills. One can engage in vocals or oratory art.\nCreate and maintain family traditions.\nSpend time with family.\nDon't go for next learning until started using previous knowledge.\nListen to your intuition.\nReduce control regarding loved ones, relate to others with patience and respect. Each has his own path.\nInspire and motivate people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn the new and pass your knowledge further. You know how to re-process information through your prism and make the complex simple and clear. Openly share your experience, helping other people improve life. Use your life experience, share your wisdom.\nLearn to see the world in all its multi-faceted nature, accept everything new, be open. Don't get fixated on one teaching. Refuse from the old and outlived. Study different concepts, communicate with people, accept any experience.\nFor you it's important to maintain warm relations in family. Gather together for holidays, and also arrange joint trips and travels. Family is what charges and feeds you with energy.\nTry to control other people less. Be confident in yourself and you will be able to achieve much, occupying a leadership position in life."
            },
        ]
    },
    6: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the sixth energy is the Lovers.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Loving nature" }, { label: "Communicability" }, { label: "Artistry" }, { label: "Charm" }, { label: "Attractiveness" }, { label: "Sensuality" }, { label: "Communication skills" }, { label: "Sense of taste and style" }, { label: "Amorousness" }, { label: "Ability to organize" }, { label: "Loyalty" }, { label: "Adaptability" }, { label: "Carefulness" }, { label: "Selflessness" }, { label: "Festivity" }, { label: "Emotionality" }, { label: "Cling to comfort" }, { label: "Liberalism of views" }, { label: "Attention to details" }],
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love.\nLove to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language. Therefore, as a rule, you have an extensive circle of friends and acquaintances.\nYou like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier.\nEngage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Living in illusions" }, { label: "Fixation on relationships" }, { label: "Frequent change of partners" }, { label: "Inability to make a choice" }, { label: "Doubts" }, { label: "Vulnerability" }, { label: "Depressive nature" }, { label: "Uncommunicativeness" }, { label: "Infantilism" }, { label: "Idealism" }, { label: "Revengefulness" }, { label: "Touchidness" }, { label: "Fixation on appearance" }, { label: "Egoism" }, { label: "Uncertainty" }, { label: "Problems with finances" }, { label: "Apathy" }, { label: "Loneliness" }, { label: "Dependence on people's opinion" }, { label: "Impulsivity" }, { label: "Distrust" }, { label: "Self-dislike" }, { label: "Desire to seem better" }],
                description: "Main minuses by your energy go due to high sensitivity. You idealize and too quickly fall in love, and then for a long time stay in your delusions, which can lead to disappointment in a person. Often fixate on one relationship, and then with difficulty survive the departure. This concerns not only love, but friendly and work relationships. As a result, you may start to chaotically change partners, friends or projects, fearing to be disappointed and remain lonely.\nIn your character exists a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy, don't understand what you want, where to move and where to develop. Start to listen to opinion of other people instead of taking initiative into your hands and making an independent step.\nIf you go too much into idleness and lightness, then problems with finances start and debts appear."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Inability to see internal qualities of a person" }, { label: "Doubts" }, { label: "Know how to build harmonious relationships with people" }, { label: "Establish connections with others, know how to negotiate" }, { label: "Harmonize space" }, { label: "Feel people" }, { label: "Have inner sense of beauty, create beauty around" }, { label: "Attract people and opportunities into your life" }, { label: "Surround everyone with energy of love and care" }, { label: "Create holiday from any process" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Idealization" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't strive for ideal — this will lead you to disappointment. Do everything through love for self and world.\nFocus on positive qualities in people. Don't judge others and don't lead self aggressively.\nDevelop own taste and style, follow fashion and tendencies.\nManifest love for self and care for your body: shopping, spa, massage, sport.\nGive self and others gifts.\nVisit bright events and arrange thematic parties.\nGather together with friends, celebrate holidays. Spend time in circle of family.\nLearn to make independent choice, stop depending on opinion of those around.\nLearn to forgive people and accept them such as they are.\nDon't betray your partner. In relationships be sincere and open.\nHelp selflessly and from heart, not expecting nothing in return.\nDon't hold on to past. Let go of people and non-interesting projects. Don't be afraid to commit mistakes."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Surround yourself with beauty and help other people in this. Give feeling of lightness and celebration. Accept people such as they are - without judgment, gossip or idealization.\nLearn not only to accept love, but also give it to others. Less cling to appearance of person, try more to learn about internal qualities. Don't judge only by first impression.\nTry to think positively in any situations and be honest first of all with self. Orient only on your inner feelings and sensations, and not on opinions of those around. Be confident in self and your strength, move to your goals. Engage only in what you like.\nDon't strive for ideal and don't idealize others. Try realistically to look at world, and not through pink glasses. Learn on mistakes, make conclusions and move further."
            },
        ]
    },
    7: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Goal-orientedness" }, { label: "Leadership" }, { label: "Responsibility" }, { label: "Skill to lead" }, { label: "Recognition" }, { label: "Teamwork" }, { label: "Decisiveness" }, { label: "Activity" }, { label: "Ambition" }, { label: "Flexibility" }, { label: "Organizedness" }, { label: "Control of emotions" }, { label: "Respect for people" }, { label: "Optimism" }, { label: "Work capacity" }],
                description: "Male volitional energy. You are a leader and lead people. You are not bothered by appearance, much more important are internal qualities: goal-orientedness, ambition and decisiveness. You set clear goals before yourself and quickly reach them. For the sake of set task you are ready to search for ways to negotiate, know how to be flexible and diplomatic.\nYou throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you. These can be difficulties in life, diseases, financial complexities. Therefore it's very important to independently set yourself inspiring goals and immediately proceed to their realization.\nYou love activity, it charges you and gives additional resource. It's simply necessary for you to be in movement, starting from sport and travels to educational courses and spiritual practices.\nYour energy — entrepreneurial. You are independent and ready to take responsibility for self and team, know how to direct people, form strategy and build plans. You are easy on the rise, charge with optimism and energy everyone around. Main thing - don't doubt yourself, continue movement and then any your dream will come true."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Destructiveness" }, { label: "Desire to reach goal at any cost" }, { label: "Struggle" }, { label: "Aggression" }, { label: "Categoricalness" }, { label: "Overstrain" }, { label: "Workaholism" }, { label: "Dissatisfaction with achievements" }, { label: "Loss of goals and sense" }, { label: "Irresponsibility" }, { label: "Fear of leadership" }, { label: "Stagnation" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Emotionality" }, { label: "Non-realization" }, { label: "Uncertainty" }, { label: "Fussiness" }],
                description: "Main minuses by your energy — warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force and wish to reach it at any cost. Suffer from own workaholism and force others to work excessively. When reach set goal, still remain dissatisfied with result. Don't value what already have, always want more.\nAbsence of movement and challenge in life lead to stagnation. If you have no concrete goal, then start to lead meaningless struggle in one place, fuss much, commit unnecessary actions, which in the end only takes energy and doesn't lead to desired result. In the end lose interest, drop matter halfway and don't finish what was started.\nIf feel yourself non-realized and don't understand where to move, then this is a clear sign of energy in minus. Insufficient realization of your needs and goals can lead to frequent and serious problems with health.\nStrong emotionality repels people from you and prevents creation of harmonious relationships.\nIn character sacrifice may be present. You fear taking responsibility and role of leader. There may be problems with decisiveness, for a long time stay in apathy and in one place."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Go forward under any circumstances" }, { label: "Lead people, inspire for changes" }, { label: "Think through strategy, clearly see end goal" }, { label: "Born leader and manager" }, { label: "Ready to throw challenge and overcome obstacles" }, { label: "High activity and constant movement" }, { label: "Love sport" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Unfinished processes" }, { label: "Aggression" }, { label: "Excessive warrior-likeness" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nUse your potential for peaceful goals, direct energy to creation.\nRefuse from meaningless struggle and goals that don't motivate you.\nMake emphasis on your leadership qualities. Become an example to follow.\nManage your emotions and restrain warrior-likeness and aggressiveness.\nCarefully plan, write down stages of reaching goal, think through strategy.\nShare your achievements with people, inspire others.\nListen to self and trust intuition.\nDelegate obligations.\nEngage in spiritual practices: meditations, yoga, breathing.\nEngage in active sport.\nLead team behind you, take responsibility.\nLead active and healthy way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Use your potential for good. Try so that your activity works not only for your realization, but also brings benefit to other people. Don't divide world only into white and black. Hold under control your inner proclivity to warrior-likeness, learn to control your emotions and effectively cope with bouts of aggression. Remember that it's important to devote attention to inner and spiritual development on par with physical. Learn to listen to self and trust inner sensations. Learn to delegate: after all laziness, doubts, passivity, which can suddenly arise in you, are easier to overcome jointly with team. Learn to openly speak about your desires, feelings and try to convey your thoughts to those around."
            },
        ]
    },
    8: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The eighth energy, by its nature, doesn't yield to rigid definition of archetype. To the greatest degree it's corresponded by \"Balinese esotericist\".",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Reliability" }, { label: "Responsibility" }, { label: "Openness" }, { label: "Kindness" }, { label: "Honesty" }, { label: "Loyalty" }, { label: "Courage" }, { label: "Confidence" }, { label: "Logicalness" }, { label: "Insightfulness" }, { label: "Adaptability" }, { label: "Pedantry" }, { label: "Intuition" }, { label: "Diplomacy" }, { label: "Correctness" }],
                description: "Energy of justice and calmness. You are a peaceful and kind person, it's hard to get you out of yourself, however, if this happens, you become irritable and aggressive. For you it's important to find balance in all spheres of life. If balance is not there, then you will snap at those around. Also you can help others find their balance, for example, with help of meditations, spiritual practices and even usual heart-to-heart conversations.\nFor you it's important that everything is honest and by law. You always are in search of truth, but learn to do this through acceptance, kindness and open dialogue. Without aggression and excessive emotionality. You protect rights of other people and are ready to stand on side of the weak.\nPerceive whole world through prism of depth and logic. You dive into work processes or family situations with head, reach the essence, sorting out each detail.\nVery consistent, reliable, always keep your word and ready to take responsibility. You have leadership energy, you know how to communicate with people and form professional team."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Conflictness" }, { label: "Categoricalness" }, { label: "Aggression" }, { label: "Sharpness" }, { label: "Pride" }, { label: "Hot-temperedness" }, { label: "Loss of balance" }, { label: "Irresponsibility or hyper-responsibility" }, { label: "Self-criticalness" }, { label: "Touchiness" }, { label: "Manipulations" }, { label: "Lie" }, { label: "Revengefulness" }, { label: "Cruelty" }, { label: "Infidelity" }],
                description: "Full opposite of energy in plus. You in aggressive manner prove your rightness, which leads to frequent quarrels and conflicts with people. If in your life there are courts, then this is a clear sign of energy in minus. You need to learn to negotiate with those around. Often your pride prevents recognizing own wrongness.\nIf in life there is no balance, then you are thrown from extreme to extreme. You don't recognize existence of other points of view. Suppress people, often argue. Can behave sharply and hot-temperedly. Judge actions of others, refuse to understand them. Try to control loved ones and manipulate them.\nOften same situations in life repeat. Need to learn to notice them and try to lead energy out of minus. Always search for your balance.\nIf engage in own business, then legally and with payment of all taxes. If relationships, then open and honest. Be loyal to your partner."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Organization of people and processes" }, { label: "Skill to analyze information" }, { label: "Logical thinking" }, { label: "Creation of structure, order, system" }, { label: "Leadership and responsibility" }, { label: "Communicability, skill to negotiate" }, { label: "Skill of self-presentation" }, { label: "Honesty and openness" }, { label: "Sense of justice" }, { label: "Talent of harmonious manager: well understand when need to motivate employee, and when to punish" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Deception" }, { label: "Violation of law" }, { label: "Fraud" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't judge acts of other people.\nPreserve inner balance. One can use for this breathing practices, meditations, yoga.\nStudy deep knowledge and cause-and-effect links.\nObserve laws, be honest and open.\nKeep your word. Don't deceive and don't betray.\nDon't take credits, try not to borrow money.\nSearch for justice, but through wisdom and open dialogue.\nShow your true feelings to other people.\nConvey your knowledge further.\nCreate your family.\nLearn to see truth and hidden motives that drive people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to stick in everything to the golden middle and preserve neutrality. For you it's important not to achieve justice, but search for truth, hidden motives and processes that drive people and events. Develop in yourself and those around positive thinking and in each complex situation try to see life lesson and extract benefit for self. Don't interfere in arguments and proceedings without necessity. Stop judging anyone. Learn more and develop, be open to everything new. Don't try rather to convey just received information, you should live through it on own experience and let it through yourself."
            },
        ]
    },
    9: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "Ninth arcana likes to study self, surrounding world, and dive into depth of its matter: it's necessary for them to maximally sort out in questions interesting them.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Loyalty" }, { label: "Calmness" }, { label: "Seclusion" }, { label: "Learning new" }, { label: "Understanding people" }, { label: "Tactfulness" }, { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Carefulness" }, { label: "Attentiveness" }, { label: "Desire to convey knowledge" }, { label: "Modesty" }],
                description: "Sage. Closed energy. You love to dive into self and your thoughts. For you it's comfortable to lead a secluded way of life. It happens that you look a bit from above down on people. Your main task — don't close from world, but on contrary shine and convey your knowledge further, otherwise risk becoming a hermit.\nFrom birth you are endowed with special wisdom, you have rich life experience. Know how to interpret situations, give useful advice, thereby help others. You better than rest understand processes and see depth in everything. Subtly feel moods of people, know what's necessary to say and what words to pick. Tactful and attentive to those around.\nYou like solitude and silence, this way you quickly fill with energy. You are comfortable working in solitude or spending time on nature with very self.\nYou are a responsible person who thoroughfully approaches any question and carefully studies everything. You always can be relied on. You keep your word and fulfill promises."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Reservedness" }, { label: "Excessive asceticism" }, { label: "Dislike for self and people" }, { label: "Pride" }, { label: "Judgment" }, { label: "Unwillingness to help" }, { label: "Fear of solitude" }, { label: "Devaluing" }, { label: "Distrustfulness" }, { label: "Indiscriminate ties" }, { label: "Problems with money" }, { label: "Neglect" }, { label: "Fixation on material" }, { label: "Fear of relationships" }, { label: "Uncertainty" }, { label: "Non-realization" }, { label: "Idealization of people" }],
                description: "Secluded way of life leads to reservedness and closedness. You not rarely are alone. Go into asceticness, refusing from all material benefits. Deny money and achievements, what leads to problems with finances. You need to search for balance between spiritual and material.\nWisdom and rich experience provoke you to arrogance and pride, you judge people and any their actions. Not rarely consider self smarter and better. Refuse to help people, what even more drives you into solitude.\nYour energy is subject to impostor syndrome: you are indecisive and constantly doubt in your ideas, fear to convey knowledge to others, since consider that you have insufficient skills and competencies. In end don't realize self and your talents, become apathetic and alone."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Deep knowledge and life wisdom" }, { label: "Striving for learning" }, { label: "Conveying your knowledge" }, { label: "Know how to make process whole" }, { label: "Drawn to spirituality and cognition" }, { label: "Good intuition, high sensitivity" }, { label: "Leadership from position of sage and guru" }, { label: "Helping people" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Reservedness" }, { label: "Hermitry" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSearch for depth in everything you engage in and what fascinates you.\nStudy secret philosophical knowledge and use them for help to others.\nOpen your heart to people, share accumulated experience.\nWork with emotions and feelings, learn to speak openly and honestly.\nTrust people.\nDon't fear solitude, enjoy seclusion and silence.\nDraw strength in walks in solitude. Visit your places of power. More often spend time on nature.\nLearn to be loyal to self, listen to your intuition.\nLead diaries or notes of your thoughts, insights, epiphanies.\nCommunicate only with people pleasant for you and don't waste energy on empty communication.\nYou have huge potential for creation of your unique method or approach, which will have many followers.\nLook at past experience under different angle, extract lessons.\nReceive pleasure from sexual life and closeness with partner."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Any kind of activity which is to your liking will suit you, and you necessarily will succeed in it. Your strong side - intellectual labor. Develop not only logical thinking, but also intuition. Listen to your inner voice. Don't forget to share your knowledge and received information with surrounding people upon necessity. Don't fear solitude, because exactly in seclusion to you come main realizations and discoveries. Main thing - don't go into self for long. Learn to let go of grudges and mistakes of past, with open heart accept new experience into your life. To trust from side of people, answer with same and open your soul. At lack of strength and life energy, it would be not bad to rest on nature."
            },
        ]
    },
    10: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "For tenth energy lightness and joy is important, as well as necessity of constant movement.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Inspiration" }, { label: "Luck" }, { label: "Openness" }, { label: "Leadership" }, { label: "Adventurism" }, { label: "Ideality" }, { label: "Success in matters" }, { label: "Persistence" }, { label: "Intuition" }, { label: "Movement" }, { label: "Sociability" }, { label: "Communicativeness" }, { label: "Kindness" }, { label: "Optimism" }],
                description: "Energy of luck and inspiration. Lucky one in life. Rules and systems are not important for you, you act only from flow. For your energy constant movement and development is important, you generate many new ideas. Can be a leader, but don't strive for this. You are open to new people, knowledge and experience.\nDon't bother over details and don't like routine. Any idea can inspire you, you charge up, start movement and thereby attract success to self. To you suddenly right people are encountered, unexpectedly money comes and circumstances turn out successfully. Main thing, don't deceive and don't act from mercenary goals. And also don't search for easy money or fast earning.\nMaintain state of inspiration — this will strengthen your energy. Engage in favorite matter, spend much time with like-minded people, communicate with different people. In any circumstances remain cheerful and open. If there is no inspiration and movement, then you start to lose luck, become apathetic and risk going into depression.\nKnow how to relax and let go of situation, don't worry over trifles. This only strengthens your energy and attracts even more opportunities into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Heaviness" }, { label: "Tension" }, { label: "Unwillingness to move" }, { label: "Laziness" }, { label: "Passivity" }, { label: "Apathy" }, { label: "Suggestibility" }, { label: "Worries" }, { label: "Pessimism" }, { label: "Disrespect to people" }, { label: "Inconsistency" }, { label: "Unsystematicness" }, { label: "Stubbornness" }, { label: "Harmful habits" }, { label: "Lack of independence" }, { label: "Debts" }, { label: "Fears" }, { label: "Worrisomeness" }],
                description: "Your main minuses — this is absence of movement. You are initiative-less, no ideas and desire to move forward to your goals. As consequence, you lose inspiration and luck. Harmful habits and problems with money can form.\nIf there is no movement in life, then you go into apathy. Constantly whimsical, judge those around and complain on life. Fears - one more manifestation of your minuses. You fear to take for new matter, don't believe in that luck will be on your side.\nMain rule for you: even if lazy, all the same continue at least some movement. This can be whatever: go for walk in park, start reading book, meet with friends or sign up for courses, which you for long time postponed. Activity will lead your energy into plus and all circumstances themselves will start to turn out in successful way."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Luckiness and luck in any matters" }, { label: "Lightness and openness" }, { label: "Kindness" }, { label: "Know how to change reality and conditions under self" }, { label: "You are in the flow" }, { label: "Good intuition" }, { label: "Inspire people" }, { label: "Many friends, sociability" }, { label: "Ideality" }, { label: "Quick on the uptake" }, { label: "Adventurism" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Fixation on money" }, { label: "Heavy routine work" }, { label: "Absence of inspiration" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAvoid stagnation, eradicate laziness and motivate self to move forward.\nTravel, go on spontaneous trips.\nEngage in creativity.\nTake part in interesting projects which inspire you.\nCommunicate with different people, make acquaintances.\nFind for self goal in which you can apply all accumulated experience.\nRefuse from controversial offers which promise easy money.\nConcentrate on your main goals, don't be distracted by secondary tasks.\nLet go of hypercontrol, stop worrying.\nLive in moment here and now.\nCare about well-being of your family.\nRegularly rest, relax: spa, bath with salt, massage, sauna.\nWatch inspiring films, read motivational books.\nLead healthy way of life.\nWork over self-discipline.\nBuild plans and record them in diary. Engage in practices: meditations, yoga, breathing.\nLearn to competently plan your finances.\nReceive pleasure from your activity.\nListen to self and your desires.\nWork in team, inspire and support each other.\nAccept any help.\nVoice aloud your desires and intentions.\nGo your way.\nBe grateful for everything what you already have, and at failure be grateful for experience.\nDevelop your individuality and independence."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Luck will accompany you in everything if you do everything correctly and follow your life path. Trust your fate, listen to hints of your inner voice and follow them. Don't try to radically change something in your life, otherwise luck can turn away from you and difficulties will come. Think positively, relate to everything easily. You need a firm inner core, which will help you in preserving soul equilibrium at any circumstances. Learn discipline and planning. It would be not bad to start a diary and record there your thoughts and realizations. Be active, use to full your opportunities, preserving your individuality, independence and faith in success."
            },
        ]
    },
    11: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "Personalities endowed with this energy possess the gift of seeing potential in people and projects, they are ready to invest their forces to help this potential unfold.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Responsibility" }, { label: "Capacity for work" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Adaptability" }, { label: "Practicality" }, { label: "Curiosity" }, { label: "Individuality" }, { label: "Organizational skills" }, { label: "Skill to lead behind self" }, { label: "Charisma" }, { label: "Sincerity" }, { label: "Integrity" }, { label: "Desire to create new" }, { label: "In what is my potential?" }, { label: "What idea can be promising?" }, { label: "How can I reveal potential of project or person?" }],
                description: "Masculine volitional energy. You are a person with strong character and internal core. Love for work and huge life energy motivate you to move forward. You are practical, search for benefit in everything and build processes maximally effectively, avoiding unnecessary routine and meaningless actions. Constantly study new directions, very curious.\nPossess ability to see and reveal potential: in advance see perspective in project or person, apply efforts for its revealing. You know exactly what idea can shoot in future and on what need to make a stake.\nTo reveal this energy, ask yourself questions:\nYou love to be in first place and feel self a winner. Ready to take responsibility and initiative in your hands, possess leadership entrepreneurial energy. Always strive for individuality, being a charismatic and bright personality. You have good physical strength. Actively engage in sports, you have strong health. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Workaholism" }, { label: "Overstrain" }, { label: "Ignoring problems" }, { label: "Impatience" }, { label: "Aggressiveness" }, { label: "Irritability" }, { label: "Suppressing others" }, { label: "Laziness" }, { label: "Whining" }, { label: "Rudeness" }, { label: "Powerlessness" }, { label: "Weakness" }, { label: "Indecisiveness" }, { label: "Conflictness" }, { label: "Hysteria" }, { label: "Greed" }, { label: "Problems with mom" }, { label: "Problems in sex" }],
                description: "Due to excessive workaholism you overstrain too much at work and rest little. Press on people and force to work beyond measure. Become impatient, lead self audaciously and rudely. Or on the contrary, lack of will power and decisiveness force you to be lazy and complain on life, what leads to weak-characteredness.\nYou fear conflicts and try to avoid them, but on other hand cannot control your emotions and start to quarrel without visible reasons. Happen to be petty and greedy.\nLikely, in childhood there was strong role model in person of mom, who unconsciously suppressed you or self and her desires, what led to tense relationships between you.\nYou don't accept your body and sexuality, constantly ill, lead unhealthy way of life and are shy of your appearance."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "You see potential and future trends" }, { label: "Good physical form and endurance" }, { label: "High capacity for work" }, { label: "Inspire and motivate people" }, { label: "Leadership" }, { label: "Can engage in healing" }, { label: "Possess large life energy" }, { label: "Overcome obstacles" }, { label: "Volitional character" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Aggressiveness" }, { label: "Excessive workaholism" }, { label: "Impatience" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to manage your strength, use it for good.\nEngage in sports and lead active healthy way of life.\nCommunicate with successful people, get inspired.\nLearn to be in state of here and now.\nManage your emotions.\nWatch after voice and speech, don't use imperative tone.\nThink through strategy, record plans and follow them.\nBe calm and patient.\nDon't judge unhurriedness of others.\nBecome leader in your sphere.\nLearn to yield and go for compromise.\nInteract with people, and not suppress.\nMore often be on nature.\nRest, relax, meditate."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to timely relax and rest. Engage in development of body and alternate with full relaxation. Don't press and don't rush people, accept them such as they are. Not everyone has so much energy and life force, how much it is in you, don't forget about this. Don't overstrain, delegate part of your matters, master time-management. Control flashes of anger. Develop spiritually to learn to manage your energy. It's not worth going to result by any way and achieve everything by force, otherwise you will create for self enemies or obstacles in empty place. Grow up, gain independence and “cut umbilical cord” in relationships with mom. Desirably not to share your plans with her - if she will not approve your choice, you will not be able to implement what was planned."
            },
        ]
    },
    12: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "Twelfth energy means “suspendedness”. Person sees the world as if upside down, differently, in other way, not like others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Compassion" }, { label: "Support" }, { label: "Healing" }, { label: "Generation of ideas" }, { label: "Self-discipline" }, { label: "Openness" }, { label: "Love for learning" }, { label: "Easy resolution of problems" }, { label: "Amorousness" }, { label: "Inventiveness" }, { label: "Individuality" }, { label: "Love for nature" }, { label: "Sensitivity" }],
                description: "You look at world differently, not like everyone. You have a different look on processes and events. Know how to see and interpret signs and symbols which are understandable only to you. Love to do everything in your own way, creatively and innovatively approach resolution of any task, so, as no one did this before. You are a bright individuality, see self as special and stand out among others.\nYou are an idea-person. Well-read, can with ease explain even the most complex information. Work in flow, come up with ideas on the go and love to improvise. This is your element. Feel people, energy, space well. Extremely inventive, what at times helps to find non-standard way out of difficult situation.\nYou have an open and kind heart. Responsive and ready to always come to help. At times can go into victimhood, forgetting about self and your desires. You need to learn to say people “no”.\nYou like to make people's lives better, what brings internal satisfaction. More often act not from logic, but in sincere impulse of soul. Know how to serve selflessly, not demanding anything in return. Accept people such as they are."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Victimhood" }, { label: "Touchiness" }, { label: "Depressions" }, { label: "Negativity" }, { label: "Inability to refuse" }, { label: "Desire to be good" }, { label: "Doubts" }, { label: "Non-confidence" }, { label: "Need for love" }, { label: "Strong attachment to people" }, { label: "Panic" }, { label: "Self-destruction" }, { label: "Subconscious feeling of guilt" }, { label: "Lack of money" }, { label: "Dislike for self" }, { label: "Illusions" }],
                description: "You are in the role of victim. It seems to you that you do everything for people, but don't get anything in return. Much you take close to heart, extremely vulnerable and touchy. In aggregate all this can lead to self-destruction: problems with alcohol, dependencies, depression and solitude.\nAt times forget about self and your desires. Try to be good for everyone. Don't know how to say “no” to other people. Very dependent on opinion of those around, constantly wait for praise and approval. If you don't get them, start to blame and hate self. Accept self and people such as they are. Don't build illusions and expectations.\nThere can be problems with creativity and unique look on life. It's difficult for you to realize your own ideas, often stay in creative crisis. Don't know how to promote your vision, doubts and non-confidence in self interfere. Hence non-realizedness.\nValue and love self, care about your comfort and put your desires in priority."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Vulnerability" }, { label: "Creative non-standard thinking" }, { label: "Many innovative ideas" }, { label: "Strong creative energy" }, { label: "Selflessly help others" }, { label: "Feel people well" }, { label: "Strong intuition" }, { label: "Musical abilities" }, { label: "Bring novelty and your unique vision into projects and work" }, { label: "Rich imagination" }, { label: "Know how to improvise" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Victimhood" }, { label: "Non-confidence" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to look at habitual things in a new way.\nDevelop creativity.\nLearn everything unusual and interesting.\nDevelop writing skills.\nLearn to non-standardly approach resolution of tasks.\nSay \"no\" in time and don't take on self someone else's work.\nClearly build personal boundaries.\nDon't devalue your labor, set fair price.\nRaise self-esteem, strengthen faith in self.\nMake yourself presents and learn to live for self, and not only for sake of others.\nIt's important to love self and exit from state of victim.\nDo kind deeds not expecting approval.\nSupport social projects, help those in need, engage in volunteer activity.\nFigure out why you attract negative situations in which you are offended, not valued or used."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Gift love and care, and also learn to accept them. Help others, but also manage to develop, realizing your creativity and participating in unusual projects. This will charge you with energy and positive. Help only those who needs this, in this consists your destiny. But don't try to please everyone, this will lead to tiredness, burnout and depression. It's important for you to let go of people and situations, not hold on to old, control your life. Don't be a victim and know how to stand up for self. Don't act to detriment of self, help only from state of filledness and abundance. Don't be shy to take money for your work and learn timely to refuse. Exit from state of longing and apathy. In this creativity, physical activity and travels will help you."
            },
        ]
    },
    13: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "Thirteenth energy doesn't have a specific archetype, it is structureless.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for life" }, { label: "Bravery" }, { label: "Activity" }, { label: "Fearlessness" }, { label: "Inspiration" }, { label: "Desire for changes" }, { label: "Straightforwardness" }, { label: "Honesty" }, { label: "Unpredictability" }, { label: "Leadership" }, { label: "Adaptability" }, { label: "Sexuality" }, { label: "Efficiency" }, { label: "Practicality" }],
                description: "You are an interesting and unusual person. You are surrounded by atmosphere of mysteriousness and mysticism. Structureless esoteric energy.\nYou are capable to transform thinking of people or working processes. Inspire into new, help overcome difficulties and non-simple events. It's important for you to constantly change something in your life, receive new experience, go to the end, having refused from fears and doubts. Global transformations interest you which will help make life better.\nYou know how to refuse from old and obsolete, that what already long ago doesn't work. You don't like predictability. Any stability you break and change under yourself.\nIntersted in different aspects of life, curious and creative, easily get involved in everything new and unusual.\nAlways hold self confidently and will not get lost even in extreme situation. Easily concentrate, and in complex conditions act without panic. You have dulled fear of danger, therefore extreme types of sport can attract you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Harshness" }, { label: "Pessimism" }, { label: "Aggressiveness" }, { label: "Fear of death" }, { label: "Recklessness" }, { label: "Fussiness" }, { label: "Timidity" }, { label: "Passivity" }, { label: "Stagnation" }, { label: "Coldness" }, { label: "Calculativeness" }, { label: "Carelessness" }, { label: "Riskiness" }],
                description: "If energy is in minus zone, then you fear changes. It's fearful for you to go into new, you get stuck on one place and don't realize your talents. Clutch at past and already obsolete. Accumulate junk at home, stack, preserve and fear to lose.\nIn minus doubts in self appear, fears, unnecessary fussiness. If you will not act independently, then your energy self will start to attract forced changes: dismissals, loss of loved ones or money and so on.\nOn other hand, you can lead self harshly and aggressively. Try to bring changes forcibly where they are not ready yet for them. There can be mood swings, excessive emotionality. Constantly change work, cannot choose something one. Can take for several matters at once and not a single one lead to end.\nLove to stay on edge of life and death, go for unsubstantiated and at times stupid risk. Situations are not excluded where you can turn out on edge of life and death: accidents, illnesses, clinical death."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Readiness to start everything from clean sheet" }, { label: "Easily refuse from past, change and transform reality" }, { label: "Not afraid of death, can work in extreme conditions" }, { label: "Preserve clarity of thinking even in critical situations" }, { label: "Perceive any crisis as point of growth" }, { label: "Search for new alternative paths" }, { label: "Create something revolutionary" }, { label: "Productive and multi-tasking" }, { label: "Pull people out of comfort zone" }, { label: "Can in any system find weak link and make it more effective" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Resistance to changes" }, { label: "Fears and doubts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSet order in matters, things and relationships.\nFix in writing your ideas, plans and dreams.\nEngage in creativity.\nGet rid of that what doesn't lead you to result.\nDon't take for multitude of matters at once, concentrate on something one.\nLead any matter to end.\nLearn to be more calm and peaceful.\nLive here and now, get rid of fussiness.\nStop being afraid for relatives and close ones, as well as excessively worry.\nBe joyful and optimistic.\nExperiment in all spheres: in relationships, at work, with style in clothing, interior of home and so on.\nIf you risk, then justifiedly.\nWork over positive thinking, search for pluses even in the most complex situations.\nRecord good what happened with you during day.\nBravely start new stages in your life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "From birth you are endowed with excellent memory, strength and skill to concentrate and lead self collectedly in complex situations. You easily can teach people that what you know yourselves, since you understand and accept logic of happening events. One can try self in role of rescuer or crisis-manager for that to ecologically apply your interest to situations on edge. It's not worth going for unjustified, reckless risk, but better to apply your opportunities for help to people. Don't try to interfere into course of events which even so happen harmoniously, without your participation. Avoid imposing your opinion on surrounding people. Refusal from old and construction of new should be planned and expected, both in system self, and in life of people. Learn to listen and hear self, your internal sensations. Learn to control emotions, as well as live by your own energetic cycles. Allow yourself from time to time to relax and value your life."
            },
        ]
    },
    14: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "First orientation of this energy — creativity, creation of works of art.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Softness" }, { label: "Sensitivity" }, { label: "Intellectuality" }, { label: "Soulfulness" }, { label: "Healing" }, { label: "Morality" }, { label: "Wisdom" }, { label: "Calm" }, { label: "Harmoniousness" }, { label: "Modesty" }, { label: "Patience" }, { label: "Decency" }, { label: "Nobility" }, { label: "Delicate taste" }, { label: "Refinement" }],
                description: "Soft creative energy. You are a refined nature who possesses strong spiritual and healing energy. You live and create in flow.\nYou inspire people and charge them. Energy can manifest through creativity, creation and spirituality.\nFirst variant — creation of your art, own creative magic. You like to create in solitude and calm. You connect to flow, and ideas themselves come into your head. In you there is depth and internal peace. You understand own desires and strivings. Inside you there is always harmony.\nAlso you possess internal core and strength of spirit. Can be leader among creative people, unite them around into collective to create together.\nSecond variant — this is psychology, spirituality, healing and esoterics. You study secret esoteric knowledge. You have powerful flow energy. You delicately feel people and know how to help them. Possibly, there are abilities for healing. High intellect.\nOften live by mood and inspiration. You are a soulful person with whom it's always interesting to talk on different themes. Constantly study new and share knowledge with others.\nYou have moral landmark to which you strive. You are a decent and noble person: communicate with people honestly and openly, not deceiving either self or others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Callousness" }, { label: "Soul-less-ness" }, { label: "Attachment to material" }, { label: "Touchiness" }, { label: "Impulsiveness" }, { label: "Infantilism" }, { label: "Going into extremes" }, { label: "Desire to punish and blame" }, { label: "Rudeness" }, { label: "Capriciousness" }, { label: "Immoderation" }, { label: "Greed" }, { label: "Vulnerability" }],
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme, at times you yourself cannot decide what you want. Excessively sensitive. You are easy to offend and touch. Don't perceive criticism towards self, even constructive.\nOr, on contrary, you manifest harshness, daring and callousness. You are closed from people. Lead self rudely and often happen to be impulsive. Can get angry, drop everything, and then regret about taken decision.\nThere is risk to acquire strong dependency or harmful addictions.\nToo much hold onto past, don't know how to forgive and let go. Not rarely there are periods of emptiness and non-belief in own forces and possibilities.\nYou get attached to money and material values. Don't know sense of measure, you always have little of everything. Don't realize self in creativity."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Not valuing what you have" }, { label: "Impatience" }, { label: "Touchiness" }, { label: "Vulnerability" }, { label: "Greed" }, { label: "Whining" }, { label: "Rudeness" }, { label: "Live in state of flow" }, { label: "Creative skills" }, { label: "High sensitivity" }, { label: "Calm and trust to world" }, { label: "Healing: know how to help person" }, { label: "High level of intellect" }, { label: "Deep wisdom which you can transmit through creativity" }, { label: "Rich imagination" }, { label: "Internal nobility and honesty" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nExpress emotions openly, don't suppress them.\nFight with bad habits, lead healthy way of life.\nManifest honesty and openness in matters and with people.\nLearn moderation and patience.\nReceive high from uncertainty and unpredictability.\nMeditate, engage in spiritual practices.\nInspire self through study of art: music, literature, painting, theater.\nRest, take hot bath, visit baths, saunas, aroma-steaming.\nWalk more often in parks and outside city.\nLeave for new places.\nVisit your places of power.\nMaster new directions for self.\nCombine creativity and income.\nListen to your internal voice, develop intuition, take decisions based on internal sensations."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Delicate soul organization is given to you for that to you could find beautiful even in common things. You can engage in creativity to bring your vision to other people. It's best of all to write verses and create musical works in solitude, but it's important not to close in self. It's necessary for you to maintain connection with surrounding world, where you draw inspiration.\nGet rid of negative emotions, nourish your reason and cleanse soul. Nourish by positive energy from works of art. Spend more time by water. In general, all contacts with water are very useful for you.\nFight with dependencies and your weaknesses, avoid immoderation in everything. Always believe in self and your creative possibilities, develop them."
            },
        ]
    },
    15: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "Characteristic feature of person possessing fifteenth energy is that those surrounding him often experience irritation, anger and hatred during interaction with him.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energetic" }, { label: "Positive" }, { label: "Love for entertainment and pleasures" }, { label: "Love for material values" }, { label: "Good intuition" }, { label: "Clairvoyance" }, { label: "Wisdom" }, { label: "Understanding of essence of things" }, { label: "Luck" }, { label: "Fascination" }, { label: "Attractiveness" }, { label: "Style" }, { label: "Oratorical abilities" }, { label: "Openness to trips and adventures" }, { label: "Compassion" }, { label: "Kindness" }, { label: "Ability to help others" }, { label: "Sexuality" }],
                description: "You have a strong energy of temptation. X-ray person: you see all subtleties and defects in another person or work process, you know how to fix it and make it better. You can trigger people, call up negative emotions and lift their internal work-throughs outside.\nYou help to fix self and become better, but do this in your special way — through temptations. However you also are subject to different temptations. You love pleasures, luxury and comfort. You love money and value benefits, but don't get fixated on them. Know how to hold balance between material and spiritual.\nYou know how to find approach to person, immediately see where to press and where his painful points are located. You are diplomatic, know how to negotiate.\nYou have good connection with internal voice, intuition and higher forces. Possess gift of clairvoyance. Know how to charge and direct other people. Strong esoteric energy. You are possessor of deep knowledge, therefore they often turn to you for advice. Always look good, dress stylishly, attract people by external appearance and bright charisma. Sexual and charming.\nMuch internal energy, you want to create and create, generate ideas, move forward to your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Aggressiveness" }, { label: "Jealousy" }, { label: "Envy" }, { label: "Vulnerability" }, { label: "Dependencies" }, { label: "Arrogance" }, { label: "Thirst for power" }, { label: "Pride" }, { label: "Fixation on material" }, { label: "Suppression of people" }, { label: "Rigidity" }, { label: "Deception for sake of profit" }, { label: "Greed" }, { label: "Selfishness" }, { label: "Betrayal" }, { label: "Black magic" }, { label: "Excessive control" }, { label: "Manipulations" }, { label: "Stubbornness" }, { label: "Irritability" }, { label: "Criticality" }],
                description: "You can fall into different dependencies and temptations (alcohol, drugs etc.).\nManipulate people, press on their weak points, know how to touch and wound. Deceive in selfish goals. Can lead self arrogantly, want to possess power over people and try to suppress. Critically relate to opinion of others, not ready to hear and listen, dispute, lead self stubbornly, get irritated by any reason.\nIn character there are selfishness and pride. You think only about yourself and your desires, putting other people as nothing.\nLove for luxury and excessive striving for material benefits make you greedy fixated on money, what interferes with revealing of talents.\nCan excessively guard near ones, even manifest rigidity and aggression to them. Not rarely there are situations when you betray person close to you for sake of temptations and desires."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "You see weakness in people and help them overcome them" }, { label: "You establish ties, know how to negotiate" }, { label: "Can engage in healing" }, { label: "Easily earn money" }, { label: "See subtleties and details which need to be fixed in anything" }, { label: "Charm, sexuality, attractiveness" }, { label: "Good manipulator" }, { label: "Sense of humor" }, { label: "Helping people become better" }, { label: "Powerful intuition" }, { label: "Oratorical abilities" }, { label: "Bright charisma" }, { label: "Strive for or possess power" }, { label: "Easily exit from any situation" }, { label: "See people through: for this they can love and hate you" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Dependencies" }, { label: "Manipulations" }, { label: "Greed" }, { label: "Aggression" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to see world and people through prism of good.\nDevelop spiritually.\nWork over internal aggression.\nGet rid of cynicism and selfishness.\nAccept and forgive people, learn to be flexible.\nOpen your heart for love, learn to gift it to others.\nHelp people become better.\nLearn to relax and trust.\nDon't manipulate people.\nEngage in spiritual practices, yoga, meditation.\nActivate your sexual energy.\nEngage in creativity.\nFor men it's good to engage in martial arts, take care of self and find one's style.\nTake care of your body, pamper self.\nLearn to ecologically get rid of negative emotions.\nCorrectly tell people about their defects. Free self from bad habits and harmful dependencies.\nWorthily pass all trials by large money.\nWith ease accept and let go money.\nBe grateful for that what already you have.\nHold balance between spiritual and material."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your unique abilities need constant development, never stop on achieved. Shift focus of your attention from material values to spiritual development. Learn to see in people not only their weaknesses and vices, but also their strong sides. Accept events happening in your life unconditionally and try to preserve positive in any situation. Always observe balance \"take-give\" if you are aimed at further development and prosperity. Don't criticize people for their weaknesses, but on contrary, support them and help grow. Avoid use of your strength for control over people. Learn to easily let go unpleasant situations and abstract from them. Accept the fact that every person is free to act and live proceeding from one's views and beliefs, even if they are far from truth."
            },
        ]
    },
    16: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "In plus such person can create new, often thanks to destruction of old.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Spirituality" }, { label: "Clairvoyance" }, { label: "Energetic" }, { label: "Strength of spirit" }, { label: "Innovation" }, { label: "Leadership" }, { label: "Determination" }, { label: "Adventurism" }, { label: "Adaptability" }, { label: "Bravery" }, { label: "Development" }, { label: "Self-knowledge" }, { label: "Creativity" }, { label: "Creation" }, { label: "Honesty" }],
                description: "You live here and now, look differently at things and events. Thanks to life experience you are capable to change world-view and extract important lessons from past.\nStrong daring energy. You are not afraid to go into new, open to changes, thanks to what you receive positive changes in life. You destroy old, dishonest, insincere, not real and create on this place new. This can be new work, completion of old relationships, change of place of residence and so on.\nYou are a self-confident person who stands firmly on feet. Possessor of powerful strength and energy. Can inspire others, lead behind self, motivate for changes. Good ideological leader and mentor will come out of you. You have a kind and honest heart, ideas are always driving you, directed at help to others. You don't get fixated on money and material, concentrating on your ambitious ideas and their realization. Easily adapt to any conditions, can even live in asceticism if goal requires this.\nAlso you have non-standard thinking and rich imagination. Strong flow energy: you generate creative ideas which move you forward. Love to reflect, search, try. Constantly develop and cognize new. Spiritual energy: you like deep esoteric knowledge, different practices, unusual experience. You want to try everything on yourself. Boldly experiment and search for your own."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Health problems" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Hot-temperedness" }, { label: "Destructiveness" }, { label: "Lack of spirituality" }, { label: "Attachment to old" }, { label: "Chaoticness" }, { label: "Pull to dangerous" }, { label: "Unmanageability" }, { label: "Fraud" }, { label: "Deception" }, { label: "Dependencies" }, { label: "Helplessness" }, { label: "Vulnerability" }],
                description: "First important minus by your energy — excessive rigidity. You cut from shoulder, say in face of person everything what you think, happens to be incorrect and categorical. Aggressively go break-through and often over heads for sake of your goal. Bear destruction instead of creation.\nMaterial values and money drive you, you refuse from spiritual and can fall into dependencies. Start to deceive self and people. If you now have problems with health, then this is clear sign of energy in minus.\nOther side of minus energy — this is sluggishness, indecisiveness, doubts and strong attachment to old. You fear changes, not ready to go into new, it's scary for you to manifest and open to people. You don't have ideas, don't understand where you want to move. Not ready to lead people, refuse from leadership and ambitions.\nIf you won't develop, then life will force you to do this in sharp, unpredictable and sad way — through loss of work, near person, money and so on."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Doing something new, innovation" }, { label: "Leadership" }, { label: "New vision" }, { label: "Renew, transform for good, create" }, { label: "Lead behind self people, inspire for changes" }, { label: "Powerful energy" }, { label: "Creativity" }, { label: "Love for new" }, { label: "Confidence, calm" }, { label: "Feel the flow, strong intuition" }, { label: "Easily adapt under any conditions, ready for asceticism" }, { label: "Spirituality" }, { label: "Not attached to material, move for idea" }, { label: "Optimism, positive thinking" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAct decisively and boldly, don't doubt in self.\nWork over self, become better than yesterday.\nLearn to live consciously, be grateful for everything what already you have.\nRefuse from old beliefs and settings.\nCleanse your space, do decluttering, conduct cleanings.\nTravel, study new cultures, search for inspiration.\nPractice various austerities.\nMeditate, engage in yoga, read spiritual and esoteric literature.\nWork over internal aggression and free self from negative emotions.\nStrengthen your physical health, engage in sport.\nTake care of your body: spa, baths, massage, saunas.\nCalmly and with gratitude accept any changes in life.\nGo out to nature: to mountains or to sea.\nChange environment if it starts to pull you down.\nDevelop and change your life for better.\nShare new knowledge with people, be open, trust.\nNot to regret about past, free self from old.\nLearn to alternate activity and peace."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Try to support your physical body, leading correct way of life, and, at this, don't forget about spiritual development. Don't cling to old, boldly go forward, towards changes. Learn to trust people, open your heart, gift them your love, share your knowledge and experience. Having chosen your path, cast off all doubts and boldly go forward. You will be able to lead behind self many people if your path is correct. Develop in self skill of awareness, easily let go old: people, things, relationships, settings. Leave past in past, don't look back. Learn to see signs which fate and Universe send, listen to self and your internal voice. It is under your power to launch new cycles of life, awaken people, show habitual things in different light. Use your abilities for good, as well as, transmit your spiritual experience."
            },
        ]
    },
    17: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "People with such energy possess a strong ego, they strive for leadership and don't wish to stay in shade.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Desire to be in center of attention" }, { label: "Brightness" }, { label: "Emotionality" }, { label: "Artistry" }, { label: "Charm" }, { label: "Love for self" }, { label: "Lightness" }, { label: "Sensitivity" }, { label: "Intuition" }, { label: "Individuality" }, { label: "Imagination" }, { label: "Optimism" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Openness" }],
                description: "Soft creative energy. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for a dream and listen only to the internal voice.\nYou shine for those around you, you are in the center of attention, you are admired and you are imitated. You like publicity and fame. You don't like to be in the shade and in second roles. Ambitiousness and large-scale goals motivate to move forward, to create, to produce and to demonstrate self and one's talents to the world.\nYou have an attractive appearance, you take care of self and one's body. Often you receive compliments and attract gazes.\nYou possess a unique imagination and creative thinking. You know how to create art which will please many. You draw inspiration from nature and from communication with like-minded people.\nYou are a kind and open person. You can heal others, thanks to your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics. You study everything new and try it on yourself."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Unrealizedness" }, { label: "Lack of confidence" }, { label: "Pride" }, { label: "Stardom" }, { label: "Vanity" }, { label: "Fixation on material" }, { label: "Withdrawal from reality" }, { label: "Deception" }, { label: "Illusions" }, { label: "Selfishness" }, { label: "Fear of unknown" }, { label: "Problems with sexuality" }],
                description: "First variant of manifestation of minuses by energy — this is unrealizedness. You stay in shade, don't reveal your talents, doubt in self and your forces. Don't understand where to move, what to engage in and what inspires you. You are shy to stay in center of attention, don't like to be in sight and lead a closed way of life. Confident in self, you fear everything and refuse to implement your dream. Stay in creative crisis.\nSecond variant — pride, vanity, star sickness. You go away from reality, start to get stuck up, behave with people selfishly, command, manipulate, often advance your requirements and conditions. Not ready to go for compromise. Get fixated on your success, money and material benefits, forgetting about spiritual. Live in own illusions, can fall into dependencies: alcohol, drugs, promiscuous way of life and so on.\nDeceive self, thinking that with other people something is not so instead of that to search for root of problem in self.\nDon't accept your appearance, consider yourself an unattractive and ugly person. Often there are problems with sexuality. Shy of self and one's body."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Creative abilities" }, { label: "Uniqueness" }, { label: "Own vision" }, { label: "Bright charisma" }, { label: "Rich imagination" }, { label: "High sensitivity" }, { label: "Publicity, openness, trust" }, { label: "Strong sexual energetics" }, { label: "Positive thinking" }, { label: "Individuality" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nWrite down your goal and in what way you can implement it.\nShare your thoughts and ideas with close people, receive support from them.\nReveal your creative potential, show to the world your talents.\nEngage in creativity, create, invent, manifest.\nFind favorite matter which will inspire you.\nFollow impulses of your heart, develop intuition.\nCommunicate with like-minded people, get acquainted with different people, be open to communication.\nDon't fear to experiment, be bright.\nVisit parties and events, go out into world.\nDress up, think through your image and style.\nAccept your uniqueness, share it with the world.\nRefuse from pride and vanity. Be open, gift love.\nAllow self to be successful and famous.\nBecome example for many, inspire people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Live real life, but don't refuse from your creative abilities. Develop your strong sides, but remember that success is based on diligence and hard work. Don't forget to set clear goals before self, but choose that activity which is according to your soul. If you choose a creative profession, for example: actor or singer, then do this not so much for sake of fame, but for help to people. In your roles and images you can show that, what's worth avoiding in reality, you give life lessons. Look at various situations with optimism and always preserve calm. Avoid extremes: learn to overcome periods of despondency and absence of faith in own forces. For support of your physical body, as well as soul equilibrium, choose balanced nutrition, regular engagements in sport and rest in nature. Choose moderation in everything."
            },
        ]
    },
    18: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy that is associated with the astral body, intuition, sensing.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Mystery" }, { label: "Intuition" }, { label: "Materialization of thoughts" }, { label: "Liberation from fears" }, { label: "Strong imagination" }, { label: "Attractiveness" }, { label: "Sensitivity" }, { label: "Versatility" }, { label: "Success" }, { label: "Striving for beauty" }, { label: "Fast learning ability" }, { label: "Artistry" }, { label: "Positive thinking" }, { label: "Creative abilities" }, { label: "Fast exit from negative" }, { label: "Interest in knowledge" }],
                description: "Structureless soft energy. Your energy is related to deep immersion. You possess strong intuition and the ability to attract what you desire, so it is so important for you to think positively and fight fears, otherwise you will attract them into your life.\nYou like to study everything related to the unconscious and magical, you are fond of spiritual and esoteric practices. You are mysterious and attractive to other people, you like to decorate your body: tattoos, piercing, bright hair, unusual appearance, etc.\nYou can calmly \"fly away\" from the external, real world and go into your subconscious. Often you are in your own fantasies and thoughts, not noticing the surrounding environment. You prefer everything abstract, creative, and unusual. Structure, system, and order are not for you.\nYou create your magic in your work or creativity, think non-standardly, are fond of esoterics, meditations, tarot, etc. You go your own way and do everything in your own way, not paying attention to the opinions of other people. You listen only to your internal voice.\nYou are a soft and kind person, easily adapt to any conditions. You have a strongly developed sensing of yourself. You know how to help, what to say and do in a specific situation. People often turn to you for advice. You are interested in different directions of activity, whatever you take up, everything works out easily and without strain. You have a strong connection with the Moon and lunar cycles. The full moon has an especially strong impact on you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Withdrawal from reality" }, { label: "Addictions" }, { label: "Depressiveness" }, { label: "Anxiety" }, { label: "Hypocrisy" }, { label: "Doubts" }, { label: "Closedness" }, { label: "Victim state" }, { label: "Destruction" }, { label: "Inaction" }, { label: "Unrealizedness" }, { label: "Vindictiveness" }, { label: "Resentfulness" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Indecisiveness" }, { label: "Whining" }, { label: "Anger" }, { label: "Touchiness" }, { label: "Inertness" }, { label: "Pessimism" }, { label: "Loneliness" }, { label: "Non-acceptance of sexuality" }, { label: "Magic to harm others" }],
                description: "The first direction of minuses by your energy is excessive closedness and withdrawal from reality. It can reach addictions (alcohol, drugs, etc.) and depressions. You are capable of immersing yourself in your thoughts so much that you refuse to contact the real world. Sometimes you behave hypocritically, smiling to the face, but inside experiencing indignation and condemnation towards the person. You may like gossip.\nThe second direction of minuses is fears. You constantly doubt, fear, cannot make a decision and take responsibility. You stay in the victim state, complain about the injustice of life, whine a lot, but do nothing. It's difficult for you to make the first step towards your goal, you are inert and slow. All this leads to unrealizedness, closedness, and resentment at the whole world.\nIt's important for you to maintain positive thinking, not immersing in pessimism and negative. Your energy is capable of attracting everything you think about, so all fears and worries can easily be realized for you. Do not use your abilities to harm others (evil eye, damage, etc.)."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Strong imagination" }, { label: "Powerful intuition" }, { label: "Feeling people, space, energy well" }, { label: "Interest in deep and esoteric knowledge" }, { label: "Creativity, unique approach" }, { label: "Clairvoyance" }, { label: "Artistry, charm, attractiveness" }, { label: "Healing" }, { label: "Positive influence on others" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nIn moments of strong anxiety and fear let worries through self, try to understand what precisely causes fear in you.\nWork through your fears: live through and let go.\nFocus on specific tasks and actions which will lead you to desired result.\nDevelop intuition.\nThink positively, make vision boards, be grateful for everything what you already have in your life.\nTrust others, speak truth.\nBe more often in nature, especially near water.\nLead healthy way of life.\nDevelop your talents.\nStop doubting your possibilities.\nVisualize positive, successful images.\nLearn to see opportunities in life and use them.\nThink creatively, use your non-standard approach in any matter.\nCommunicate with different creative people, get acquainted, don't close in self."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Devote more attention to development of creative abilities. Create kind and positive emotions, surrounding self with pleasant people. Listen to your sensations and intuition, following your life rhythms. Start visualization from phone wallpaper and continue with vision board for implementation of what is desired. Maintain purity of thoughts and emotions, concentrating attention on positive. Meditations near water, walks or swimming can balance you and bring internal harmony. Keep gratitude diary for getting rid of fears and doubts. Having realized your power, direct it into help to others, this will be favorable for you. Don't refuse from esoteric knowledge and your abilities, however preserve real and sober look on things. Live consciously, independently defining your priorities."
            },
        ]
    },
    19: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energeticness" }, { label: "Leadership" }, { label: "Carefulness" }, { label: "Love of life" }, { label: "Optimism" }, { label: "Success" }, { label: "Authoritativeness" }, { label: "Desire to help" }, { label: "Wellbeing" }, { label: "Creativity" }, { label: "Collectiveness" }, { label: "Activity" }, { label: "Ambitiousness" }, { label: "Kindness" }, { label: "Lightness" }, { label: "Curiosity" }, { label: "Sexuality" }],
                description: "Leadership energy. You are a team player and are an authority for other people. You like to be in the center of attention, you have big ambitions and global goals. Your energy is the energy of the Sun. You carry warmth, light, and goodness to people through work, communication, actions. You are ready to shine and inspire, always smiling and charming. You have positive thinking and a huge flow of life energy that helps to move towards the goal. You love to engage in kind, charitable projects aimed at helping people, nature, animals, etc.\nYou are an ideological person, it is important for you that the goal inspires and charges you. You are not ready to work only for money or material values. If there is a cool idea that you burn with, the result will not keep you waiting. You are ready to take on large-scale projects that affect many people around the world.\nYou like to engage in creativity, create new things, and show creativity. You are free in your manifestation and always achieve success in the chosen activity.\nYou have a strong connection with nature. You can pass powerful streams of energy through yourself, which help in achieving global goals. You are a \"battery\" person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Egoism" }, { label: "Hot temper" }, { label: "Aggressiveness" }, { label: "Fixation on the material" }, { label: "Irresponsibility" }, { label: "Fear of big projects" }, { label: "Pride" }, { label: "Fanaticism" }, { label: "Envy" }, { label: "Powerfulness" }, { label: "Rudeness" }, { label: "Feeling of guilt" }, { label: "Illnesses" }, { label: "Fuss" }, { label: "Chaoticness" }, { label: "Bad relationships with father" }],
                description: "The first manifestation of minuses by your energy is rigidity and excessive demandingness towards people. You set impossible goals and unrealistic deadlines, pressure your subordinates, and sometimes demand fulfillment of set tasks in an aggressive form. You manifest hypercontrol and do not trust loved ones. You can reach fanaticism in your cause. You behave powerfully and despotically with those around you.\nYou often envy, constantly comparing yourself with others. At the same time, you have an inflated ego, you pay attention only to yourself, fixate on your desires, not thinking about others. Not infrequently you focus only on money and financial success, completely forgetting about the higher goal and inspiration. The second manifestation is fading, apathy, doubts, and fears. You are not ready to take responsibility and become a leader, you are afraid to move towards your goal, you get lost and act chaotically. Fear to start a big, global project is possible, since you constantly experience a feeling of guilt, doubt, and dissatisfaction with yourself.\nIn childhood, bad relationships with father could have formed, or he was a powerful and despotic person, suppressed you and your desires, or the reverse situation — he was too soft, indecisive, and others suppressed him."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Leadership" }, { label: "Optimism" }, { label: "Ambitiousness" }, { label: "Lightness in life" }, { label: "Burning with an idea, moving forward, inspiring others" }, { label: "Creativity, unique approach" }, { label: "Quickly find contact with children" }, { label: "Positive thinking" }, { label: "Huge life energy" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nRemember, every person has right of choice. Don't judge and don't force to act against will.\nBe an example for others.\nCommunicate, get acquainted with new people, be open and benevolent.\nSupport loved ones.\nRegularly rest and care for self: spa, massage, hot bath, bathhouse, sauna.\nThink positively.\nEngage in creativity, develop your creative skills.\nEngage in charity, help others.\nWake up early, do exercises, meditate. Morning is time of big energy for you.\nBe grateful for what you have already now.\nEngage in sport, lead active way of life.\nDevelop your oratory talents, one can engage in vocal.\nGet rid of aggression and feeling of guilt.\nLearn to rejoice in simple things.\nThink globally. Work through childhood traumas and heal your internal child."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "It's important to realize self in society, be open, manifest one's knowledge and embody most large and ambitious projects. Don't be afraid to take responsibility upon self and learn flexibility, if one has to correct plans by external circumstances not depending on you. Don't forget also about creative side of your personality, which is important to realize at least in form of hobby. Avoid excessive workaholism and control over people and circumstances. Don't forget to rest and care for self. Concentrate on positive moments and don't collapse all your energy and love on one person. For you it's important to live and act in society. It's important to engage in favorite cause, and not work only for sake of prestige and money. Then you will be able to achieve real success and prosperity in finances."
            },
        ]
    },
    20: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "This energy is one of the most complex to understand.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Claircognizance" }, { label: "Healing" }, { label: "Intuition" }, { label: "Ideologicalness" }, { label: "Mysteriousness" }, { label: "Sensitivity" }, { label: "Interest in the unusual" }, { label: "Versatility" }, { label: "Wisdom" }, { label: "Stability" }, { label: "Authoritativeness" }, { label: "Adaptability" }, { label: "Ability to manage" }, { label: "Scale" }, { label: "Family-orientedness" }, { label: "Connection with ancestry" }],
                description: "You have a talent for uniting and creating something integral. You can create new projects, unique products, or unite people. You manage to find a balance between the spiritual and the material. You see what a person or a project lacks to become integral, what flaws and shortcomings exist, and how to fix them.\nYou have strong sensitivity and a powerful gift of clairvoyance. When you live in a flow, interesting ideas and insights can unexpectedly come. Intuition is well-developed, you trust your internal voice. You are sometimes mysterious in the eyes of other people.\nYou like to help. You possess deep life wisdom and people often come to you for advice and support. You are a versatile and interesting personality. You are drawn to everything unusual and esoteric. You are fond of psychology, studying deep and sacred knowledge.\nYou easily adapt to new conditions. You are stable in any changes and stressful situations. You can manage people, but do not strive for this. You like uniting and working together more.\nYou have a strong connection with your family and ancestry. You value relationships and home comfort, gather loved ones together, help to solve conflict situations and disputes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Judgment" }, { label: "Resentments" }, { label: "Problems with relatives" }, { label: "Pride" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Fear of changes" }, { label: "Fear of criticism" }, { label: "Bad habits" }, { label: "Weakness of character" }, { label: "Lack of spirituality" }, { label: "Anger" }],
                description: "You lack integrity and balance in life. You cannot find a soul-appealing cause, do not understand where to move and what you want. You cannot assemble yourself, it is scary for you to go into something new, there is a fear of changes. You don't believe in yourself and your talents, often doubt. All this leads to weak character, bad habits, and addictions.\nIt may happen that you fixate on material values and money, and not on an idea and a favorite cause, which eventually leads to losses.\nOr vice versa, you may behave as a rigid and authoritarian person. You constantly demand something from others, are not ready to share, lead a secretive lifestyle. In conflicts, you manifest your aggression, which can offend a loved one.\nNot infrequently there are problems with family: quarrels, conflicts, and misunderstanding lead to cessation of communication with relatives."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Powerful intuition" }, { label: "Life wisdom" }, { label: "Healing, creating the integral" }, { label: "Clairvoyance" }, { label: "Gift of uniting people" }, { label: "Openness to the world" }, { label: "Increased sensitivity" }, { label: "Connecting family together" }, { label: "Ideologicalness" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nEngage in spiritual practices, meditation, yoga.\nLead a healthy way of life.\nEngage in creativity.\nLive in a flow.\nEngage in sport.\nTransmit your wisdom to others.\nDevelop sensuality, intuition, clairvoyance.\nLearn to create the integral, help people find integrity.\nWrite down your goals and tasks, follow the plan.\nPractice forgiveness and acceptance.\nCommunicate more often with relatives, spend time with family.\nStudy your ancestry: family history, genealogy, etc.\nMaintain family traditions and values."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "You should use your unique possibilities for resolution of problems in family and elimination of repeating scenarios. You can break repetition of negative events, directing attention of whole family to violated ancestral scenarios. Possible appearance of such scenario: someone from elder family members feels self-undervalued, and younger experiences absence of love of relatives. In your power is to change scenario of negative events and direct life of whole family into positive channel. Help with kind words and acts, don't close in self, use your unique knowledge for good of people. Free self from negative in various aspects of life. Striving for material prosperity, devote attention to spiritual development. Engage in your health and develop individual abilities."
            },
        ]
    },
    21: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to a peaceful solution of problems and to harmonization of everything around.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Ability to lead" }, { label: "Interest in travel" }, { label: "Adaptability" }, { label: "Uniting people" }, { label: "Sensitivity" }, { label: "Healing" }, { label: "Freedom" }, { label: "Communicability" }, { label: "Ideologicalness" }, { label: "Globality" }, { label: "Tolerance" }, { label: "Openness" }, { label: "Scale" }],
                description: "Soft female energy. You are open to the new and unknown, love to receive diverse experience and experiment in everything. You have flexible thinking, you easily adapt to new conditions and circumstances.\nYou are a cheerful, kind, and smiling person. You like to engage in creativity and generate creative ideas. Your energy is very ideological, therefore you can become inspired by some idea, gather a team and lead it to the goal.\nYou are for harmony and peace in the whole world, always smooth over conflict situations and sharp corners. You know how to negotiate, find a compromise in any situation, listen and hear your interlocutor. You think positively, are always open and help people.\nHealing, clairvoyance, and intuition are well-developed in you.\nYou think globally, scale projects. You like to study all edges and possibilities of your personality, you are ready to go beyond usual frames and generally accepted standards.\nYou travel often, study other cultures and languages. You are open to communication, very communicative, easily make new acquaintances."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Militance" }, { label: "Categoricalness" }, { label: "Judgment" }, { label: "Conflictness" }, { label: "Destruction" }, { label: "Closedness" }, { label: "Aloofness" }, { label: "Whining" }, { label: "Distrust" }, { label: "Unconfidence" }, { label: "Mood swings" }, { label: "Desire to dominate" }, { label: "Emotionality" }, { label: "Ingratitude" }, { label: "Workaholism" }],
                description: "You behave aggressively, often argue with people, which leads to conflicts and quarrels. You judge another person and their actions if they contradict your convictions.\nCategoricalness and desire to dominate are present in the character, and this prevents you from establishing trusting and open relationships with people. You carry destruction instead of creation. Eventually this leads to closedness, you become aloof and lead a solitary way of life.\nThe second variant of manifestation of minuses by your energy is fear to go into the new, constant doubts in self and one's talents. You are unconfident, don't know what you want from life, what you would like to engage in and where to move. You don't trust people, are too emotional and experience frequent mood swings.\nEverything global and large-scale scares you: projects, ideas, plans. You are not ready to master new professions, refuse to travel and get acquainted with new people."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Openness to the new" }, { label: "Diplomacy" }, { label: "Ability to negotiate with other people" }, { label: "Structuralness" }, { label: "Sensitivity, good intuition, healing" }, { label: "Flexible thinking" }, { label: "Adaptability" }, { label: "Communicability" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Energeticness" }, { label: "Scale" }, { label: "Independence" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nStudy foreign languages.\nTravel.\nManifest interest in other cultures and countries.\nWrite down your fears, find causes, work through them and let go.\nDream, think about global, write down your goals.\nGo beyond frames.\nBe grateful for everything what you have already.\nEngage in sport.\nLead a healthy, eco-friendly way of life.\nAccept world and people such as they are, develop tolerance.\nShare with people, show your life, open up.\nOne can start leading a blog in internet.\nIncrease qualification, master new techniques and programs.\nBe patient, manifest flexibility, adapting to new conditions and circumstances.\nLead started cause to end. Practice acceptance.\nDo your work for good and with kind message."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Unite people only from kind motives. Don't be attached to home, travel a lot. Your peacemaking activity and good deeds are capable of bringing to people the idea of closeness and equality. Develop your global vision, participate in world projects, at this don't lose connection with real life. Study the art of \"small steps\". Try to avoid debts and credits. Help those who turned to you, but don't impose your help to those, who don't need it. Your mission consists in fact, to not be attached to material, always be open to new and carry unification all over the world in ease."
            },
        ]
    },
    22: {
        title: "My strengths",
        intro: "The main talent has the strongest positive representation in a person's matrix. This energy is a gift from God, and it is through this energy that a person establishes a connection with higher powers and receives support from them.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Freedom" }, { label: "Innovation" }, { label: "Openness" }, { label: "Adaptability" }, { label: "Optimism" }, { label: "Kindness" }, { label: "Communicability" }, { label: "Adventurism" }, { label: "Independence" }, { label: "Going beyond frames" }, { label: "Activity" }, { label: "Movement" }, { label: "Creativity" }],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations, you are open to everything new, not afraid of experiments and bright sensations. You do not accept any prohibitions, do not like work by schedule and routine. You are a free person in all manifestations. Possess limitless perception of self and life.\nIn you there is your own depth, you can transform the consciousness of other people.\nCreative thinking and original ideas help you approach any task non-standardly. You bring innovation and creativity into your cause or project.\nActive in life, constantly in movement, travel a lot, get acquainted with interesting people. Easily adapt to new conditions. If necessary, you are ready to lead an ascetic way of life and give up material benefits for sake of your idea."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Lateness" }, { label: "Unreliability" }, { label: "Fixation on the material" }, { label: "Jealousy" }, { label: "Overpoweringness" }, { label: "Inadequacy" }, { label: "Dependencies" }, { label: "Suppression" }, { label: "Debts" }, { label: "Dissoluteness" }, { label: "Apathy" }, { label: "Non-freedom" }],
                description: "You have too non-serious and irresponsible attitude to life. You do not fulfill your promises, miss deadlines, often are late for important meetings. Can behave inadequately, suppress other people or be excessively jealous. Absence of frames in a bad sense of this word leads you to a dissolute way of life, dependencies, as well as to problems with law and debts.\nCan get fixated on material values and money, completely forgetting about ideas and inspiration.\nThe second variant of manifestation of minuses is tension and too serious attitude to everything. You lack lightness, you constantly worry and are in a stressful state. Don't know how to relax, don't trust life, are afraid and doubt.\nA sense of internal non-freedom can lead you to apathy and heavy psychological states. You don't know what you want to engage in, where you go and what inspires you."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Freedom, absence of frames" }, { label: "Creativity, creativity, innovation" }, { label: "Lightness, relaxed state" }, { label: "Flexible thinking" }, { label: "Curiosity" }, { label: "Quickly find a common language with children" }, { label: "Adaptability" }, { label: "Communicability, openness to people and everything new" }, { label: "Positive thinking" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't fear to go into the new and start from zero.\nTravel.\nEngage in creativity.\nOne can develop acting abilities, perform in public.\nSpend time with children, charge from them with lightness and freedom.\nDon't load self with heavy tasks.\nReduce communication with toxic people.\nDon't pile up grudges in self, communicate honestly and openly.\nLead a healthy way of life, get rid of dependencies.\nChoose freelance, seasonal or project work in online-format, to work from any point of world.\nImplement your creative ideas.\nDon't limit freedom of other people, accept their opinion, views and worldview.\nTrust the Universe, accept everything with lightness and optimism.\nEngage in sport, lead an active way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For choice of type of activity listen to self and develop in it. Try to not pile up what can limit you in something. This concerns grudges, limiting convictions, as well as material benefits. For creation of family a light-on-feet partner with similar views on life will suit you. Travels will allow you to give to world your ideas of good, unity and freedom. Lower your requirements, wear comfortable clothes, add lightness to your way of life. Learn to easily let go everything unnecessary from your life, as well as help other people, who need liberation from attachments. Work through your fears and limiting convictions, easily let go attachments from your life and get rid of dependencies."
            },
        ]
    },
};

// MY INTELLECT SECTIONS
export const myIntellectData: Record<number, IdentitySectionData> = {
    1: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the first arcana is the Magician.\nThis energy makes a person focused, capable of immersing themselves in work and creative processes.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Decisiveness" }, { label: "Persistence" }, { label: "Independence" }, { label: "Attractiveness" }, { label: "Leadership" }, { label: "Energy" }, { label: "Communication" }, { label: "Charisma" }, { label: "Oratory" }, { label: "Intellectuality" }, { label: "Individuality" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Adventurism" }, { label: "Ingenuity" }, { label: "Optimism" }],
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You are able to completely abstract yourself and immerse yourself in activity. You love to study everything: yourself, people, nature, life.\nYou have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are slow to move and open to any experiment person. Love for something new and pulling toward learning pump your intelligence. Sharp mind and good ingenuity help to non-standardly solve any task. You are an optimist for life and ready to go for risk if necessary.\nOften possess extrasensory abilities: you thinly feel people and understand them on an intuitive level. These abilities can be useful when implementing your ideas and projects.\nIf necessary, you can create and manage a team, speak in public to promote your plans and projects.\nLove to stand out among others, which helps you in work. Have a clear connection with the soul and inner Self, know how to make decisions in the moment. Independence in your thoughts and actions is important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Overstated/understated self-esteem" }, { label: "Inflated ego" }, { label: "Closedness" }, { label: "Suppression of others" }, { label: "Powerfulness" }, { label: "Conflictness" }, { label: "Aggression" }, { label: "Uncertainty" }, { label: "Pride" }, { label: "Indecisiveness" }, { label: "Intolerance" }, { label: "Self-interest" }, { label: "Manipulations" }, { label: "Secretiveness" }, { label: "Impatience" }, { label: "Loneliness" }, { label: "Vindictiveness" }, { label: "Envy" }],
                description: "Another variant of energy manifestation in minus is understated self-esteem. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. All this prevents your realization. You want to try everything at once, grab different activities and in the end do not bring anything to the finish, drop the case halfway. Accustom yourself to finish what you started. Evaluate your strength before taking on anything, and learn to set priorities correctly.\nAlso you can suppress others for your own, sometimes selfish goals. You begin to manipulate and manage, as you know how to feel people well and use this skill. You are vindictive and keep a grudge in yourself for a long time. Painfully perceive any criticism of your ideas, even if it is constructive.\nYou have a fear of theft of ideas, so you close even from loved ones and do not share your plans, dreams, thoughts. As a result, you lead a secret lifestyle. You do not want to hear your inner voice, grab everything from the fear of missing an opportunity, and at the same time cannot enjoy a truly interesting business, lose the taste for life, becoming angry and envious."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Leader who can lead others" }, { label: "Possess increased sensitivity and extrasensory abilities" }, { label: "Ability to quickly make decisions from intuition and inner response" }, { label: "Creating new through creativity" }, { label: "Can transfer deep knowledge from the position of \"guru\"" }, { label: "High level of intelligence, love for study" }, { label: "Ability to organize people through adventurism and ideology" }, { label: "Ability to create and create" }, { label: "Fast generation and implementation of ideas" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Egoism" }, { label: "Unfinished projects" }, { label: "Pride" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nRealize your ideas.\nIf a new thought came to you, then immediately write it down and try to start the implementation in the near future.\nBelieve in yourself and your talents. Do not doubt your abilities.\nBe decisive, initiative and active. Focus on your self-realization. Do not push ideas to the background.\nCreate new, even if it is scary and there are doubts. This is an experience that will be useful to you in life, even if it does not lead to the desired success.\nShare your experience and knowledge with other people. Pass information. Tell your ideas.\nLearn to work in a team, unite and help each other.\nLearn to forgive and do not keep evil.\nDevelop your creative abilities and creativity.\nStudy secret knowledge: work with the subconscious, esotericism, hypnosis, visualization of desires, meditations, practices, spiritual teachings. Develop intuition and feeling."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e\nFor you it is important to believe in yourself and your forces. Go your own way, not comparing yourself with other people. Express yourself in everything, even in small things. Choose the best for yourself. Do not be shy to stand out, strive to be the first in everything, but without fanaticism. Choose only what you like, and do not adapt to other people. You have a bright personality and a special, your own, vision.\nDevelop positive thinking, work on your thoughts, track events that happen in your life, make conclusions and trust the Universe.\nEngage in creativity, develop creative vision and observation. Be sure to embody your ideas in life. Immediately, as a thought appeared, fix it in a notebook and try to take the first steps for embodiment.\nLearn, get new knowledge, check everything in practice. Search for new approaches, experiment, do what no one has tried before. Take various courses, trainings and seminars and do not forget to apply the knowledge gained in real life, as well as pass it on to other people.\nDevelop feeling, more often listen to your intuition. Through these abilities you can promote your ideas, agree with people, find an approach, inspire and lead.\nEngage in sports, and also devote time to your body: spa, massage, beauty salon, baths and so on."
            },
        ]
    },
    2: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Kindness" }, { label: "Compassion" }, { label: "Intuition" }, { label: "Modesty" }, { label: "Romanticism" }, { label: "Mystery" }, { label: "Sensitivity" }, { label: "Empathy" }, { label: "Wisdom" }, { label: "Softness" }, { label: "Openness" }, { label: "Communicativeness" }],
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around.\nYou have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation. You will always find the right words, support a person and help.\nYou accept the world and people as they are, without judgment and patterns. Sometimes you can romanticize events, believe in fate and signs of the Universe. At times you are mysterious - this is part of your energetic. But do not forget about the balance between the spiritual and material. Find your middle ground and do not go to extremes.\nYou are always calm and know your value. You are selective in everything and love to take care of yourself. Surround yourself with beautiful objects, wear stylish clothes and original handmade jewelry.\nYou know how to relieve physical pain, can be a healer. You can transfer energy to people through creativity: painting, music, creating clothing or jewelry, etc."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Distrust" }, { label: "Uncertainty" }, { label: "Doubts" }, { label: "Inconstancy" }, { label: "Caprices" }, { label: "Conflictness" }, { label: "Malice" }, { label: "Confusion" }, { label: "Secretiveness" }, { label: "Tearfulness" }, { label: "Hypocrisy" }, { label: "Jealousy" }, { label: "Gossip" }, { label: "Manipulations" }, { label: "Coldness" }, { label: "Untidiness" }, { label: "Dependency" }],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn.\nYou doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view. You cannot focus on one thing and confidently move toward the goal. You are thrown from side to side, you doubt the correctness of your actions and depend on the opinions of other people. In the end you can close from everyone, refuse your own realization and harbor a grudge against those around instead of gaining courage to implement the idea.\nYou may have two sides: either you are too jealous, hot-tempered and demanding toward people, or, on the contrary, behave coldly, indifferently. You become indifferent to those around and their problems.\nYou can excessively fixate on your appearance, forgetting about inner qualities. Or the opposite situation: untidiness, negligence in affairs, mess in the house."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Bad relationship with mom" }, { label: "Hypocrisy" }, { label: "Aggressiveness" }, { label: "Oratory skill: you can talk much and beautifully" }, { label: "Get knowledge and information through space and inner voice" }, { label: "Increased sensitivity and intuition" }, { label: "Feeling of sincere compassion, desire to help" }, { label: "Abilities for healing, healing people" }, { label: "Can transfer knowledge from the position of \"guru\"" }, { label: "Harmonize people and space" }, { label: "Innate calm" }, { label: "Easily adapt to new conditions" }, { label: "Can be a good actor/actress, know how to live into a role" }, { label: "Lay deep meaning into information and pass it further" }, { label: "Diplomatic abilities - you can reconcile people around" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Lies" }, { label: "Gossip" }, { label: "Distortion of information" }, { label: "Conflicts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Here are listed recommendations for actions that will help to bring your energy to plus. RECOMMENDATIONS\nDevelop your intuition. Listen to your inner voice.\nStudy spiritual practices, meditations, yoga.\nMove, travel, go for walking tours.\nEngage in sports, ground yourself and disperse energy throughout the body. Spend time in nature.\nTake care of yourself and your body. Visit spa, massage, beauty salons.\nTry to be in calm and harmony.\nDo not make hasty conclusions, do not hang labels and patterns on people. Learn to look at things from different angles.\nDo not participate in intrigues and gossip. Be honest.\nOpenly state your feelings and desires. Do not be afraid to express your opinion.\nShare knowledge and help with advice.\nWomen need to develop their sexuality and looseness. Take up dances and body practices. Men need to focus on such qualities as responsibility, courage and decisiveness."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Here are listed general recommendations for energies located at points a, b, e Develop your sensitivity, trust your inner voice more, and not logic and rational judgments. Find harmony within yourself. Maintain balance of spiritual and material, help other people with this. Engage in spiritual practices: breathing, meditations, yoga.\nYou have powerful healing energy, you know how to relieve physical pain. You can use this energy to help other people.\nAlways try to create a comfortable and cozy environment around yourself.\nUnite people. Get acquainted with different nationalities, religions and cultures. You know how to competently build communication and find common language with very different people. Use diplomacy skill for your self-realization in society.\nExpress your individuality through creativity: music, dances, painting and so on. You are capable of endowing things with your energetics, therefore you can focus on creating various objects."
            },
        ]
    },
    3: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the third arcana is the Empress (female energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, FERTILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Organizational abilities" }, { label: "Self-love" }, { label: "Care for others" }, { label: "Responsibility" }, { label: "Success in business" }, { label: "Generosity" }, { label: "Order in affairs" }, { label: "Love for comfort" }, { label: "Material prosperity" }, { label: "Taste and sense of style" }, { label: "Authority" }, { label: "Natural charm" }, { label: "Attractiveness" }, { label: "Creativity" }, { label: "Kindness" }, { label: "Good relations with women" }, { label: "Respect from men" }, { label: "Housekeeping" }, { label: "Sensitivity" }, { label: "Femininity" }, { label: "Calm and softness" }, { label: "Sexuality" }, { label: "Love for beauty" }, { label: "Respect for men" }, { label: "Love for plants, animals" }, { label: "Carefulness" }],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround only with beautiful objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children and value family. Take more responsibility on yourself, become an authoritative head, provide for relatives materially.\nYou feel comfortable in the society of women. But for harmonious relationships, cultivate a leadership position in yourself. In business, excessive softness may hinder you, so learn to take initiative and independently make decisions.\nYour task is to try to translate your third energy into the male fourth. Female energy. Empress. You love beauty, luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround with beautiful interior objects and create a pleasant atmosphere around. Always look stylish, and powerful energetics and charisma attract the opposite sex.\nSuccess in all spheres of life is important for you: family, business and self-realization. Maintain balance and do not go to extremes.\nYou have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you, and successful people always surround you.\nYou get along well with children, love your partner and value family. Educate children and build harmonious relationships within the family. Be a caring keeper of the home hearth, gather relatives together for general holidays, support traditions.\nYou can be successful in business and simultaneously create your family - importantly, find a balance. Respect men and find a common language with other women.\nYou are a beautiful, soft, sexual and sensual woman. Always know your value and are not ready to agree to less."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" }, { label: "Soft-bodiedness" }, { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Being \"under the heel\" (dominated by women)" }, { label: "Lack of money and career" }, { label: "No relationships" }, { label: "Rejection of women" }, { label: "Problems with women" }, { label: "Loneliness" }, { label: "Stinginess" }, { label: "Closedness" }, { label: "Obsession with appearance" }, { label: "Untidiness" }, { label: "Infantilism" }, { label: "Hyper-control" }, { label: "Hyper-responsibility" }, { label: "Lack of care for oneself" }, { label: "No time for oneself" }, { label: "Despotism" }, { label: "Destruction" }, { label: "Pressure on men" }, { label: "Tyranny" }, { label: "Choice between career and family" }, { label: "Merchantilism" }, { label: "Calculation" }, { label: "Problems with money" }, { label: "Unwillingness to have children" }, { label: "Possession of power" }, { label: "Egoism" }, { label: "Problems with sexuality" }, { label: "Conflicts with women" }, { label: "Caprices" }, { label: "Negligence" }, { label: "Workaholism" }],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nProblems in communication with women may arise: you don't respect them, don't accept care and affection, condemn their behavior. As a result, this leads to loneliness and lack of any relationships. Or vice-versa: become excessively soft, put a woman at the head, listen to her implicitly and allow to manage you, refusing your own opinion.\nIt's hard for you to succeed in male professions and business. Can be soft and indecisive because of this it's hard for you to take responsibility. Often avoid independence and initiative. In a team take a passive position and don't let talents reveal. As a result, you have neither career nor money. You close in yourself, blame those around, become stingy and greedy. Your main task is to try to translate the third energy into the male fourth. You lash out at loved ones due to your hysteria and emotionality. Don't know how to forgive, condemn others and behave arrogantly.\nA frequent problem with your energy is the inability to combine business and family. If you can't cope with this task, you begin to blame everyone around. Consider yourself better and smarter than others. Can start to intrude into others' affairs and give unasked advice. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels.\nMay pressure men and press them. Don't respect their decisions, behave too emotionally and irresponsibly. Try to manage and manipulate, which leads to quarrels.\nIt's hard for you to make a choice between family and business, always sacrificing something. Often choose professional realization and refuse to have children, which leads to loneliness and closedness. At times too obsessed with your appearance or, vice-versa, become untidy and negligent."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "For men it's important to translate the third energy into the plus fourth." }, { label: "Housekeeping, ability to manage resources" }, { label: "Possess a special field of abundance and fertility" }, { label: "Can receive money without tension, through passive income" }, { label: "Inspire those around" }, { label: "Leadership and wisdom" }, { label: "Understand women well" }, { label: "Respect from men" }, { label: "Innate taste for beauty and aesthetics" }, { label: "Know how to form a team and wisely manage people" }, { label: "Much beauty around you: clothing, interior, things" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Excessive activity" }, { label: "Lack of independence" }, { label: "Aggressiveness" }, { label: "Tension" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Develop male qualities, take responsibility for the team.\nProvide for family, become head and support.\nBe generous.\nDon't conflict with women. Learn respect and trust.\nBecome an authoritative leader.\nDevelop decisiveness and initiative in yourself.\nEngage in sports.\nMake independent decisions.\nDevelop your relationships with women.\nRaise level of comfort for yourself and for loved ones. Manage people through wisdom and softness.\nDevelop femininity, accept men and material benefits from them.\nSupport your partner.\nDevote time to yourself, take care of your body: massage, spa, sport.\nEngage in creativity.\nDon't use commanding tone in speech.\nFix relations with mom, let go of all childhood grudges.\nCreate your family, raise children.\nDevelop generosity in yourself, help others to grow.\nDelegate work and domestic affairs. Don't take everything on yourself.\nSpend time in nature. One can start one's own garden or a domestic pet.\nLearn to combine career, raising children and household."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Strive to embody your mission - be a prosperous and generous person, successful in career and wise in family. Care for loved ones, but without intrusiveness and authoritarianism.\nCreate coziness, harmony and beauty around you. Take care of the house, but herewith don't get stuck in routine domestic affairs. Delegate your obligations to helpers or other family members.\nLet go of excessive guardianship and concern for relatives. Give them opportunity to develop and independently make decisions in life. Herewith you can become a support: support and give needed advice.\nTreat people as equals regardless of their status and financial position. Learn not to cling to material and don't chase after success. In due time success itself will come to you thanks to your talents and persistence."
            },
        ]
    },
    4: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: (FOR MEN) - AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Carefulness" }, { label: "Housekeeping" }, { label: "Leadership" }, { label: "Calm" }, { label: "Confidence" }, { label: "Responsibility" }, { label: "Work capacity" }, { label: "Organizational skills" }, { label: "Logicality" }, { label: "Reliability" }, { label: "Purposefulness" }, { label: "Authority" }, { label: "Charisma" }, { label: "Good relations with men" }, { label: "Respect for men" }, { label: "Good relations with mom" }, { label: "Order in money and affairs" }, { label: "Motherhood" }, { label: "Prosperity" }, { label: "Femininity" }, { label: "Sense of style and taste" }],
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance in your career, occupying high positions in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You have good diplomatic skills: you skillfully conduct negotiations and successfully reach agreements with people.\nYou are a strong leader and a charismatic person. Your priority is to give the family a decent level of life and provide for them materially. For loved ones, you are an authority; your advice is listened to and trusted. It is characteristic for you to always keep your word and fulfill your promises. Male strong-willed energy. You possess a global vision of things and strategic thinking. This allows you to successfully implement large projects and quickly advance on the career ladder, occupying high posts in the company.\nYou value and respect yourself and your work, and you possess the skill of multiplication: you can scale your projects to achieve great results. High work capacity and energy help you realize ambitious goals. Logic and consistency prevail in your actions, and you prefer order and organization. Fuss and chaos are not characteristic of you.\nPeople around can rely on you. You are a calm and self-confident person, acting clearly and rationally under any circumstances. You skillfully conduct negotiations and successfully reach agreements with people.\nYou have a strong strong-willed character. You like to be in the society of men and easily find a common language with them. But, for harmonious relationships, do not forget about your tenderness and softness. Try to devote more time to yourself and caring for your body. Spend time with other women, engage in family life and care for relatives. Engage in creativity, dancing, reveal your female component.\nYour task is to try to translate the fourth energy into the plus third."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: (FOR MEN) - TYRANNY, WEAKNESS, CHAOS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Authoritativeness" }, { label: "Tyranny" }, { label: "Obsession with the material" }, { label: "Hyper-control" }, { label: "Aggression" }, { label: "Inaction" }, { label: "Whining" }, { label: "Irresponsibility" }, { label: "Weakness" }, { label: "Uncertainty" }, { label: "Stubbornness" }, { label: "Jealousy" }, { label: "Fussiness" }, { label: "Cruelty" }, { label: "Belligerence" }, { label: "Disrespect for men" }, { label: "Intolerance" }, { label: "Criticality" }, { label: "Conflict nature" }, { label: "Categoricalness" }, { label: "Loneliness" }, { label: "Greed" }, { label: "No career" }, { label: "No money" }],
                description: "The first option is tyranny and despotism. You interfere in all working processes and family affairs. You abuse power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you show aggressiveness and cruelty toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. Constant doubts in your own decisions prevent you from taking decisive steps, and you are prone to complaints about the injustice of life, which leads to passivity and laziness. Your behavior becomes irresponsible, and you do not show readiness to care for the financial well-being of the family.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. It is characteristic for you to behave like an authoritative tough emperor. You control everything excessively. Often you set excessive requirements, set unfulfillable goals and deadlines for your subordinates. You don't know how to forgive people and go for compromises. In relationships you show despotism, you are not interested in family affairs, you suppress your partner and order around your loved ones. The first is tyranny and despotism. You interfere in all working processes and family affairs. You abuse your power and do not value those around. You show authoritarian behavior and are not always ready to listen to alternative opinions, preferring to orient yourself exclusively on your own desires. You cannot work in a team, you are sometimes aggressive and cruel toward colleagues. You may start a senseless struggle for invented goals and stomp on one spot instead of thinking through a strategy and starting concrete actions.\nIn the second option, on the contrary, inaction and weak-character are manifested. You constantly doubt your decisions and experience difficulties with making a choice. You start to whine and complain about the injustice of life, become passive and lazy. You behave irresponsibly.\nYou can get too obsessed with money, which leads to greed, excessive accumulation and even problems with the law. Excessive independence and aggression will not allow building full-fledged harmonious relationships with a partner. At home you behave like an authoritarian leader, interfering in the private affairs of each family member.\nExcessive harshness and increased demandingness at work create tension in the collective, which, in turn, leads to frequent dismissals and financial losses.\nYour main task is to try to translate the fourth energy into the female third."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Increased requirements for people" }, { label: "Abuse of power" }, { label: "For women it's important to translate the fourth energy into the plus third." }, { label: "Can create a new business or company" }, { label: "Talented manager and leader" }, { label: "Strategic thinking" }, { label: "Responsibility and decisiveness" }, { label: "Global vision" }, { label: "Skill of scaling and multiplication" }, { label: "Initiativeness" }, { label: "Ability to gather a team" }, { label: "Order in affairs and finances" }, { label: "Diplomatic skills" }, { label: "Rationality and logicality" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Laziness" }, { label: "Authoritarianism" }, { label: "Unwillingness to develop" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome defender and reliable support for family. Provide for relatives materially.\nEngage in sports. Establish relations with father and respect his advice.\nHelp people grow professionally.\nRespect needs and opinion of other people.\nLearn to recognize and fix your mistakes.\nTake responsibility for your life, independently make decisions.\nGet rid of aggression. Don't suppress people.\nCommunicate with authoritative and strong people whom you respect.\nBecome keeper of the hearth and caring mom.\nBe a support for your man.\nEngage in sports.\nDevelop creative skills.\nDevote time to yourself, take care of your body.\nSpend more time in nature and with other women."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For you it's important to stay in balance between spiritual and material. Treat people as equals, and not evaluating them by achievements or place in society.\nHelp not only your family and loved ones, but also subordinates at work. Give them opportunity for career growth.\nStop excessively controlling every sphere of life. Don't impose your point of view and trust your inner voice.\nDevelop physically: engage in sports, lead a healthy lifestyle, eat correctly.\nThink strategically, build your own empire and manage people through wisdom, and not authoritarianism. You quickly achieve good position in society, you are an example for many. Use your strength and power for good, for help to people.\nProvide family and loved ones with all necessary things: food, clothing, housing, education and so on. You are head of family and authoritative leader."
            },
        ]
    },
    5: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for learning" }, { label: "Oratory skills" }, { label: "Management skills" }, { label: "Conservatism" }, { label: "Desire to teach" }, { label: "Help to loved ones" }, { label: "Family orientation" }, { label: "Love for traditions" }, { label: "Professionalism" }, { label: "Correctness" }, { label: "Systematic nature" }, { label: "Pedantry" }, { label: "Accuracy" }, { label: "Logicality" }, { label: "Order in affairs" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Kindness" }],
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony. You can be a leader and a good manager, but you don't strive for it.\nYou are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others. For this you have expertise, excellent oratory skills and a strong voice. The main thing is to remain open to the world and pass your knowledge to people.\nYou love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Spontaneity, disorder and chaos can knock you out of balance.\nAnother way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions. Absence of family and trustful relationships negatively affect your energy."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Intolerance" }, { label: "Conflict nature" }, { label: "Emotionality" }, { label: "Egoism" }, { label: "Hyper-control" }, { label: "Judgment" }, { label: "Pride" }, { label: "Desire to suppress and teach" }, { label: "Limitation" }, { label: "Categoricalness" }, { label: "Harshness" }, { label: "Arrogance" }, { label: "Unwillingness to pass knowledge" }, { label: "Uncertainty" }, { label: "Fear of competition" }, { label: "Desire to argue" }, { label: "Rebellion" }, { label: "Fanaticism" }, { label: "Excessive correctness" }, { label: "Problems with family" }],
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. Sometimes emotions can overflow you and become the reason for hot-tempered reactions that can damage relationships with loved ones. You may start to control everyone around, stop trusting people, acknowledge only your truth. You harshly push your position, suppressing others. You can behave arrogantly.\nYou are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice. You can learn endlessly, get diplomas and awards, but for you it's much more important - to pass knowledge, and not to possess them in theory. There may be problems with family and creating relationships. Frequent conflicts and full discord in private life lead to loneliness and apathy. Especially important are your relationships with father."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Refusal to pass knowledge" }, { label: "Passing knowledge, good teacher" }, { label: "Love for learning and knowing the new" }, { label: "Create order and systematicity" }, { label: "Unite people, leader from the position of teacher" }, { label: "Oratory skills" }, { label: "Ability to structure" }, { label: "Create the whole through order" }, { label: "Practicality - use knowledge in life" }, { label: "Increased sensitivity and extrasensory perception" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Conservatism" }, { label: "Imposing your rules" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAcknowledge different knowledge and systems. Don't get fixated on one thing.\nStudy new information, expand your horizon.\nLearn.\nThink positively.\nPass accumulated knowledge to others.\nDevelop oratory skills. One can engage in vocals or oratory art.\nCreate and maintain family traditions.\nSpend time with family.\nDon't go for next learning until started using previous knowledge.\nListen to your intuition.\nReduce control regarding loved ones, relate to others with patience and respect. Each has his own path.\nInspire and motivate people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn the new and pass your knowledge further. You know how to re-process information through your prism and make the complex simple and clear. Openly share your experience, helping other people improve life. Use your life experience, share your wisdom.\nLearn to see the world in all its multi-faceted nature, accept everything new, be open. Don't get fixated on one teaching. Refuse from the old and outlived. Study different concepts, communicate with people, accept any experience.\nFor you it's important to maintain warm relations in family. Gather together for holidays, and also arrange joint trips and travels. Family is what charges and feeds you with energy.\nTry to control other people less. Be confident in yourself and you will be able to achieve much, occupying a leadership position in life."
            },
        ]
    },
    6: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the sixth energy is the Lovers.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Loving nature" }, { label: "Communicability" }, { label: "Artistry" }, { label: "Charm" }, { label: "Attractiveness" }, { label: "Sensuality" }, { label: "Communication skills" }, { label: "Sense of taste and style" }, { label: "Amorousness" }, { label: "Ability to organize" }, { label: "Loyalty" }, { label: "Adaptability" }, { label: "Carefulness" }, { label: "Selflessness" }, { label: "Festivity" }, { label: "Emotionality" }, { label: "Cling to comfort" }, { label: "Liberalism of views" }, { label: "Attention to details" }],
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love.\nLove to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language. Therefore, as a rule, you have an extensive circle of friends and acquaintances.\nYou like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier.\nEngage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Living in illusions" }, { label: "Fixation on relationships" }, { label: "Frequent change of partners" }, { label: "Inability to make a choice" }, { label: "Doubts" }, { label: "Vulnerability" }, { label: "Depressive nature" }, { label: "Uncommunicativeness" }, { label: "Infantilism" }, { label: "Idealism" }, { label: "Revengefulness" }, { label: "Touchidness" }, { label: "Fixation on appearance" }, { label: "Egoism" }, { label: "Uncertainty" }, { label: "Problems with finances" }, { label: "Apathy" }, { label: "Loneliness" }, { label: "Dependence on people's opinion" }, { label: "Impulsivity" }, { label: "Distrust" }, { label: "Self-dislike" }, { label: "Desire to seem better" }],
                description: "Main minuses by your energy go due to high sensitivity. You idealize and too quickly fall in love, and then for a long time stay in your delusions, which can lead to disappointment in a person. Often fixate on one relationship, and then with difficulty survive the departure. This concerns not only love, but friendly and work relationships. As a result, you may start to chaotically change partners, friends or projects, fearing to be disappointed and remain lonely.\nIn your character exists a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy, don't understand what you want, where to move and where to develop. Start to listen to opinion of other people instead of taking initiative into your hands and making an independent step.\nIf you go too much into idleness and lightness, then problems with finances start and debts appear."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Inability to see internal qualities of a person" }, { label: "Doubts" }, { label: "Know how to build harmonious relationships with people" }, { label: "Establish connections with others, know how to negotiate" }, { label: "Harmonize space" }, { label: "Feel people" }, { label: "Have inner sense of beauty, create beauty around" }, { label: "Attract people and opportunities into your life" }, { label: "Surround everyone with energy of love and care" }, { label: "Create holiday from any process" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Idealization" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't strive for ideal — this will lead you to disappointment. Do everything through love for self and world.\nFocus on positive qualities in people. Don't judge others and don't lead self aggressively.\nDevelop own taste and style, follow fashion and tendencies.\nManifest love for self and care for your body: shopping, spa, massage, sport.\nGive self and others gifts.\nVisit bright events and arrange thematic parties.\nGather together with friends, celebrate holidays. Spend time in circle of family.\nLearn to make independent choice, stop depending on opinion of those around.\nLearn to forgive people and accept them such as they are.\nDon't betray your partner. In relationships be sincere and open.\nHelp selflessly and from heart, not expecting nothing in return.\nDon't hold on to past. Let go of people and non-interesting projects. Don't be afraid to commit mistakes."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Surround yourself with beauty and help other people in this. Give feeling of lightness and celebration. Accept people such as they are - without judgment, gossip or idealization.\nLearn not only to accept love, but also give it to others. Less cling to appearance of person, try more to learn about internal qualities. Don't judge only by first impression.\nTry to think positively in any situations and be honest first of all with self. Orient only on your inner feelings and sensations, and not on opinions of those around. Be confident in self and your strength, move to your goals. Engage only in what you like.\nDon't strive for ideal and don't idealize others. Try realistically to look at world, and not through pink glasses. Learn on mistakes, make conclusions and move further."
            },
        ]
    },
    7: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy).",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Goal-orientedness" }, { label: "Leadership" }, { label: "Responsibility" }, { label: "Skill to lead" }, { label: "Recognition" }, { label: "Teamwork" }, { label: "Decisiveness" }, { label: "Activity" }, { label: "Ambition" }, { label: "Flexibility" }, { label: "Organizedness" }, { label: "Control of emotions" }, { label: "Respect for people" }, { label: "Optimism" }, { label: "Work capacity" }],
                description: "Male volitional energy. You are a leader and lead people. You are not bothered by appearance, much more important are internal qualities: goal-orientedness, ambition and decisiveness. You set clear goals before yourself and quickly reach them. For the sake of set task you are ready to search for ways to negotiate, know how to be flexible and diplomatic.\nYou throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you. These can be difficulties in life, diseases, financial complexities. Therefore it's very important to independently set yourself inspiring goals and immediately proceed to their realization.\nYou love activity, it charges you and gives additional resource. It's simply necessary for you to be in movement, starting from sport and travels to educational courses and spiritual practices.\nYour energy — entrepreneurial. You are independent and ready to take responsibility for self and team, know how to direct people, form strategy and build plans. You are easy on the rise, charge with optimism and energy everyone around. Main thing - don't doubt yourself, continue movement and then any your dream will come true."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Destructiveness" }, { label: "Desire to reach goal at any cost" }, { label: "Struggle" }, { label: "Aggression" }, { label: "Categoricalness" }, { label: "Overstrain" }, { label: "Workaholism" }, { label: "Dissatisfaction with achievements" }, { label: "Loss of goals and sense" }, { label: "Irresponsibility" }, { label: "Fear of leadership" }, { label: "Stagnation" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Emotionality" }, { label: "Non-realization" }, { label: "Uncertainty" }, { label: "Fussiness" }],
                description: "Main minuses by your energy — warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force and wish to reach it at any cost. Suffer from own workaholism and force others to work excessively. When reach set goal, still remain dissatisfied with result. Don't value what already have, always want more.\nAbsence of movement and challenge in life lead to stagnation. If you have no concrete goal, then start to lead meaningless struggle in one place, fuss much, commit unnecessary actions, which in the end only takes energy and doesn't lead to desired result. In the end lose interest, drop matter halfway and don't finish what was started.\nIf feel yourself non-realized and don't understand where to move, then this is a clear sign of energy in minus. Insufficient realization of your needs and goals can lead to frequent and serious problems with health.\nStrong emotionality repels people from you and prevents creation of harmonious relationships.\nIn character sacrifice may be present. You fear taking responsibility and role of leader. There may be problems with decisiveness, for a long time stay in apathy and in one place."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Go forward under any circumstances" }, { label: "Lead people, inspire for changes" }, { label: "Think through strategy, clearly see end goal" }, { label: "Born leader and manager" }, { label: "Ready to throw challenge and overcome obstacles" }, { label: "High activity and constant movement" }, { label: "Love sport" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Unfinished processes" }, { label: "Aggression" }, { label: "Excessive warrior-likeness" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nUse your potential for peaceful goals, direct energy to creation.\nRefuse from meaningless struggle and goals that don't motivate you.\nMake emphasis on your leadership qualities. Become an example to follow.\nManage your emotions and restrain warrior-likeness and aggressiveness.\nCarefully plan, write down stages of reaching goal, think through strategy.\nShare your achievements with people, inspire others.\nListen to self and trust intuition.\nDelegate obligations.\nEngage in spiritual practices: meditations, yoga, breathing.\nEngage in active sport.\nLead team behind you, take responsibility.\nLead active and healthy way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Use your potential for good. Try so that your activity works not only for your realization, but also brings benefit to other people. Don't divide world only into white and black. Hold under control your inner proclivity to warrior-likeness, learn to control your emotions and effectively cope with bouts of aggression. Remember that it's important to devote attention to inner and spiritual development on par with physical. Learn to listen to self and trust inner sensations. Learn to delegate: after all laziness, doubts, passivity, which can suddenly arise in you, are easier to overcome jointly with team. Learn to openly speak about your desires, feelings and try to convey your thoughts to those around."
            },
        ]
    },
    8: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The eighth energy, by its nature, doesn't yield to rigid definition of archetype. To the greatest degree it's corresponded by \"Balinese esotericist\".",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Reliability" }, { label: "Responsibility" }, { label: "Openness" }, { label: "Kindness" }, { label: "Honesty" }, { label: "Loyalty" }, { label: "Courage" }, { label: "Confidence" }, { label: "Logicalness" }, { label: "Insightfulness" }, { label: "Adaptability" }, { label: "Pedantry" }, { label: "Intuition" }, { label: "Diplomacy" }, { label: "Correctness" }],
                description: "Energy of justice and calmness. You are a peaceful and kind person, it's hard to get you out of yourself, however, if this happens, you become irritable and aggressive. For you it's important to find balance in all spheres of life. If balance is not there, then you will snap at those around. Also you can help others find their balance, for example, with help of meditations, spiritual practices and even usual heart-to-heart conversations.\nFor you it's important that everything is honest and by law. You always are in search of truth, but learn to do this through acceptance, kindness and open dialogue. Without aggression and excessive emotionality. You protect rights of other people and are ready to stand on side of the weak.\nPerceive whole world through prism of depth and logic. You dive into work processes or family situations with head, reach the essence, sorting out each detail.\nVery consistent, reliable, always keep your word and ready to take responsibility. You have leadership energy, you know how to communicate with people and form professional team."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Conflictness" }, { label: "Categoricalness" }, { label: "Aggression" }, { label: "Sharpness" }, { label: "Pride" }, { label: "Hot-temperedness" }, { label: "Loss of balance" }, { label: "Irresponsibility or hyper-responsibility" }, { label: "Self-criticalness" }, { label: "Touchiness" }, { label: "Manipulations" }, { label: "Lie" }, { label: "Revengefulness" }, { label: "Cruelty" }, { label: "Infidelity" }],
                description: "Full opposite of energy in plus. You in aggressive manner prove your rightness, which leads to frequent quarrels and conflicts with people. If in your life there are courts, then this is a clear sign of energy in minus. You need to learn to negotiate with those around. Often your pride prevents recognizing own wrongness.\nIf in life there is no balance, then you are thrown from extreme to extreme. You don't recognize existence of other points of view. Suppress people, often argue. Can behave sharply and hot-temperedly. Judge actions of others, refuse to understand them. Try to control loved ones and manipulate them.\nOften same situations in life repeat. Need to learn to notice them and try to lead energy out of minus. Always search for your balance.\nIf engage in own business, then legally and with payment of all taxes. If relationships, then open and honest. Be loyal to your partner."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Organization of people and processes" }, { label: "Skill to analyze information" }, { label: "Logical thinking" }, { label: "Creation of structure, order, system" }, { label: "Leadership and responsibility" }, { label: "Communicability, skill to negotiate" }, { label: "Skill of self-presentation" }, { label: "Honesty and openness" }, { label: "Sense of justice" }, { label: "Talent of harmonious manager: well understand when need to motivate employee, and when to punish" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Deception" }, { label: "Violation of law" }, { label: "Fraud" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't judge acts of other people.\nPreserve inner balance. One can use for this breathing practices, meditations, yoga.\nStudy deep knowledge and cause-and-effect links.\nObserve laws, be honest and open.\nKeep your word. Don't deceive and don't betray.\nDon't take credits, try not to borrow money.\nSearch for justice, but through wisdom and open dialogue.\nShow your true feelings to other people.\nConvey your knowledge further.\nCreate your family.\nLearn to see truth and hidden motives that drive people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to stick in everything to the golden middle and preserve neutrality. For you it's important not to achieve justice, but search for truth, hidden motives and processes that drive people and events. Develop in yourself and those around positive thinking and in each complex situation try to see life lesson and extract benefit for self. Don't interfere in arguments and proceedings without necessity. Stop judging anyone. Learn more and develop, be open to everything new. Don't try rather to convey just received information, you should live through it on own experience and let it through yourself."
            },
        ]
    },
    9: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "Ninth arcana likes to study self, surrounding world, and dive into depth of its matter: it's necessary for them to maximally sort out in questions interesting them.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Loyalty" }, { label: "Calmness" }, { label: "Seclusion" }, { label: "Learning new" }, { label: "Understanding people" }, { label: "Tactfulness" }, { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Carefulness" }, { label: "Attentiveness" }, { label: "Desire to convey knowledge" }, { label: "Modesty" }],
                description: "Sage. Closed energy. You love to dive into self and your thoughts. For you it's comfortable to lead a secluded way of life. It happens that you look a bit from above down on people. Your main task — don't close from world, but on contrary shine and convey your knowledge further, otherwise risk becoming a hermit.\nFrom birth you are endowed with special wisdom, you have rich life experience. Know how to interpret situations, give useful advice, thereby help others. You better than rest understand processes and see depth in everything. Subtly feel moods of people, know what's necessary to say and what words to pick. Tactful and attentive to those around.\nYou like solitude and silence, this way you quickly fill with energy. You are comfortable working in solitude or spending time on nature with very self.\nYou are a responsible person who thoroughfully approaches any question and carefully studies everything. You always can be relied on. You keep your word and fulfill promises."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Reservedness" }, { label: "Excessive asceticism" }, { label: "Dislike for self and people" }, { label: "Pride" }, { label: "Judgment" }, { label: "Unwillingness to help" }, { label: "Fear of solitude" }, { label: "Devaluing" }, { label: "Distrustfulness" }, { label: "Indiscriminate ties" }, { label: "Problems with money" }, { label: "Neglect" }, { label: "Fixation on material" }, { label: "Fear of relationships" }, { label: "Uncertainty" }, { label: "Non-realization" }, { label: "Idealization of people" }],
                description: "Secluded way of life leads to reservedness and closedness. You not rarely are alone. Go into asceticness, refusing from all material benefits. Deny money and achievements, what leads to problems with finances. You need to search for balance between spiritual and material.\nWisdom and rich experience provoke you to arrogance and pride, you judge people and any their actions. Not rarely consider self smarter and better. Refuse to help people, what even more drives you into solitude.\nYour energy is subject to impostor syndrome: you are indecisive and constantly doubt in your ideas, fear to convey knowledge to others, since consider that you have insufficient skills and competencies. In end don't realize self and your talents, become apathetic and alone."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Deep knowledge and life wisdom" }, { label: "Striving for learning" }, { label: "Conveying your knowledge" }, { label: "Know how to make process whole" }, { label: "Drawn to spirituality and cognition" }, { label: "Good intuition, high sensitivity" }, { label: "Leadership from position of sage and guru" }, { label: "Helping people" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Reservedness" }, { label: "Hermitry" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSearch for depth in everything you engage in and what fascinates you.\nStudy secret philosophical knowledge and use them for help to others.\nOpen your heart to people, share accumulated experience.\nWork with emotions and feelings, learn to speak openly and honestly.\nTrust people.\nDon't fear solitude, enjoy seclusion and silence.\nDraw strength in walks in solitude. Visit your places of power. More often spend time on nature.\nLearn to be loyal to self, listen to your intuition.\nLead diaries or notes of your thoughts, insights, epiphanies.\nCommunicate only with people pleasant for you and don't waste energy on empty communication.\nYou have huge potential for creation of your unique method or approach, which will have many followers.\nLook at past experience under different angle, extract lessons.\nReceive pleasure from sexual life and closeness with partner."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Any kind of activity which is to your liking will suit you, and you necessarily will succeed in it. Your strong side - intellectual labor. Develop not only logical thinking, but also intuition. Listen to your inner voice. Don't forget to share your knowledge and received information with surrounding people upon necessity. Don't fear solitude, because exactly in seclusion to you come main realizations and discoveries. Main thing - don't go into self for long. Learn to let go of grudges and mistakes of past, with open heart accept new experience into your life. To trust from side of people, answer with same and open your soul. At lack of strength and life energy, it would be not bad to rest on nature."
            },
        ]
    },
    10: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "For tenth energy lightness and joy is important, as well as necessity of constant movement.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Inspiration" }, { label: "Luck" }, { label: "Openness" }, { label: "Leadership" }, { label: "Adventurism" }, { label: "Ideality" }, { label: "Success in matters" }, { label: "Persistence" }, { label: "Intuition" }, { label: "Movement" }, { label: "Sociability" }, { label: "Communicativeness" }, { label: "Kindness" }, { label: "Optimism" }],
                description: "Energy of luck and inspiration. Lucky one in life. Rules and systems are not important for you, you act only from flow. For your energy constant movement and development is important, you generate many new ideas. Can be a leader, but don't strive for this. You are open to new people, knowledge and experience.\nDon't bother over details and don't like routine. Any idea can inspire you, you charge up, start movement and thereby attract success to self. To you suddenly right people are encountered, unexpectedly money comes and circumstances turn out successfully. Main thing, don't deceive and don't act from mercenary goals. And also don't search for easy money or fast earning.\nMaintain state of inspiration — this will strengthen your energy. Engage in favorite matter, spend much time with like-minded people, communicate with different people. In any circumstances remain cheerful and open. If there is no inspiration and movement, then you start to lose luck, become apathetic and risk going into depression.\nKnow how to relax and let go of situation, don't worry over trifles. This only strengthens your energy and attracts even more opportunities into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Heaviness" }, { label: "Tension" }, { label: "Unwillingness to move" }, { label: "Laziness" }, { label: "Passivity" }, { label: "Apathy" }, { label: "Suggestibility" }, { label: "Worries" }, { label: "Pessimism" }, { label: "Disrespect to people" }, { label: "Inconsistency" }, { label: "Unsystematicness" }, { label: "Stubbornness" }, { label: "Harmful habits" }, { label: "Lack of independence" }, { label: "Debts" }, { label: "Fears" }, { label: "Worrisomeness" }],
                description: "Your main minuses — this is absence of movement. You are initiative-less, no ideas and desire to move forward to your goals. As consequence, you lose inspiration and luck. Harmful habits and problems with money can form.\nIf there is no movement in life, then you go into apathy. Constantly whimsical, judge those around and complain on life. Fears - one more manifestation of your minuses. You fear to take for new matter, don't believe in that luck will be on your side.\nMain rule for you: even if lazy, all the same continue at least some movement. This can be whatever: go for walk in park, start reading book, meet with friends or sign up for courses, which you for long time postponed. Activity will lead your energy into plus and all circumstances themselves will start to turn out in successful way."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Luckiness and luck in any matters" }, { label: "Lightness and openness" }, { label: "Kindness" }, { label: "Know how to change reality and conditions under self" }, { label: "You are in the flow" }, { label: "Good intuition" }, { label: "Inspire people" }, { label: "Many friends, sociability" }, { label: "Ideality" }, { label: "Quick on the uptake" }, { label: "Adventurism" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Fixation on money" }, { label: "Heavy routine work" }, { label: "Absence of inspiration" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAvoid stagnation, eradicate laziness and motivate self to move forward.\nTravel, go on spontaneous trips.\nEngage in creativity.\nTake part in interesting projects which inspire you.\nCommunicate with different people, make acquaintances.\nFind for self goal in which you can apply all accumulated experience.\nRefuse from controversial offers which promise easy money.\nConcentrate on your main goals, don't be distracted by secondary tasks.\nLet go of hypercontrol, stop worrying.\nLive in moment here and now.\nCare about well-being of your family.\nRegularly rest, relax: spa, bath with salt, massage, sauna.\nWatch inspiring films, read motivational books.\nLead healthy way of life.\nWork over self-discipline.\nBuild plans and record them in diary. Engage in practices: meditations, yoga, breathing.\nLearn to competently plan your finances.\nReceive pleasure from your activity.\nListen to self and your desires.\nWork in team, inspire and support each other.\nAccept any help.\nVoice aloud your desires and intentions.\nGo your way.\nBe grateful for everything what you already have, and at failure be grateful for experience.\nDevelop your individuality and independence."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Luck will accompany you in everything if you do everything correctly and follow your life path. Trust your fate, listen to hints of your inner voice and follow them. Don't try to radically change something in your life, otherwise luck can turn away from you and difficulties will come. Think positively, relate to everything easily. You need a firm inner core, which will help you in preserving soul equilibrium at any circumstances. Learn discipline and planning. It would be not bad to start a diary and record there your thoughts and realizations. Be active, use to full your opportunities, preserving your individuality, independence and faith in success."
            },
        ]
    },
    11: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "Personalities endowed with this energy possess the gift of seeing potential in people and projects, they are ready to invest their forces to help this potential unfold.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Responsibility" }, { label: "Capacity for work" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Adaptability" }, { label: "Practicality" }, { label: "Curiosity" }, { label: "Individuality" }, { label: "Organizational skills" }, { label: "Skill to lead behind self" }, { label: "Charisma" }, { label: "Sincerity" }, { label: "Integrity" }, { label: "Desire to create new" }, { label: "In what is my potential?" }, { label: "What idea can be promising?" }, { label: "How can I reveal potential of project or person?" }],
                description: "Masculine volitional energy. You are a person with strong character and internal core. Love for work and huge life energy motivate you to move forward. You are practical, search for benefit in everything and build processes maximally effectively, avoiding unnecessary routine and meaningless actions. Constantly study new directions, very curious.\nPossess ability to see and reveal potential: in advance see perspective in project or person, apply efforts for its revealing. You know exactly what idea can shoot in future and on what need to make a stake.\nTo reveal this energy, ask yourself questions:\nYou love to be in first place and feel self a winner. Ready to take responsibility and initiative in your hands, possess leadership entrepreneurial energy. Always strive for individuality, being a charismatic and bright personality. You have good physical strength. Actively engage in sports, you have strong health. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Workaholism" }, { label: "Overstrain" }, { label: "Ignoring problems" }, { label: "Impatience" }, { label: "Aggressiveness" }, { label: "Irritability" }, { label: "Suppressing others" }, { label: "Laziness" }, { label: "Whining" }, { label: "Rudeness" }, { label: "Powerlessness" }, { label: "Weakness" }, { label: "Indecisiveness" }, { label: "Conflictness" }, { label: "Hysteria" }, { label: "Greed" }, { label: "Problems with mom" }, { label: "Problems in sex" }],
                description: "Due to excessive workaholism you overstrain too much at work and rest little. Press on people and force to work beyond measure. Become impatient, lead self audaciously and rudely. Or on the contrary, lack of will power and decisiveness force you to be lazy and complain on life, what leads to weak-characteredness.\nYou fear conflicts and try to avoid them, but on other hand cannot control your emotions and start to quarrel without visible reasons. Happen to be petty and greedy.\nLikely, in childhood there was strong role model in person of mom, who unconsciously suppressed you or self and her desires, what led to tense relationships between you.\nYou don't accept your body and sexuality, constantly ill, lead unhealthy way of life and are shy of your appearance."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "You see potential and future trends" }, { label: "Good physical form and endurance" }, { label: "High capacity for work" }, { label: "Inspire and motivate people" }, { label: "Leadership" }, { label: "Can engage in healing" }, { label: "Possess large life energy" }, { label: "Overcome obstacles" }, { label: "Volitional character" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Aggressiveness" }, { label: "Excessive workaholism" }, { label: "Impatience" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to manage your strength, use it for good.\nEngage in sports and lead active healthy way of life.\nCommunicate with successful people, get inspired.\nLearn to be in state of here and now.\nManage your emotions.\nWatch after voice and speech, don't use imperative tone.\nThink through strategy, record plans and follow them.\nBe calm and patient.\nDon't judge unhurriedness of others.\nBecome leader in your sphere.\nLearn to yield and go for compromise.\nInteract with people, and not suppress.\nMore often be on nature.\nRest, relax, meditate."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to timely relax and rest. Engage in development of body and alternate with full relaxation. Don't press and don't rush people, accept them such as they are. Not everyone has so much energy and life force, how much it is in you, don't forget about this. Don't overstrain, delegate part of your matters, master time-management. Control flashes of anger. Develop spiritually to learn to manage your energy. It's not worth going to result by any way and achieve everything by force, otherwise you will create for self enemies or obstacles in empty place. Grow up, gain independence and “cut umbilical cord” in relationships with mom. Desirably not to share your plans with her - if she will not approve your choice, you will not be able to implement what was planned."
            },
        ]
    },
    12: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "Twelfth energy means “suspendedness”. Person sees the world as if upside down, differently, in other way, not like others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Compassion" }, { label: "Support" }, { label: "Healing" }, { label: "Generation of ideas" }, { label: "Self-discipline" }, { label: "Openness" }, { label: "Love for learning" }, { label: "Easy resolution of problems" }, { label: "Amorousness" }, { label: "Inventiveness" }, { label: "Individuality" }, { label: "Love for nature" }, { label: "Sensitivity" }],
                description: "You look at world differently, not like everyone. You have a different look on processes and events. Know how to see and interpret signs and symbols which are understandable only to you. Love to do everything in your own way, creatively and innovatively approach resolution of any task, so, as no one did this before. You are a bright individuality, see self as special and stand out among others.\nYou are an idea-person. Well-read, can with ease explain even the most complex information. Work in flow, come up with ideas on the go and love to improvise. This is your element. Feel people, energy, space well. Extremely inventive, what at times helps to find non-standard way out of difficult situation.\nYou have an open and kind heart. Responsive and ready to always come to help. At times can go into victimhood, forgetting about self and your desires. You need to learn to say people “no”.\nYou like to make people's lives better, what brings internal satisfaction. More often act not from logic, but in sincere impulse of soul. Know how to serve selflessly, not demanding anything in return. Accept people such as they are."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Victimhood" }, { label: "Touchiness" }, { label: "Depressions" }, { label: "Negativity" }, { label: "Inability to refuse" }, { label: "Desire to be good" }, { label: "Doubts" }, { label: "Non-confidence" }, { label: "Need for love" }, { label: "Strong attachment to people" }, { label: "Panic" }, { label: "Self-destruction" }, { label: "Subconscious feeling of guilt" }, { label: "Lack of money" }, { label: "Dislike for self" }, { label: "Illusions" }],
                description: "You are in the role of victim. It seems to you that you do everything for people, but don't get anything in return. Much you take close to heart, extremely vulnerable and touchy. In aggregate all this can lead to self-destruction: problems with alcohol, dependencies, depression and solitude.\nAt times forget about self and your desires. Try to be good for everyone. Don't know how to say “no” to other people. Very dependent on opinion of those around, constantly wait for praise and approval. If you don't get them, start to blame and hate self. Accept self and people such as they are. Don't build illusions and expectations.\nThere can be problems with creativity and unique look on life. It's difficult for you to realize your own ideas, often stay in creative crisis. Don't know how to promote your vision, doubts and non-confidence in self interfere. Hence non-realizedness.\nValue and love self, care about your comfort and put your desires in priority."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Vulnerability" }, { label: "Creative non-standard thinking" }, { label: "Many innovative ideas" }, { label: "Strong creative energy" }, { label: "Selflessly help others" }, { label: "Feel people well" }, { label: "Strong intuition" }, { label: "Musical abilities" }, { label: "Bring novelty and your unique vision into projects and work" }, { label: "Rich imagination" }, { label: "Know how to improvise" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Victimhood" }, { label: "Non-confidence" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to look at habitual things in a new way.\nDevelop creativity.\nLearn everything unusual and interesting.\nDevelop writing skills.\nLearn to non-standardly approach resolution of tasks.\nSay \"no\" in time and don't take on self someone else's work.\nClearly build personal boundaries.\nDon't devalue your labor, set fair price.\nRaise self-esteem, strengthen faith in self.\nMake yourself presents and learn to live for self, and not only for sake of others.\nIt's important to love self and exit from state of victim.\nDo kind deeds not expecting approval.\nSupport social projects, help those in need, engage in volunteer activity.\nFigure out why you attract negative situations in which you are offended, not valued or used."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Gift love and care, and also learn to accept them. Help others, but also manage to develop, realizing your creativity and participating in unusual projects. This will charge you with energy and positive. Help only those who needs this, in this consists your destiny. But don't try to please everyone, this will lead to tiredness, burnout and depression. It's important for you to let go of people and situations, not hold on to old, control your life. Don't be a victim and know how to stand up for self. Don't act to detriment of self, help only from state of filledness and abundance. Don't be shy to take money for your work and learn timely to refuse. Exit from state of longing and apathy. In this creativity, physical activity and travels will help you."
            },
        ]
    },
    13: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "Thirteenth energy doesn't have a specific archetype, it is structureless.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love for life" }, { label: "Bravery" }, { label: "Activity" }, { label: "Fearlessness" }, { label: "Inspiration" }, { label: "Desire for changes" }, { label: "Straightforwardness" }, { label: "Honesty" }, { label: "Unpredictability" }, { label: "Leadership" }, { label: "Adaptability" }, { label: "Sexuality" }, { label: "Efficiency" }, { label: "Practicality" }],
                description: "You are an interesting and unusual person. You are surrounded by atmosphere of mysteriousness and mysticism. Structureless esoteric energy.\nYou are capable to transform thinking of people or working processes. Inspire into new, help overcome difficulties and non-simple events. It's important for you to constantly change something in your life, receive new experience, go to the end, having refused from fears and doubts. Global transformations interest you which will help make life better.\nYou know how to refuse from old and obsolete, that what already long ago doesn't work. You don't like predictability. Any stability you break and change under yourself.\nIntersted in different aspects of life, curious and creative, easily get involved in everything new and unusual.\nAlways hold self confidently and will not get lost even in extreme situation. Easily concentrate, and in complex conditions act without panic. You have dulled fear of danger, therefore extreme types of sport can attract you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Harshness" }, { label: "Pessimism" }, { label: "Aggressiveness" }, { label: "Fear of death" }, { label: "Recklessness" }, { label: "Fussiness" }, { label: "Timidity" }, { label: "Passivity" }, { label: "Stagnation" }, { label: "Coldness" }, { label: "Calculativeness" }, { label: "Carelessness" }, { label: "Riskiness" }],
                description: "If energy is in minus zone, then you fear changes. It's fearful for you to go into new, you get stuck on one place and don't realize your talents. Clutch at past and already obsolete. Accumulate junk at home, stack, preserve and fear to lose.\nIn minus doubts in self appear, fears, unnecessary fussiness. If you will not act independently, then your energy self will start to attract forced changes: dismissals, loss of loved ones or money and so on.\nOn other hand, you can lead self harshly and aggressively. Try to bring changes forcibly where they are not ready yet for them. There can be mood swings, excessive emotionality. Constantly change work, cannot choose something one. Can take for several matters at once and not a single one lead to end.\nLove to stay on edge of life and death, go for unsubstantiated and at times stupid risk. Situations are not excluded where you can turn out on edge of life and death: accidents, illnesses, clinical death."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Readiness to start everything from clean sheet" }, { label: "Easily refuse from past, change and transform reality" }, { label: "Not afraid of death, can work in extreme conditions" }, { label: "Preserve clarity of thinking even in critical situations" }, { label: "Perceive any crisis as point of growth" }, { label: "Search for new alternative paths" }, { label: "Create something revolutionary" }, { label: "Productive and multi-tasking" }, { label: "Pull people out of comfort zone" }, { label: "Can in any system find weak link and make it more effective" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Resistance to changes" }, { label: "Fears and doubts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nSet order in matters, things and relationships.\nFix in writing your ideas, plans and dreams.\nEngage in creativity.\nGet rid of that what doesn't lead you to result.\nDon't take for multitude of matters at once, concentrate on something one.\nLead any matter to end.\nLearn to be more calm and peaceful.\nLive here and now, get rid of fussiness.\nStop being afraid for relatives and close ones, as well as excessively worry.\nBe joyful and optimistic.\nExperiment in all spheres: in relationships, at work, with style in clothing, interior of home and so on.\nIf you risk, then justifiedly.\nWork over positive thinking, search for pluses even in the most complex situations.\nRecord good what happened with you during day.\nBravely start new stages in your life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "From birth you are endowed with excellent memory, strength and skill to concentrate and lead self collectedly in complex situations. You easily can teach people that what you know yourselves, since you understand and accept logic of happening events. One can try self in role of rescuer or crisis-manager for that to ecologically apply your interest to situations on edge. It's not worth going for unjustified, reckless risk, but better to apply your opportunities for help to people. Don't try to interfere into course of events which even so happen harmoniously, without your participation. Avoid imposing your opinion on surrounding people. Refusal from old and construction of new should be planned and expected, both in system self, and in life of people. Learn to listen and hear self, your internal sensations. Learn to control emotions, as well as live by your own energetic cycles. Allow yourself from time to time to relax and value your life."
            },
        ]
    },
    14: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "First orientation of this energy — creativity, creation of works of art.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Softness" }, { label: "Sensitivity" }, { label: "Intellectuality" }, { label: "Soulfulness" }, { label: "Healing" }, { label: "Morality" }, { label: "Wisdom" }, { label: "Calm" }, { label: "Harmoniousness" }, { label: "Modesty" }, { label: "Patience" }, { label: "Decency" }, { label: "Nobility" }, { label: "Delicate taste" }, { label: "Refinement" }],
                description: "Soft creative energy. You are a refined nature who possesses strong spiritual and healing energy. You live and create in flow.\nYou inspire people and charge them. Energy can manifest through creativity, creation and spirituality.\nFirst variant — creation of your art, own creative magic. You like to create in solitude and calm. You connect to flow, and ideas themselves come into your head. In you there is depth and internal peace. You understand own desires and strivings. Inside you there is always harmony.\nAlso you possess internal core and strength of spirit. Can be leader among creative people, unite them around into collective to create together.\nSecond variant — this is psychology, spirituality, healing and esoterics. You study secret esoteric knowledge. You have powerful flow energy. You delicately feel people and know how to help them. Possibly, there are abilities for healing. High intellect.\nOften live by mood and inspiration. You are a soulful person with whom it's always interesting to talk on different themes. Constantly study new and share knowledge with others.\nYou have moral landmark to which you strive. You are a decent and noble person: communicate with people honestly and openly, not deceiving either self or others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Callousness" }, { label: "Soul-less-ness" }, { label: "Attachment to material" }, { label: "Touchiness" }, { label: "Impulsiveness" }, { label: "Infantilism" }, { label: "Going into extremes" }, { label: "Desire to punish and blame" }, { label: "Rudeness" }, { label: "Capriciousness" }, { label: "Immoderation" }, { label: "Greed" }, { label: "Vulnerability" }],
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme, at times you yourself cannot decide what you want. Excessively sensitive. You are easy to offend and touch. Don't perceive criticism towards self, even constructive.\nOr, on contrary, you manifest harshness, daring and callousness. You are closed from people. Lead self rudely and often happen to be impulsive. Can get angry, drop everything, and then regret about taken decision.\nThere is risk to acquire strong dependency or harmful addictions.\nToo much hold onto past, don't know how to forgive and let go. Not rarely there are periods of emptiness and non-belief in own forces and possibilities.\nYou get attached to money and material values. Don't know sense of measure, you always have little of everything. Don't realize self in creativity."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Not valuing what you have" }, { label: "Impatience" }, { label: "Touchiness" }, { label: "Vulnerability" }, { label: "Greed" }, { label: "Whining" }, { label: "Rudeness" }, { label: "Live in state of flow" }, { label: "Creative skills" }, { label: "High sensitivity" }, { label: "Calm and trust to world" }, { label: "Healing: know how to help person" }, { label: "High level of intellect" }, { label: "Deep wisdom which you can transmit through creativity" }, { label: "Rich imagination" }, { label: "Internal nobility and honesty" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nExpress emotions openly, don't suppress them.\nFight with bad habits, lead healthy way of life.\nManifest honesty and openness in matters and with people.\nLearn moderation and patience.\nReceive high from uncertainty and unpredictability.\nMeditate, engage in spiritual practices.\nInspire self through study of art: music, literature, painting, theater.\nRest, take hot bath, visit baths, saunas, aroma-steaming.\nWalk more often in parks and outside city.\nLeave for new places.\nVisit your places of power.\nMaster new directions for self.\nCombine creativity and income.\nListen to your internal voice, develop intuition, take decisions based on internal sensations."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Delicate soul organization is given to you for that to you could find beautiful even in common things. You can engage in creativity to bring your vision to other people. It's best of all to write verses and create musical works in solitude, but it's important not to close in self. It's necessary for you to maintain connection with surrounding world, where you draw inspiration.\nGet rid of negative emotions, nourish your reason and cleanse soul. Nourish by positive energy from works of art. Spend more time by water. In general, all contacts with water are very useful for you.\nFight with dependencies and your weaknesses, avoid immoderation in everything. Always believe in self and your creative possibilities, develop them."
            },
        ]
    },
    15: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "Characteristic feature of person possessing fifteenth energy is that those surrounding him often experience irritation, anger and hatred during interaction with him.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energetic" }, { label: "Positive" }, { label: "Love for entertainment and pleasures" }, { label: "Love for material values" }, { label: "Good intuition" }, { label: "Clairvoyance" }, { label: "Wisdom" }, { label: "Understanding of essence of things" }, { label: "Luck" }, { label: "Fascination" }, { label: "Attractiveness" }, { label: "Style" }, { label: "Oratorical abilities" }, { label: "Openness to trips and adventures" }, { label: "Compassion" }, { label: "Kindness" }, { label: "Ability to help others" }, { label: "Sexuality" }],
                description: "You have a strong energy of temptation. X-ray person: you see all subtleties and defects in another person or work process, you know how to fix it and make it better. You can trigger people, call up negative emotions and lift their internal work-throughs outside.\nYou help to fix self and become better, but do this in your special way — through temptations. However you also are subject to different temptations. You love pleasures, luxury and comfort. You love money and value benefits, but don't get fixated on them. Know how to hold balance between material and spiritual.\nYou know how to find approach to person, immediately see where to press and where his painful points are located. You are diplomatic, know how to negotiate.\nYou have good connection with internal voice, intuition and higher forces. Possess gift of clairvoyance. Know how to charge and direct other people. Strong esoteric energy. You are possessor of deep knowledge, therefore they often turn to you for advice. Always look good, dress stylishly, attract people by external appearance and bright charisma. Sexual and charming.\nMuch internal energy, you want to create and create, generate ideas, move forward to your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Aggressiveness" }, { label: "Jealousy" }, { label: "Envy" }, { label: "Vulnerability" }, { label: "Dependencies" }, { label: "Arrogance" }, { label: "Thirst for power" }, { label: "Pride" }, { label: "Fixation on material" }, { label: "Suppression of people" }, { label: "Rigidity" }, { label: "Deception for sake of profit" }, { label: "Greed" }, { label: "Selfishness" }, { label: "Betrayal" }, { label: "Black magic" }, { label: "Excessive control" }, { label: "Manipulations" }, { label: "Stubbornness" }, { label: "Irritability" }, { label: "Criticality" }],
                description: "You can fall into different dependencies and temptations (alcohol, drugs etc.).\nManipulate people, press on their weak points, know how to touch and wound. Deceive in selfish goals. Can lead self arrogantly, want to possess power over people and try to suppress. Critically relate to opinion of others, not ready to hear and listen, dispute, lead self stubbornly, get irritated by any reason.\nIn character there are selfishness and pride. You think only about yourself and your desires, putting other people as nothing.\nLove for luxury and excessive striving for material benefits make you greedy fixated on money, what interferes with revealing of talents.\nCan excessively guard near ones, even manifest rigidity and aggression to them. Not rarely there are situations when you betray person close to you for sake of temptations and desires."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "You see weakness in people and help them overcome them" }, { label: "You establish ties, know how to negotiate" }, { label: "Can engage in healing" }, { label: "Easily earn money" }, { label: "See subtleties and details which need to be fixed in anything" }, { label: "Charm, sexuality, attractiveness" }, { label: "Good manipulator" }, { label: "Sense of humor" }, { label: "Helping people become better" }, { label: "Powerful intuition" }, { label: "Oratorical abilities" }, { label: "Bright charisma" }, { label: "Strive for or possess power" }, { label: "Easily exit from any situation" }, { label: "See people through: for this they can love and hate you" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Dependencies" }, { label: "Manipulations" }, { label: "Greed" }, { label: "Aggression" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nLearn to see world and people through prism of good.\nDevelop spiritually.\nWork over internal aggression.\nGet rid of cynicism and selfishness.\nAccept and forgive people, learn to be flexible.\nOpen your heart for love, learn to gift it to others.\nHelp people become better.\nLearn to relax and trust.\nDon't manipulate people.\nEngage in spiritual practices, yoga, meditation.\nActivate your sexual energy.\nEngage in creativity.\nFor men it's good to engage in martial arts, take care of self and find one's style.\nTake care of your body, pamper self.\nLearn to ecologically get rid of negative emotions.\nCorrectly tell people about their defects. Free self from bad habits and harmful dependencies.\nWorthily pass all trials by large money.\nWith ease accept and let go money.\nBe grateful for that what already you have.\nHold balance between spiritual and material."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your unique abilities need constant development, never stop on achieved. Shift focus of your attention from material values to spiritual development. Learn to see in people not only their weaknesses and vices, but also their strong sides. Accept events happening in your life unconditionally and try to preserve positive in any situation. Always observe balance \"take-give\" if you are aimed at further development and prosperity. Don't criticize people for their weaknesses, but on contrary, support them and help grow. Avoid use of your strength for control over people. Learn to easily let go unpleasant situations and abstract from them. Accept the fact that every person is free to act and live proceeding from one's views and beliefs, even if they are far from truth."
            },
        ]
    },
    16: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "In plus such person can create new, often thanks to destruction of old.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Spirituality" }, { label: "Clairvoyance" }, { label: "Energetic" }, { label: "Strength of spirit" }, { label: "Innovation" }, { label: "Leadership" }, { label: "Determination" }, { label: "Adventurism" }, { label: "Adaptability" }, { label: "Bravery" }, { label: "Development" }, { label: "Self-knowledge" }, { label: "Creativity" }, { label: "Creation" }, { label: "Honesty" }],
                description: "You live here and now, look differently at things and events. Thanks to life experience you are capable to change world-view and extract important lessons from past.\nStrong daring energy. You are not afraid to go into new, open to changes, thanks to what you receive positive changes in life. You destroy old, dishonest, insincere, not real and create on this place new. This can be new work, completion of old relationships, change of place of residence and so on.\nYou are a self-confident person who stands firmly on feet. Possessor of powerful strength and energy. Can inspire others, lead behind self, motivate for changes. Good ideological leader and mentor will come out of you. You have a kind and honest heart, ideas are always driving you, directed at help to others. You don't get fixated on money and material, concentrating on your ambitious ideas and their realization. Easily adapt to any conditions, can even live in asceticism if goal requires this.\nAlso you have non-standard thinking and rich imagination. Strong flow energy: you generate creative ideas which move you forward. Love to reflect, search, try. Constantly develop and cognize new. Spiritual energy: you like deep esoteric knowledge, different practices, unusual experience. You want to try everything on yourself. Boldly experiment and search for your own."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Health problems" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Hot-temperedness" }, { label: "Destructiveness" }, { label: "Lack of spirituality" }, { label: "Attachment to old" }, { label: "Chaoticness" }, { label: "Pull to dangerous" }, { label: "Unmanageability" }, { label: "Fraud" }, { label: "Deception" }, { label: "Dependencies" }, { label: "Helplessness" }, { label: "Vulnerability" }],
                description: "First important minus by your energy — excessive rigidity. You cut from shoulder, say in face of person everything what you think, happens to be incorrect and categorical. Aggressively go break-through and often over heads for sake of your goal. Bear destruction instead of creation.\nMaterial values and money drive you, you refuse from spiritual and can fall into dependencies. Start to deceive self and people. If you now have problems with health, then this is clear sign of energy in minus.\nOther side of minus energy — this is sluggishness, indecisiveness, doubts and strong attachment to old. You fear changes, not ready to go into new, it's scary for you to manifest and open to people. You don't have ideas, don't understand where you want to move. Not ready to lead people, refuse from leadership and ambitions.\nIf you won't develop, then life will force you to do this in sharp, unpredictable and sad way — through loss of work, near person, money and so on."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Doing something new, innovation" }, { label: "Leadership" }, { label: "New vision" }, { label: "Renew, transform for good, create" }, { label: "Lead behind self people, inspire for changes" }, { label: "Powerful energy" }, { label: "Creativity" }, { label: "Love for new" }, { label: "Confidence, calm" }, { label: "Feel the flow, strong intuition" }, { label: "Easily adapt under any conditions, ready for asceticism" }, { label: "Spirituality" }, { label: "Not attached to material, move for idea" }, { label: "Optimism, positive thinking" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nAct decisively and boldly, don't doubt in self.\nWork over self, become better than yesterday.\nLearn to live consciously, be grateful for everything what already you have.\nRefuse from old beliefs and settings.\nCleanse your space, do decluttering, conduct cleanings.\nTravel, study new cultures, search for inspiration.\nPractice various austerities.\nMeditate, engage in yoga, read spiritual and esoteric literature.\nWork over internal aggression and free self from negative emotions.\nStrengthen your physical health, engage in sport.\nTake care of your body: spa, baths, massage, saunas.\nCalmly and with gratitude accept any changes in life.\nGo out to nature: to mountains or to sea.\nChange environment if it starts to pull you down.\nDevelop and change your life for better.\nShare new knowledge with people, be open, trust.\nNot to regret about past, free self from old.\nLearn to alternate activity and peace."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Try to support your physical body, leading correct way of life, and, at this, don't forget about spiritual development. Don't cling to old, boldly go forward, towards changes. Learn to trust people, open your heart, gift them your love, share your knowledge and experience. Having chosen your path, cast off all doubts and boldly go forward. You will be able to lead behind self many people if your path is correct. Develop in self skill of awareness, easily let go old: people, things, relationships, settings. Leave past in past, don't look back. Learn to see signs which fate and Universe send, listen to self and your internal voice. It is under your power to launch new cycles of life, awaken people, show habitual things in different light. Use your abilities for good, as well as, transmit your spiritual experience."
            },
        ]
    },
    17: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "People with such energy possess a strong ego, they strive for leadership and don't wish to stay in shade.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Desire to be in center of attention" }, { label: "Brightness" }, { label: "Emotionality" }, { label: "Artistry" }, { label: "Charm" }, { label: "Love for self" }, { label: "Lightness" }, { label: "Sensitivity" }, { label: "Intuition" }, { label: "Individuality" }, { label: "Imagination" }, { label: "Optimism" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Openness" }],
                description: "Soft creative energy. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for a dream and listen only to the internal voice.\nYou shine for those around you, you are in the center of attention, you are admired and you are imitated. You like publicity and fame. You don't like to be in the shade and in second roles. Ambitiousness and large-scale goals motivate to move forward, to create, to produce and to demonstrate self and one's talents to the world.\nYou have an attractive appearance, you take care of self and one's body. Often you receive compliments and attract gazes.\nYou possess a unique imagination and creative thinking. You know how to create art which will please many. You draw inspiration from nature and from communication with like-minded people.\nYou are a kind and open person. You can heal others, thanks to your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics. You study everything new and try it on yourself."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Unrealizedness" }, { label: "Lack of confidence" }, { label: "Pride" }, { label: "Stardom" }, { label: "Vanity" }, { label: "Fixation on material" }, { label: "Withdrawal from reality" }, { label: "Deception" }, { label: "Illusions" }, { label: "Selfishness" }, { label: "Fear of unknown" }, { label: "Problems with sexuality" }],
                description: "First variant of manifestation of minuses by energy — this is unrealizedness. You stay in shade, don't reveal your talents, doubt in self and your forces. Don't understand where to move, what to engage in and what inspires you. You are shy to stay in center of attention, don't like to be in sight and lead a closed way of life. Confident in self, you fear everything and refuse to implement your dream. Stay in creative crisis.\nSecond variant — pride, vanity, star sickness. You go away from reality, start to get stuck up, behave with people selfishly, command, manipulate, often advance your requirements and conditions. Not ready to go for compromise. Get fixated on your success, money and material benefits, forgetting about spiritual. Live in own illusions, can fall into dependencies: alcohol, drugs, promiscuous way of life and so on.\nDeceive self, thinking that with other people something is not so instead of that to search for root of problem in self.\nDon't accept your appearance, consider yourself an unattractive and ugly person. Often there are problems with sexuality. Shy of self and one's body."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Creative abilities" }, { label: "Uniqueness" }, { label: "Own vision" }, { label: "Bright charisma" }, { label: "Rich imagination" }, { label: "High sensitivity" }, { label: "Publicity, openness, trust" }, { label: "Strong sexual energetics" }, { label: "Positive thinking" }, { label: "Individuality" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nWrite down your goal and in what way you can implement it.\nShare your thoughts and ideas with close people, receive support from them.\nReveal your creative potential, show to the world your talents.\nEngage in creativity, create, invent, manifest.\nFind favorite matter which will inspire you.\nFollow impulses of your heart, develop intuition.\nCommunicate with like-minded people, get acquainted with different people, be open to communication.\nDon't fear to experiment, be bright.\nVisit parties and events, go out into world.\nDress up, think through your image and style.\nAccept your uniqueness, share it with the world.\nRefuse from pride and vanity. Be open, gift love.\nAllow self to be successful and famous.\nBecome example for many, inspire people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Live real life, but don't refuse from your creative abilities. Develop your strong sides, but remember that success is based on diligence and hard work. Don't forget to set clear goals before self, but choose that activity which is according to your soul. If you choose a creative profession, for example: actor or singer, then do this not so much for sake of fame, but for help to people. In your roles and images you can show that, what's worth avoiding in reality, you give life lessons. Look at various situations with optimism and always preserve calm. Avoid extremes: learn to overcome periods of despondency and absence of faith in own forces. For support of your physical body, as well as soul equilibrium, choose balanced nutrition, regular engagements in sport and rest in nature. Choose moderation in everything."
            },
        ]
    },
    18: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy that is associated with the astral body, intuition, sensing.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Mystery" }, { label: "Intuition" }, { label: "Materialization of thoughts" }, { label: "Liberation from fears" }, { label: "Strong imagination" }, { label: "Attractiveness" }, { label: "Sensitivity" }, { label: "Versatility" }, { label: "Success" }, { label: "Striving for beauty" }, { label: "Fast learning ability" }, { label: "Artistry" }, { label: "Positive thinking" }, { label: "Creative abilities" }, { label: "Fast exit from negative" }, { label: "Interest in knowledge" }],
                description: "Structureless soft energy. Your energy is related to deep immersion. You possess strong intuition and the ability to attract what you desire, so it is so important for you to think positively and fight fears, otherwise you will attract them into your life.\nYou like to study everything related to the unconscious and magical, you are fond of spiritual and esoteric practices. You are mysterious and attractive to other people, you like to decorate your body: tattoos, piercing, bright hair, unusual appearance, etc.\nYou can calmly \"fly away\" from the external, real world and go into your subconscious. Often you are in your own fantasies and thoughts, not noticing the surrounding environment. You prefer everything abstract, creative, and unusual. Structure, system, and order are not for you.\nYou create your magic in your work or creativity, think non-standardly, are fond of esoterics, meditations, tarot, etc. You go your own way and do everything in your own way, not paying attention to the opinions of other people. You listen only to your internal voice.\nYou are a soft and kind person, easily adapt to any conditions. You have a strongly developed sensing of yourself. You know how to help, what to say and do in a specific situation. People often turn to you for advice. You are interested in different directions of activity, whatever you take up, everything works out easily and without strain. You have a strong connection with the Moon and lunar cycles. The full moon has an especially strong impact on you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Withdrawal from reality" }, { label: "Addictions" }, { label: "Depressiveness" }, { label: "Anxiety" }, { label: "Hypocrisy" }, { label: "Doubts" }, { label: "Closedness" }, { label: "Victim state" }, { label: "Destruction" }, { label: "Inaction" }, { label: "Unrealizedness" }, { label: "Vindictiveness" }, { label: "Resentfulness" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Indecisiveness" }, { label: "Whining" }, { label: "Anger" }, { label: "Touchiness" }, { label: "Inertness" }, { label: "Pessimism" }, { label: "Loneliness" }, { label: "Non-acceptance of sexuality" }, { label: "Magic to harm others" }],
                description: "The first direction of minuses by your energy is excessive closedness and withdrawal from reality. It can reach addictions (alcohol, drugs, etc.) and depressions. You are capable of immersing yourself in your thoughts so much that you refuse to contact the real world. Sometimes you behave hypocritically, smiling to the face, but inside experiencing indignation and condemnation towards the person. You may like gossip.\nThe second direction of minuses is fears. You constantly doubt, fear, cannot make a decision and take responsibility. You stay in the victim state, complain about the injustice of life, whine a lot, but do nothing. It's difficult for you to make the first step towards your goal, you are inert and slow. All this leads to unrealizedness, closedness, and resentment at the whole world.\nIt's important for you to maintain positive thinking, not immersing in pessimism and negative. Your energy is capable of attracting everything you think about, so all fears and worries can easily be realized for you. Do not use your abilities to harm others (evil eye, damage, etc.)."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Strong imagination" }, { label: "Powerful intuition" }, { label: "Feeling people, space, energy well" }, { label: "Interest in deep and esoteric knowledge" }, { label: "Creativity, unique approach" }, { label: "Clairvoyance" }, { label: "Artistry, charm, attractiveness" }, { label: "Healing" }, { label: "Positive influence on others" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nIn moments of strong anxiety and fear let worries through self, try to understand what precisely causes fear in you.\nWork through your fears: live through and let go.\nFocus on specific tasks and actions which will lead you to desired result.\nDevelop intuition.\nThink positively, make vision boards, be grateful for everything what you already have in your life.\nTrust others, speak truth.\nBe more often in nature, especially near water.\nLead healthy way of life.\nDevelop your talents.\nStop doubting your possibilities.\nVisualize positive, successful images.\nLearn to see opportunities in life and use them.\nThink creatively, use your non-standard approach in any matter.\nCommunicate with different creative people, get acquainted, don't close in self."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Devote more attention to development of creative abilities. Create kind and positive emotions, surrounding self with pleasant people. Listen to your sensations and intuition, following your life rhythms. Start visualization from phone wallpaper and continue with vision board for implementation of what is desired. Maintain purity of thoughts and emotions, concentrating attention on positive. Meditations near water, walks or swimming can balance you and bring internal harmony. Keep gratitude diary for getting rid of fears and doubts. Having realized your power, direct it into help to others, this will be favorable for you. Don't refuse from esoteric knowledge and your abilities, however preserve real and sober look on things. Live consciously, independently defining your priorities."
            },
        ]
    },
    19: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Energeticness" }, { label: "Leadership" }, { label: "Carefulness" }, { label: "Love of life" }, { label: "Optimism" }, { label: "Success" }, { label: "Authoritativeness" }, { label: "Desire to help" }, { label: "Wellbeing" }, { label: "Creativity" }, { label: "Collectiveness" }, { label: "Activity" }, { label: "Ambitiousness" }, { label: "Kindness" }, { label: "Lightness" }, { label: "Curiosity" }, { label: "Sexuality" }],
                description: "Leadership energy. You are a team player and are an authority for other people. You like to be in the center of attention, you have big ambitions and global goals. Your energy is the energy of the Sun. You carry warmth, light, and goodness to people through work, communication, actions. You are ready to shine and inspire, always smiling and charming. You have positive thinking and a huge flow of life energy that helps to move towards the goal. You love to engage in kind, charitable projects aimed at helping people, nature, animals, etc.\nYou are an ideological person, it is important for you that the goal inspires and charges you. You are not ready to work only for money or material values. If there is a cool idea that you burn with, the result will not keep you waiting. You are ready to take on large-scale projects that affect many people around the world.\nYou like to engage in creativity, create new things, and show creativity. You are free in your manifestation and always achieve success in the chosen activity.\nYou have a strong connection with nature. You can pass powerful streams of energy through yourself, which help in achieving global goals. You are a \"battery\" person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Egoism" }, { label: "Hot temper" }, { label: "Aggressiveness" }, { label: "Fixation on the material" }, { label: "Irresponsibility" }, { label: "Fear of big projects" }, { label: "Pride" }, { label: "Fanaticism" }, { label: "Envy" }, { label: "Powerfulness" }, { label: "Rudeness" }, { label: "Feeling of guilt" }, { label: "Illnesses" }, { label: "Fuss" }, { label: "Chaoticness" }, { label: "Bad relationships with father" }],
                description: "The first manifestation of minuses by your energy is rigidity and excessive demandingness towards people. You set impossible goals and unrealistic deadlines, pressure your subordinates, and sometimes demand fulfillment of set tasks in an aggressive form. You manifest hypercontrol and do not trust loved ones. You can reach fanaticism in your cause. You behave powerfully and despotically with those around you.\nYou often envy, constantly comparing yourself with others. At the same time, you have an inflated ego, you pay attention only to yourself, fixate on your desires, not thinking about others. Not infrequently you focus only on money and financial success, completely forgetting about the higher goal and inspiration. The second manifestation is fading, apathy, doubts, and fears. You are not ready to take responsibility and become a leader, you are afraid to move towards your goal, you get lost and act chaotically. Fear to start a big, global project is possible, since you constantly experience a feeling of guilt, doubt, and dissatisfaction with yourself.\nIn childhood, bad relationships with father could have formed, or he was a powerful and despotic person, suppressed you and your desires, or the reverse situation — he was too soft, indecisive, and others suppressed him."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Leadership" }, { label: "Optimism" }, { label: "Ambitiousness" }, { label: "Lightness in life" }, { label: "Burning with an idea, moving forward, inspiring others" }, { label: "Creativity, unique approach" }, { label: "Quickly find contact with children" }, { label: "Positive thinking" }, { label: "Huge life energy" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nRemember, every person has right of choice. Don't judge and don't force to act against will.\nBe an example for others.\nCommunicate, get acquainted with new people, be open and benevolent.\nSupport loved ones.\nRegularly rest and care for self: spa, massage, hot bath, bathhouse, sauna.\nThink positively.\nEngage in creativity, develop your creative skills.\nEngage in charity, help others.\nWake up early, do exercises, meditate. Morning is time of big energy for you.\nBe grateful for what you have already now.\nEngage in sport, lead active way of life.\nDevelop your oratory talents, one can engage in vocal.\nGet rid of aggression and feeling of guilt.\nLearn to rejoice in simple things.\nThink globally. Work through childhood traumas and heal your internal child."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "It's important to realize self in society, be open, manifest one's knowledge and embody most large and ambitious projects. Don't be afraid to take responsibility upon self and learn flexibility, if one has to correct plans by external circumstances not depending on you. Don't forget also about creative side of your personality, which is important to realize at least in form of hobby. Avoid excessive workaholism and control over people and circumstances. Don't forget to rest and care for self. Concentrate on positive moments and don't collapse all your energy and love on one person. For you it's important to live and act in society. It's important to engage in favorite cause, and not work only for sake of prestige and money. Then you will be able to achieve real success and prosperity in finances."
            },
        ]
    },
    20: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "This energy is one of the most complex to understand.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Claircognizance" }, { label: "Healing" }, { label: "Intuition" }, { label: "Ideologicalness" }, { label: "Mysteriousness" }, { label: "Sensitivity" }, { label: "Interest in the unusual" }, { label: "Versatility" }, { label: "Wisdom" }, { label: "Stability" }, { label: "Authoritativeness" }, { label: "Adaptability" }, { label: "Ability to manage" }, { label: "Scale" }, { label: "Family-orientedness" }, { label: "Connection with ancestry" }],
                description: "You have a talent for uniting and creating something integral. You can create new projects, unique products, or unite people. You manage to find a balance between the spiritual and the material. You see what a person or a project lacks to become integral, what flaws and shortcomings exist, and how to fix them.\nYou have strong sensitivity and a powerful gift of clairvoyance. When you live in a flow, interesting ideas and insights can unexpectedly come. Intuition is well-developed, you trust your internal voice. You are sometimes mysterious in the eyes of other people.\nYou like to help. You possess deep life wisdom and people often come to you for advice and support. You are a versatile and interesting personality. You are drawn to everything unusual and esoteric. You are fond of psychology, studying deep and sacred knowledge.\nYou easily adapt to new conditions. You are stable in any changes and stressful situations. You can manage people, but do not strive for this. You like uniting and working together more.\nYou have a strong connection with your family and ancestry. You value relationships and home comfort, gather loved ones together, help to solve conflict situations and disputes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Judgment" }, { label: "Resentments" }, { label: "Problems with relatives" }, { label: "Pride" }, { label: "Aggressiveness" }, { label: "Categoricalness" }, { label: "Rigidity" }, { label: "Fear of changes" }, { label: "Fear of criticism" }, { label: "Bad habits" }, { label: "Weakness of character" }, { label: "Lack of spirituality" }, { label: "Anger" }],
                description: "You lack integrity and balance in life. You cannot find a soul-appealing cause, do not understand where to move and what you want. You cannot assemble yourself, it is scary for you to go into something new, there is a fear of changes. You don't believe in yourself and your talents, often doubt. All this leads to weak character, bad habits, and addictions.\nIt may happen that you fixate on material values and money, and not on an idea and a favorite cause, which eventually leads to losses.\nOr vice versa, you may behave as a rigid and authoritarian person. You constantly demand something from others, are not ready to share, lead a secretive lifestyle. In conflicts, you manifest your aggression, which can offend a loved one.\nNot infrequently there are problems with family: quarrels, conflicts, and misunderstanding lead to cessation of communication with relatives."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Powerful intuition" }, { label: "Life wisdom" }, { label: "Healing, creating the integral" }, { label: "Clairvoyance" }, { label: "Gift of uniting people" }, { label: "Openness to the world" }, { label: "Increased sensitivity" }, { label: "Connecting family together" }, { label: "Ideologicalness" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nEngage in spiritual practices, meditation, yoga.\nLead a healthy way of life.\nEngage in creativity.\nLive in a flow.\nEngage in sport.\nTransmit your wisdom to others.\nDevelop sensuality, intuition, clairvoyance.\nLearn to create the integral, help people find integrity.\nWrite down your goals and tasks, follow the plan.\nPractice forgiveness and acceptance.\nCommunicate more often with relatives, spend time with family.\nStudy your ancestry: family history, genealogy, etc.\nMaintain family traditions and values."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "You should use your unique possibilities for resolution of problems in family and elimination of repeating scenarios. You can break repetition of negative events, directing attention of whole family to violated ancestral scenarios. Possible appearance of such scenario: someone from elder family members feels self-undervalued, and younger experiences absence of love of relatives. In your power is to change scenario of negative events and direct life of whole family into positive channel. Help with kind words and acts, don't close in self, use your unique knowledge for good of people. Free self from negative in various aspects of life. Striving for material prosperity, devote attention to spiritual development. Engage in your health and develop individual abilities."
            },
        ]
    },
    21: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to a peaceful solution of problems and to harmonization of everything around.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Ability to lead" }, { label: "Interest in travel" }, { label: "Adaptability" }, { label: "Uniting people" }, { label: "Sensitivity" }, { label: "Healing" }, { label: "Freedom" }, { label: "Communicability" }, { label: "Ideologicalness" }, { label: "Globality" }, { label: "Tolerance" }, { label: "Openness" }, { label: "Scale" }],
                description: "Soft female energy. You are open to the new and unknown, love to receive diverse experience and experiment in everything. You have flexible thinking, you easily adapt to new conditions and circumstances.\nYou are a cheerful, kind, and smiling person. You like to engage in creativity and generate creative ideas. Your energy is very ideological, therefore you can become inspired by some idea, gather a team and lead it to the goal.\nYou are for harmony and peace in the whole world, always smooth over conflict situations and sharp corners. You know how to negotiate, find a compromise in any situation, listen and hear your interlocutor. You think positively, are always open and help people.\nHealing, clairvoyance, and intuition are well-developed in you.\nYou think globally, scale projects. You like to study all edges and possibilities of your personality, you are ready to go beyond usual frames and generally accepted standards.\nYou travel often, study other cultures and languages. You are open to communication, very communicative, easily make new acquaintances."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Militance" }, { label: "Categoricalness" }, { label: "Judgment" }, { label: "Conflictness" }, { label: "Destruction" }, { label: "Closedness" }, { label: "Aloofness" }, { label: "Whining" }, { label: "Distrust" }, { label: "Unconfidence" }, { label: "Mood swings" }, { label: "Desire to dominate" }, { label: "Emotionality" }, { label: "Ingratitude" }, { label: "Workaholism" }],
                description: "You behave aggressively, often argue with people, which leads to conflicts and quarrels. You judge another person and their actions if they contradict your convictions.\nCategoricalness and desire to dominate are present in the character, and this prevents you from establishing trusting and open relationships with people. You carry destruction instead of creation. Eventually this leads to closedness, you become aloof and lead a solitary way of life.\nThe second variant of manifestation of minuses by your energy is fear to go into the new, constant doubts in self and one's talents. You are unconfident, don't know what you want from life, what you would like to engage in and where to move. You don't trust people, are too emotional and experience frequent mood swings.\nEverything global and large-scale scares you: projects, ideas, plans. You are not ready to master new professions, refuse to travel and get acquainted with new people."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Openness to the new" }, { label: "Diplomacy" }, { label: "Ability to negotiate with other people" }, { label: "Structuralness" }, { label: "Sensitivity, good intuition, healing" }, { label: "Flexible thinking" }, { label: "Adaptability" }, { label: "Communicability" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [{ label: "Energeticness" }, { label: "Scale" }, { label: "Independence" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nStudy foreign languages.\nTravel.\nManifest interest in other cultures and countries.\nWrite down your fears, find causes, work through them and let go.\nDream, think about global, write down your goals.\nGo beyond frames.\nBe grateful for everything what you have already.\nEngage in sport.\nLead a healthy, eco-friendly way of life.\nAccept world and people such as they are, develop tolerance.\nShare with people, show your life, open up.\nOne can start leading a blog in internet.\nIncrease qualification, master new techniques and programs.\nBe patient, manifest flexibility, adapting to new conditions and circumstances.\nLead started cause to end. Practice acceptance.\nDo your work for good and with kind message."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Unite people only from kind motives. Don't be attached to home, travel a lot. Your peacemaking activity and good deeds are capable of bringing to people the idea of closeness and equality. Develop your global vision, participate in world projects, at this don't lose connection with real life. Study the art of \"small steps\". Try to avoid debts and credits. Help those who turned to you, but don't impose your help to those, who don't need it. Your mission consists in fact, to not be attached to material, always be open to new and carry unification all over the world in ease."
            },
        ]
    },
    22: {
        title: "My intellect",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your intellect, thinking style, and worldview.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Lightness" }, { label: "Freedom" }, { label: "Innovation" }, { label: "Openness" }, { label: "Adaptability" }, { label: "Optimism" }, { label: "Kindness" }, { label: "Communicability" }, { label: "Adventurism" }, { label: "Independence" }, { label: "Going beyond frames" }, { label: "Activity" }, { label: "Movement" }, { label: "Creativity" }],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations, you are open to everything new, not afraid of experiments and bright sensations. You do not accept any prohibitions, do not like work by schedule and routine. You are a free person in all manifestations. Possess limitless perception of self and life.\nIn you there is your own depth, you can transform the consciousness of other people.\nCreative thinking and original ideas help you approach any task non-standardly. You bring innovation and creativity into your cause or project.\nActive in life, constantly in movement, travel a lot, get acquainted with interesting people. Easily adapt to new conditions. If necessary, you are ready to lead an ascetic way of life and give up material benefits for sake of your idea."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the receive of specific character traits and our inner states.",
                items: [{ label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Lateness" }, { label: "Unreliability" }, { label: "Fixation on the material" }, { label: "Jealousy" }, { label: "Overpoweringness" }, { label: "Inadequacy" }, { label: "Dependencies" }, { label: "Suppression" }, { label: "Debts" }, { label: "Dissoluteness" }, { label: "Apathy" }, { label: "Non-freedom" }],
                description: "You have too non-serious and irresponsible attitude to life. You do not fulfill your promises, miss deadlines, often are late for important meetings. Can behave inadequately, suppress other people or be excessively jealous. Absence of frames in a bad sense of this word leads you to a dissolute way of life, dependencies, as well as to problems with law and debts.\nCan get fixated on material values and money, completely forgetting about ideas and inspiration.\nThe second variant of manifestation of minuses is tension and too serious attitude to everything. You lack lightness, you constantly worry and are in a stressful state. Don't know how to relax, don't trust life, are afraid and doubt.\nA sense of internal non-freedom can lead you to apathy and heavy psychological states. You don't know what you want to engage in, where you go and what inspires you."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "These are your innate gifts.",
                items: [{ label: "Freedom, absence of frames" }, { label: "Creativity, creativity, innovation" }, { label: "Lightness, relaxed state" }, { label: "Flexible thinking" }, { label: "Curiosity" }, { label: "Quickly find a common language with children" }, { label: "Adaptability" }, { label: "Communicability, openness to people and everything new" }, { label: "Positive thinking" }],
                description: ""
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "These traits can block your innate talents if not worked through.",
                items: [],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "RECOMMENDATIONS\nDon't fear to go into the new and start from zero.\nTravel.\nEngage in creativity.\nOne can develop acting abilities, perform in public.\nSpend time with children, charge from them with lightness and freedom.\nDon't load self with heavy tasks.\nReduce communication with toxic people.\nDon't pile up grudges in self, communicate honestly and openly.\nLead a healthy way of life, get rid of dependencies.\nChoose freelance, seasonal or project work in online-format, to work from any point of world.\nImplement your creative ideas.\nDon't limit freedom of other people, accept their opinion, views and worldview.\nTrust the Universe, accept everything with lightness and optimism.\nEngage in sport, lead an active way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "For choice of type of activity listen to self and develop in it. Try to not pile up what can limit you in something. This concerns grudges, limiting convictions, as well as material benefits. For creation of family a light-on-feet partner with similar views on life will suit you. Travels will allow you to give to world your ideas of good, unity and freedom. Lower your requirements, wear comfortable clothes, add lightness to your way of life. Learn to easily let go everything unnecessary from your life, as well as help other people, who need liberation from attachments. Work through your fears and limiting convictions, easily let go attachments from your life and get rid of dependencies."
            },
        ]
    },
};

// SELF-MANIFESTATION SECTIONS
export const selfManifestationData: Record<number, SectorCardDetail> = {
    1: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the first energy is the Mage or Creator, symbolizing initiative, power of will, and the ability to manifest ideas into reality.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INITIATIVE, CREATIVITY, INDEPENDENCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Initiative" }, { label: "Optimism" }, { label: "Creativity" }, { label: "Independence" }, { label: "Sociability" }, { label: "Originality" }, { label: "Active life position" }, { label: "Leadership" }, { label: "Charm" }, { label: "Resourcefulness" }, { label: "Confidence" }, { label: "Eloquence" }],
                description: "You are a bright, creative person with a multitude of ideas. You stand out from the crowd and possess powerful charisma. You realize your creative impulses and follow your own path."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: EGOISM, PRIDE, INACTION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Egoism" }, { label: "Pride" }, { label: "Arrogance" }, { label: "Inaction" }, { label: "Doubt" }, { label: "Unwillingness to share knowledge" }, { label: "Hypercontrol" }, { label: "Aggressiveness" }],
                description: "You may stay in the shade, doubt yourself, and fear taking responsibility. Or you may manifest pride, vanity, and star sickness, looking down on others."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: INITIATIVE, CREATIVITY, INDEPENDENCE\n\nTalents are your strength, your gift.",
                items: [{ label: "Creative abilities" }, { label: "Uniqueness" }, { label: "Bright charisma" }, { label: "Positive thinking" }, { label: "Leadership" }],
                description: "You are endowed with the power of the word and the ability to materialize your thoughts."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: INITIATIVE, CREATIVITY, INDEPENDENCE\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Inaction" }, { label: "Self-doubt" }, { label: "Pride" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Believe in yourself and your ideas. Actively manifest your talents. Learn to share your knowledge and experience. Maintain positive thinking and visualize your goals."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a leader and inspire others. Don't be afraid to be first. Develop your unique style and approach. Use your energy for the benefit of society."
            }
        ]
    },
    2: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the second energy is the High Priestess, symbolizing intuition, mystery, and deep understanding of the hidden.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTUITION, HARMONY, DIPLOMACY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Intuition" }, { label: "Diplomacy" }, { label: "Calmness" }, { label: "Sensitivity" }, { label: "Observance" }, { label: "Harmony" }, { label: "Wisdom" }, { label: "Tactfulness" }],
                description: "You have a deep understanding of the world and people. You are intuitive and sensitive, often knowing things before they happen."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: SECRECY, GOSSIP, DOUBT\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Secrecy" }, { label: "Gossip" }, { label: "Doubt" }, { label: "Hypocrisy" }, { label: "Passivity" }, { label: "Laziness" }],
                description: "You may become too secretive, prone to gossip, or lose yourself in doubts and passivity."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: INTUITION, HARMONY, DIPLOMACY\n\nTalents are your strength, your gift.",
                items: [{ label: "Strong intuition" }, { label: "Healing abilities" }, { label: "Diplomatic talent" }, { label: "Understanding hidden truths" }],
                description: "Your talent lies in your ability to see beyond the surface and heal through understanding."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: INTUITION, HARMONY, DIPLOMACY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Secrecy" }, { label: "Doubt" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Trust your intuition. Avoid gossip and hypocrisy. Be more open with people you trust. Study esoteric knowledge and spiritual practices."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a diplomat and peacemaker. Use your intuition to guide others. Don't be afraid of the unknown."
            }
        ]
    },
    3: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the third energy is the Empress, symbolizing fertility, abundance, and feminine power.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: ABUNDANCE, CREATIVITY, CARE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Abundance" }, { label: "Care" }, { label: "Responsibility" }, { label: "Practicality" }, { label: "Generosity" }, { label: "Charm" }],
                description: "You are a natural creator and nurturer. You have the ability to bring abundance into your life and the lives of others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CONTROL, ARROGANCE, SCARCITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Hypercontrol" }, { label: "Arrogance" }, { label: "Scarcity mindset" }, { label: "Pressure on others" }, { label: "Selfishness" }],
                description: "You may become overly controlling, arrogant, or stuck in a scarcity mindset, suppressing others."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: ABUNDANCE, CREATIVITY, CARE\n\nTalents are your strength, your gift.",
                items: [{ label: "Creation of abundance" }, { label: "Creative talents" }, { label: "Nurturing abilities" }, { label: "Practical wisdom" }],
                description: "Your talent lies in your ability to create beauty and abundance in the material world."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: ABUNDANCE, CREATIVITY, CARE\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Control" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to delegate and trust others. Practice generosity. Surround yourself with beauty. Connect with nature."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of inspiration and care. Use your creative power to build a better world. Value yourself and your contributions."
            }
        ]
    },
    4: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the fourth energy is the Emperor, symbolizing structure, authority, and masculine power.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: STRUCTURE, LEADERSHIP, STABILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Structure" }, { label: "Stability" }, { label: "Responsibility" }, { label: "Practicality" }, { label: "Confidence" }, { label: "Fairness" }],
                description: "You are a natural leader and organizer. You have the ability to create order and provide stability for yourself and others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DESPOTISM, RIGIDITY, AGGRESSION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Despotism" }, { label: "Rigidity" }, { label: "Aggression" }, { label: "Hypercontrol" }, { label: "Stubbornness" }],
                description: "You may become overly rigid, despotic, or aggressive, using your power to suppress others."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: STRUCTURE, LEADERSHIP, STABILITY\n\nTalents are your strength, your gift.",
                items: [{ label: "Organizational talent" }, { label: "Leadership abilities" }, { label: "Creating structure" }, { label: "Strategic thinking" }],
                description: "Your talent lies in your ability to build and lead large systems and organizations."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: STRUCTURE, LEADERSHIP, STABILITY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Despotism" }, { label: "Fear of responsibility" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to be flexible. Respect the boundaries of others. Practice fair leadership. Take responsibility for your actions."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a fair and wise leader. Use your power to create stability and order. Protect and support those under your care."
            }
        ]
    },
    5: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the fifth energy is the Hierophant or Teacher, symbolizing traditions, rules, and the transmission of knowledge.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHING, TRADITION, ORDER\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Teaching" }, { label: "Order" }, { label: "Tradition" }, { label: "Reliability" }, { label: "Eloquence" }, { label: "Wisdom" }, { label: "Clarity" }],
                description: "You are a natural teacher and guardian of traditions. you value order and the transmission of knowledge."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DOGMATISM, RIGIDITY, PRIDE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Dogmatism" }, { label: "Rigidity" }, { label: "Pride" }, { label: "Imposing opinions" }, { label: "Judging others" }],
                description: "You may become overly dogmatic, rigid, or proud, imposing your views on everyone."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: TEACHING, TRADITION, ORDER\n\nTalents are your strength, your gift.",
                items: [{ label: "Teaching talent" }, { label: "Transmitting knowledge" }, { label: "Creating order" }, { label: "Eloquence" }],
                description: "Your talent lies in your ability to learn, structure information, and teach it to others."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: TEACHING, TRADITION, ORDER\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Dogmatism" }, { label: "Resistance to new" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Be open to new knowledge. Respect different points of view. Practice what you teach. Maintain order in your life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a wise teacher and mentor. Use your knowledge to guide others. Value and respect traditions while being open to change."
            }
        ]
    },
    6: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the sixth energy is the Lovers, symbolizing choice, love, and communication.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, COMMUNICATION, BEAUTY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Love" }, { label: "Communication" }, { label: "Beauty" }, { label: "Sociability" }, { label: "Charm" }, { label: "Creativity" }, { label: "Harmony" }],
                description: "You are a natural communicator and lover of beauty. You have the ability to create harmony and connect with people through love."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INDECISIVENESS, IDEALIZATION, DEPENDENCE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Indecisiveness" }, { label: "Idealization" }, { label: "Dependence" }, { label: "Superficiality" }, { label: "Insecurity" }],
                description: "You may become overly indecisive, idealize others, or become dependent on their opinion."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: LOVE, COMMUNICATION, BEAUTY\n\nTalents are your strength, your gift.",
                items: [{ label: "Communication talent" }, { label: "Creating beauty" }, { label: "Diplomatic abilities" }, { label: "Artistic talent" }],
                description: "Your talent lies in your ability to create beauty, communicate effectively, and build harmonious relationships."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: LOVE, COMMUNICATION, BEAUTY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Idealization" }, { label: "Fear of making a choice" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to make choices from the heart. Avoid idealizing people. Value your own beauty and uniqueness. Be more decisive."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of love and harmony. Use your communication skills to connect people. Value yourself and follow your heart."
            }
        ]
    },
    7: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the seventh energy is the Chariot, symbolizing movement, goals, and victory.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MOVEMENT, GOALS, VICTORY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Movement" }, { label: "Goal-oriented" }, { label: "Victory" }, { label: "Activity" }, { label: "Leadership" }, { label: "Persistence" }, { label: "Optimism" }],
                description: "You are a natural achiever and leader. You have the ability to set goals and reach them through movement and persistence."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, STOPPAGE, CHAOS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Aggression" }, { label: "Stoppage" }, { label: "Chaos" }, { label: "Militance" }, { label: "Laziness" }],
                description: "You may become overly aggressive, stop moving, or fall into chaos and laziness."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: MOVEMENT, GOALS, VICTORY\n\nTalents are your strength, your gift.",
                items: [{ label: "Goal-setting talent" }, { label: "Leadership abilities" }, { label: "Strategic thinking" }, { label: "Dynamic energy" }],
                description: "Your talent lies in your ability to lead teams to victory and achieve large-scale goals."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: MOVEMENT, GOALS, VICTORY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Aggression" }, { label: "Lack of plan" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Set clear goals and plans. Stay in movement. Avoid aggression. Be a team player."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a winner and inspire others. Use your dynamic energy to achieve your dreams. Lead others to success with wisdom."
            }
        ]
    },
    8: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the eighth energy is Justice, symbolizing balance, cause-and-effect, and truth.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: JUSTICE, BALANCE, TRUTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Justice" }, { label: "Balance" }, { label: "Truth" }, { label: "Responsibility" }, { label: "Practicality" }, { label: "Fairness" }, { label: "Calmness" }],
                description: "You are a natural seeker of truth and justice. You have the ability to see cause-and-effect relationships and maintain balance."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INJUSTICE, JUDGMENT, COMPLAINT\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Injustice" }, { label: "Judgment" }, { label: "Complaint" }, { label: "Resentment" }, { label: "Stubbornness" }],
                description: "You may become overly judgmental, feel treated unjustly, or get stuck in complaints and resentment."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: JUSTICE, BALANCE, TRUTH\n\nTalents are your strength, your gift.",
                items: [{ label: "Analytical talent" }, { label: "Understanding laws" }, { label: "Fairness" }, { label: "Responsibility" }],
                description: "Your talent lies in your ability to understand the laws of the universe and maintain justice in all matters."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: JUSTICE, BALANCE, TRUTH\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Judgment" }, { label: "Resentment" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Study the laws of cause-and-effect. Stop judging others. Be responsible for your life. Maintain internal balance."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of truth and justice. Use your analytical mind to understand life deeply. Always strive for fairness and balance."
            }
        ]
    },
    9: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the ninth energy is the Hermit Sage, symbolizing inner search, solitude and wisdom. This energy reflects the desire to understand deep truths, pushes to the study of spiritual teachings and philosophies, which allows you to know the depth of the universe.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, LONELINESS, TACT\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Fidelity" }, { label: "Serenity" }, { label: "Privacy" }, { label: "Learning new" }, { label: "Understanding people" }, { label: "Tactfulness" }, { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Caring" }, { label: "Attention" }, { label: "Willingness to pass on knowledge" }, { label: "Modesty" }],
                description: "Wiseman. Closed Energy. You like to immerse yourself and your thoughts. It is comfortable for you to lead a secluded lifestyle. Your main task is not to close yourself off from the world, but on the contrary to shine and pass your knowledge on.\n\nFrom birth you are endowed with special wisdom, you have a rich life experience. You are able to interpret situations, give useful advice, thereby helping others. You understand the processes better than anyone else and see the depth in everything."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSED-MINDEDNESS, ASCETICISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Closure" }, { label: "Excessive asceticism" }, { label: "Not liking yourself and people" }, { label: "Pride" }, { label: "Condemnation" }, { label: "Reluctance to help" }, { label: "Fear of loneliness" }, { label: "Impairment" }, { label: "Untrustworthiness" }, { label: "Indiscriminate communications" }, { label: "Money problems" }, { label: "Neglect" }, { label: "A fixation on material things" }, { label: "Fear of relationships" }, { label: "Uncertainty" }, { label: "Unrealization" }, { label: "Idealization of people" }],
                description: "You may withdraw from reality, treat others with arrogance, and become disconnected from the world."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: SAGE, LONELINESS, TACT\n\nTalents are your strength, your gift.",
                items: [{ label: "Profound knowledge and life wisdom" }, { label: "A desire to learn" }, { label: "Passing on your knowledge" }, { label: "Know how to make the process holistic" }, { label: "You're drawn to spirituality and learning" }, { label: "Good intuition, high sensitivity" }, { label: "Leadership from the position of sage and guru" }, { label: "Helping people" }],
                description: "Your talent lies in your ability to understand deep truths and pass them on to others."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: SAGE, LONELINESS, TACT\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Closure" }, { label: "Hermitage" }, { label: "Arrogance" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Look for depth in everything you do. Learn secret philosophical knowledge and use it to help others. Open your heart to people, share your accumulated experience. Don't be afraid of being alone, enjoy the solitude and silence. Trust people."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Choose any industry that you are passionate about. Intellectual labor is your element. Try to develop not only logical thinking, but also intuition. Be sure to share what you have learned when you are approached. Don't be frightened of solitude, but don't withdraw from society for long either."
            }
        ]
    },
    10: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the tenth energy is the Wheel of Fortune, symbolizing luck, cycles, and flow.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LUCK, FLOW, CYCLES\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Luck" }, { label: "Flow" }, { label: "Optimism" }, { label: "Adaptability" }, { label: "Lightness" }, { label: "Activity" }, { label: "Sociability" }],
                description: "You are a natural lucky person who lives in the flow of life. You have the ability to catch the lucky wave and adapt to any changes."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PASSIVITY, STAGNATION, ANXIETY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Passivity" }, { label: "Stagnation" }, { label: "Anxiety" }, { label: "Laziness" }, { label: "Distrust of flow" }],
                description: "You may become overly passive, get stuck in stagnation, or lose your trust in the flow of life."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: LUCK, FLOW, CYCLES\n\nTalents are your strength, your gift.",
                items: [{ label: "Ability to be in flow" }, { label: "Attracting luck" }, { label: "Flexible thinking" }, { label: "Optimistic vision" }],
                description: "Your talent lies in your ability to trust life and attract fortunate circumstances through your internal state."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: LUCK, FLOW, CYCLES\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Passivity" }, { label: "Fear of change" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to trust the flow of life. Be more active and optimistic. Don't be afraid of changes. Follow your intuition."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a lucky person and inspire others. Use your lightness to navigate life easily. Always trust that life provides the best for you."
            }
        ]
    },
    11: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the eleventh energy is Strength, symbolizing power, endurance, and potential.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POWER, ENDURANCE, POTENTIAL\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Power" }, { label: "Endurance" }, { label: "Activity" }, { label: "Leadership" }, { label: "Persistence" }, { label: "Optimism" }, { label: "Workaholism (in plus)" }],
                description: "You have a huge reserve of energy and strength. You are a natural-born leader and achiever who can handle any workload."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, PRESSURE, BURNOUT\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Aggression" }, { label: "Pressure on others" }, { label: "Burnout" }, { label: "Rudeness" }, { label: "Irritability" }],
                description: "You may become overly aggressive, pressure others with your strength, or burn out due to lack of rest."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: POWER, ENDURANCE, POTENTIAL\n\nTalents are your strength, your gift.",
                items: [{ label: "Huge energy potential" }, { label: "Leadership abilities" }, { label: "Physical and spiritual endurance" }, { label: "Ability to motivate others" }],
                description: "Your talent lies in your immense internal power and ability to inspire others to action."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: POWER, ENDURANCE, POTENTIAL\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Aggression" }, { label: "Lack of rest" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to manage your energy. Practice regular rest. Avoid aggression and pressure. Use your strength for good."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of strength and inspiration. Use your potential to help others. Always maintain a balance between work and rest."
            }
        ]
    },
    12: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the twelfth energy is the Hanged Man, symbolizing a different perspective, serving, and creativity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" }, { label: "Creativity" }, { label: "Compassion" }],
                description: "You look at the world differently, not like everyone else. You have a natural desire to help and serve others through your unique vision."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Victimhood" }, { label: "Touchiness" }, { label: "Inability to refuse" }, { label: "Self-destruction" }, { label: "Feeling of guilt" }],
                description: "You may fall into the role of a victim, have difficulty saying 'no', or lose yourself in negativity and doubts."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nTalents are your strength, your gift.",
                items: [{ label: "Non-standard thinking" }, { label: "Innovative ideas" }, { label: "Healing through serving" }, { label: "Creative vision" }],
                description: "Your talent lies in your ability to see the world from a different angle and bring innovation into everything you do."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Victimhood" }, { label: "Non-confidence" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Learn to set boundaries and say 'no'. Value your work and yourself. Use your unique vision for creativity. Practice selfless service without being a victim."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be an innovator and helper. Use your different perspective to find new solutions. Always act from a state of abundance, not lack."
            }
        ]
    },
    13: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the thirteenth energy is Death or Transformation, symbolizing change, bravery, and the end of the old.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Bravery" }, { label: "Activity" }, { label: "Fearlessness" }, { label: "Inspiration" }, { label: "Desire for changes" }, { label: "Adaptability" }],
                description: "You are a person of transformation. You have the courage to end what no longer works and start anew, inspiring others with your bravery."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Fear of change" }, { label: "Recklessness" }, { label: "Harshness" }, { label: "Pessimism" }, { label: "Stagnation" }],
                description: "You may become afraid of change, get stuck in the past, or act recklessly and harshly."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nTalents are your strength, your gift.",
                items: [{ label: "Ability to transform reality" }, { label: "Fearlessness in crisis" }, { label: "Productivity" }, { label: "Innovation through resetting" }],
                description: "Your talent lies in your ability to see what needs to change and courageously lead the transformation process."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Resistance to changes" }, { label: "Fears and doubts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Embrace changes. Get rid of the old and obsolete. Stay calm in extreme situations. Use your bravery for positive transformation."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a catalyst for change. Use your fearlessness to help others overcome crisis. Always look for new paths and points of growth."
            }
        ]
    },
    14: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the fourteenth energy is Temperance, symbolizing harmony, moderation, and soul creativity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: HARMONY, MODERATION, CREATIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Harmony" }, { label: "Moderation" }, { label: "Creativity" }, { label: "Sensitivity" }, { label: "Kindness" }, { label: "Patience" }],
                description: "You are a soul-oriented person with a natural sense of harmony and beauty. You have the ability to create art and bring peace to others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, IMPATIENCE, CLOSEDNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Imbalance" }, { label: "Impatience" }, { label: "Closedness" }, { label: "Coarseness" }, { label: "Addictions" }],
                description: "You may lose your internal balance, become impatient and coarse, or withdraw into yourself."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: HARMONY, MODERATION, CREATIVITY\n\nTalents are your strength, your gift.",
                items: [{ label: "Soul creativity" }, { label: "Heightened sensitivity" }, { label: "Healing through art" }, { label: "Patience and diplomacy" }],
                description: "Your talent lies in your ability to connect with the soul and express its beauty through various forms of art and communication."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: HARMONY, MODERATION, CREATIVITY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Coarseness" }, { label: "Lack of moderation" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Maintain moderation in everything. Engage in soul creativity. Practice patience. Connect with your internal world."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of harmony and beauty. Use your sensitivity to heal and inspire. Always follow the path of the soul."
            }
        ]
    },
    15: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the fifteenth energy is the Devil or Tempter, symbolizing power, material abundance, and the shadow side.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POWER, ABUNDANCE, CHARISMA\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Power" }, { label: "Abundance" }, { label: "Charisma" }, { label: "Insight" }, { label: "Leadership" }, { label: "Creativity" }, { label: "Wealth" }],
                description: "You are a powerful and charismatic person who understands the material world and human nature deeply. You have the ability to attract abundance and lead others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, MANIPULATION, DEPENDENCE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Aggression" }, { label: "Manipulation" }, { label: "Dependence" }, { label: "Pride" }, { label: "Desire for power" }],
                description: "You may become manipulative, aggressive, or lost in material dependencies and pride."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: POWER, ABUNDANCE, CHARISMA\n\nTalents are your strength, your gift.",
                items: [{ label: "Powerful charisma" }, { label: "Understanding human weaknesses" }, { label: "Attracting wealth" }, { label: "Leadership and influence" }],
                description: "Your talent lies in your ability to see the truth, influence others, and manifest abundance in the material world."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: POWER, ABUNDANCE, CHARISMA\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Aggression" }, { label: "Manipulation" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Use your power for good. Avoid manipulation and aggression. Work through your shadow side. Maintain a balance between spiritual and material."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a wise and powerful leader. Use your insight to help others see the truth. Always choose the path of light and integrity."
            }
        ]
    },
    16: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the sixteenth energy is the Tower or Spiritual Leader, symbolizing awakening, restructuring, and spiritual strength.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AWAKENING, STRENGTH, RESTRUCTURING\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Spiritual strength" }, { label: "Awakening" }, { label: "Restructuring" }, { label: "Leadership" }, { label: "Endurance" }, { label: "Wisdom" }],
                description: "You are a person of great spiritual strength who can rebuild life on a solid foundation, inspiring others with your resilience."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DESTRUCTION, AGGRESSION, RIGIDITY\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Destruction" }, { label: "Aggression" }, { label: "Rigidity" }, { label: "Narrow-mindedness" }, { label: "Anger" }],
                description: "You may become destructive, aggressive, or stuck in rigid patterns that eventually lead to painful restructuring."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: AWAKENING, STRENGTH, RESTRUCTURING\n\nTalents are your strength, your gift.",
                items: [{ label: "Spiritual leadership" }, { label: "Ability to rebuild" }, { label: "Power of will" }, { label: "Deep insights" }],
                description: "Your talent lies in your ability to see what needs to be destroyed to build something better and more stable."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: AWAKENING, STRENGTH, RESTRUCTURING\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Aggression" }, { label: "Attachment to the old" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Be ready for changes. Rebuild your life on spiritual values. Avoid aggression and destruction. Be a spiritual leader for others."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of spiritual strength and awakening. Use your ability to rebuild to help others find a solid foundation. Always follow the path of light."
            }
        ]
    },
    17: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the seventeenth energy is the Star, symbolizing brightness, creativity, and uniqueness.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Creativity" }, { label: "Brightness" }, { label: "Emotionality" }, { label: "Artistry" }, { label: "Charm" }, { label: "Sensitivity" }, { label: "Individuality" }],
                description: "You are a bright, creative person who stands out from the crowd. You have a natural charm and the ability to shine in the center of attention."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Unrealizedness" }, { label: "Pride" }, { label: "Vanity" }, { label: "Withdrawal from reality" }, { label: "Illusions" }],
                description: "You may stay in the shade, doubt your talents, or become overly vain and stuck in illusions."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nTalents are your strength, your gift.",
                items: [{ label: "Creative abilities" }, { label: "Bright charisma" }, { label: "High sensitivity" }, { label: "Publicity and openness" }],
                description: "Your talent lies in your ability to be a bright star and inspire others through your creativity and uniqueness."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Pride" }, { label: "Vanity" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Reveal your creative potential. Don't be afraid to be in the center of attention. Believe in your dream. Avoid pride and vanity."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a bright star and inspire others. Use your creativity to help people. Always follow your unique path and dream."
            }
        ]
    },
    18: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the eighteenth energy is the Moon, symbolizing mystery, intuition, and materialization of thoughts.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Mystery" }, { label: "Intuition" }, { label: "Imagination" }, { label: "Attractiveness" }, { label: "Sensitivity" }, { label: "Creative abilities" }],
                description: "You have a deep and mysterious nature. You are highly intuitive and have the power to attract what you think about into your life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVITY, CLOSEDNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Fears" }, { label: "Doubts" }, { label: "Withdrawal from reality" }, { label: "Depression" }, { label: "Anxiety" }],
                description: "You may become lost in fears and doubts, withdraw into your own world, or attract negativity through your thoughts."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: DEPTH, INTUITION, ATTRACTION\n\nTalents are your strength, your gift.",
                items: [{ label: "Strong imagination" }, { label: "Powerful intuition" }, { label: "Materialization of thoughts" }, { label: "Artistry and charm" }],
                description: "Your talent lies in your deep intuition and the ability to create 'magic' in any matter you take up."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: DEPTH, INTUITION, ATTRACTION\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Fears" }, { label: "Doubts" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Work through your fears. Practice positive thinking and visualization. Trust your intuition. Connect with your internal world."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of mystery and inspiration. Use your intuition to guide yourself and others. Always focus on the positive to attract good things."
            }
        ]
    },
    19: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the nineteenth energy is the Sun, symbolizing leadership, warmth, and global projects.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Leadership" }, { label: "Optimism" }, { label: "Success" }, { label: "Carefulness" }, { label: "Creativity" }, { label: "Energeticness" }],
                description: "You are a natural-born leader who carries warmth and light to people. You have the ability to inspire others and lead large-scale projects."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Aggressiveness" }, { label: "Apathy" }],
                description: "You may become overly demanding, rigid, or lost in apathy, losing your internal light and motivation."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nTalents are your strength, your gift.",
                items: [{ label: "Leadership abilities" }, { label: "Positive thinking" }, { label: "Huge life energy" }, { label: "Creativity and innovation" }],
                description: "Your talent lies in your ability to ignite people with your ideas and lead them towards global goals."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Feeling of guilt" }, { label: "Fear of scale" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Be a leader and inspire others. Don't be afraid of scale. Engage in charity and help others. Maintain your internal fire."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of light and warmth for everyone. Use your leadership to create something great. Always follow your heart and ignite others."
            }
        ]
    },
    20: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the twentieth energy is Judgment or Connection, symbolizing integrity, ancestry, and healing.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Integrity" }, { label: "Intuition" }, { label: "Healing" }, { label: "Wisdom" }, { label: "Stability" }, { label: "Family-orientedness" }],
                description: "You have the talent for uniting things into a single whole. You are deeply connected with your ancestry and possess strong intuition and healing abilities."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Judgment" }, { label: "Resentments" }, { label: "Problems with relatives" }, { label: "Pride" }, { label: "Fear of changes" }],
                description: "You may lose your integrity, become judgmental of others, or have conflicts with your family."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nTalents are your strength, your gift.",
                items: [{ label: "Powerful intuition" }, { label: "Healing abilities" }, { label: "Uniting people" }, { label: "Clairvoyance" }],
                description: "Your talent lies in your ability to find integrity and help others achieve it through your deep connection with ancestral wisdom."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Quarrels in family" }, { label: "Resentments" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Heal your relationships with relatives. Trust your intuition. Work on your internal integrity. Study your family history."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a peacemaker and unifier. Use your healing gift to help others. Always value your family and ancestry."
            }
        ]
    },
    21: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the twenty-first energy is the World or Diplomat, symbolizing diplomacy, expansion, and global thinking.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Diplomacy" }, { label: "Adaptability" }, { label: "Openness" }, { label: "Global thinking" }, { label: "Peacemaking" }, { label: "Tolerance" }],
                description: "You are a 'Person of the World' who thinks globally and can find a common language with anyone. You have the ability to unite people and cultures."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Militance" }, { label: "Categoricalness" }, { label: "Judgment" }, { label: "Conflictness" }, { label: "Fear of scale" }],
                description: "You may become hostile and militant, judge others, or fear the scale and expansion of your life."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nTalents are your strength, your gift.",
                items: [{ label: "Diplomatic talent" }, { label: "Global vision" }, { label: "Adaptability" }, { label: "Healing and intuition" }],
                description: "Your talent lies in your ability to think globally and bring peace and expansion to everything you do."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Limited thinking" }, { label: "Hostility" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Think globally. Travel more. Study foreign languages. Avoid conflicts and judge. Be a diplomat for the world."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a peacemaker and inspiration for the whole world. Use your global vision to create large projects. Always follow the path of diplomacy and love."
            }
        ]
    },
    22: {
        title: "Self-manifestation",
        intro: "This energy is your strength, your gift. Your soul finds it comfortable to express it, and living through this energy comes naturally. It represents your style of communication and self-expression.",
        archetype: "The archetype of the twenty-second energy is the Fool, symbolizing freedom, lightness, and absence of boundaries.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [{ label: "Freedom" }, { label: "Lightness" }, { label: "Openness" }, { label: "Optimism" }, { label: "Adventurism" }, { label: "Creativity" }],
                description: "You are a free person who lives in a state of trust in the world. You have the ability to follow your own rules and live a life full of lightness and joy."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [{ label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Fixation on the material" }, { label: "Inadequacy" }, { label: "Dependencies" }],
                description: "You may become overly irresponsible, lost in material attachments, or carry internal heaviness and tension."
            },
            {
                id: "myTalents",
                label: "My talents",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nTalents are your strength, your gift.",
                items: [{ label: "Creative freedom" }, { label: "Innovation" }, { label: "Flexible thinking" }, { label: "Adaptability" }],
                description: "Your talent lies in your absolute freedom and the ability to bring innovation and lightness into any matter."
            },
            {
                id: "obstruction",
                label: "Obstruction of talent",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThese traits can block your innate talents if not worked through.",
                items: [{ label: "Irresponsibility" }, { label: "Attachment to material" }],
                description: "Working through these blockades is key to revealing your full potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                description: "Live with lightness and humor. Avoid material attachments and debts. Travel and experience new things. Be a free spirit."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Be a source of freedom and joy. Use your lightness to navigate life's challenges. Always follow your unique path and don't be afraid to start anew."
            }
        ]
    },
};

// ENERGY SOURCE SECTIONS
export const energySourceData: Record<number, SectorCardDetail> = {
    1: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "First Energy Archetype – The Magician. Person who has realized his talents, follows his dreams, and implements his ideas. Energy is a symbol of mastery, uniqueness and global vision. People with this energy have an innate ability to manifest their thoughts into reality.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Mastery" },
                    { label: "Adventurism" },
                    { label: "Spontaneity" },
                    { label: "Ideas" },
                    { label: "Creativity" },
                    { label: "Uniqueness" },
                    { label: "Ideology" },
                    { label: "Confidence" },
                    { label: "Decisiveness" },
                    { label: "Initiative" },
                    { label: "Courage" },
                    { label: "Communicativeness" },
                    { label: "Independence" },
                    { label: "Oratory art" }
                ],
                description: "Magician energy. You are a person of IDEAS. They appear quickly and also easily you implement them in life. You are creative, love to create unique things with your own hands. You possess high intelligence, love to study and constantly self-improve. You are very active, decisive and initiative. You possess oratory art and know how to infect those around with your ideology. You are always in center of events, love to communicate and share experience."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Egoism" },
                    { label: "Manipulations" },
                    { label: "Arrogance" },
                    { label: "Aggression" },
                    { label: "Envy" },
                    { label: "Revengefulness" },
                    { label: "Secretiveness" },
                    { label: "Distrust" },
                    { label: "Theft of ideas" },
                    { label: "Understated self-esteem" },
                    { label: "Overstated self-esteem" }
                ],
                description: "Energy in minus can manifest as overstated self-esteem. You can behave aggressively, arrogantly, infringe upon and condemn everyone around. Or understated self-esteem: you constantly doubt your ideas, are afraid to share thoughts, are not confident in yourself. You grab everything from fear of missing opportunity and cannot enjoy interesting business. You may start to manipulate people for selfish goals. You are vindictive and keep grudge for long time. Painfully perceive criticism."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Travels, change of environment, trips" },
                    { label: "Visiting interesting and unusual places" },
                    { label: "Receiving new knowledge" },
                    { label: "Communication with close people" },
                    { label: "Time with family" },
                    { label: "Dances" },
                    { label: "Sport, activity" },
                    { label: "Meetings with interesting people" },
                    { label: "Visiting museums, theaters, exhibitions" },
                    { label: "Engagement in creativity" },
                    { label: "Spend time with pets" },
                    { label: "Solitude" },
                    { label: "Care about self: massage, spa, baths, saunas, beauty salon" },
                    { label: "Rest on nature" },
                    { label: "Study of esoteric knowledge" },
                    { label: "Practice of yoga, meditation, breathing practices" },
                    { label: "Constantly try new: hobbies, rearrangement, cooking" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CONFIDENCE, DECISIVENESS, INITIATIVE\n\nThese actions will help to bring your energy to plus.",
                description: "Realize your ideas. If a new thought came, write it down and start implementation immediately. Believe in yourself and your talents. Do not doubt your abilities. Be decisive, initiative and active. Focus on your self-realization. Share your experience and knowledge. Tell your ideas. Learn to work in a team. Learn to forgive. Develop creative abilities. Study secret knowledge, work with subconscious, esotericism."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "You are a person of action, therefore don't sit on place and don't postpone implementation of your ideas for later. Your main tool — it is your reason and your will. Use them for creation and help to people. Don't be afraid to be unique and not similar to others. Your path — this is path of pioneer and discoverer. Learn to trust your intuition and higher forces. Your success depends on your activity and and skills to communicate with people. Be open, honest and positive. Don't get stuck on one place, constantly develop and move forward."
            }
        ]
    },
    2: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Second Energy Archetype – The High Priestess. Person who possesses deep wisdom, intuition and high sensitivity. This energy is a symbol of secret knowledge, harmony and unity. People with this energy are natural diplomats and peacemakers, able to feel the internal state of others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around. You have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Distrust" },
                    { label: "Uncertainty" },
                    { label: "Doubts" },
                    { label: "Inconstancy" },
                    { label: "Caprices" },
                    { label: "Pessimism" },
                    { label: "Hypocrisy" },
                    { label: "Gossiping" },
                    { label: "Cunning" },
                    { label: "Laziness" },
                    { label: "Passivity" },
                    { label: "Internal tension" },
                    { label: "Secretiveness" }
                ],
                description: "Energy in minus. You take a wait-and-see position, not taking active participation in life. You show laziness, passivity and inconstancy. Doubts, uncertainty and distrust towards people appear. You can start to get involved in gossip, manifest hypocrisy and cunning. Caprices, unexpected changes of mood and internal tension interfere with creating harmonious relationships. You become secretive and closed."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Travels, change of environment, trips" },
                    { label: "Visiting interesting and unusual places" },
                    { label: "Receiving new knowledge" },
                    { label: "Communication with close people" },
                    { label: "Time with family" },
                    { label: "Dances" },
                    { label: "Sport, activity" },
                    { label: "Meetings with interesting people" },
                    { label: "Visiting museums, theaters, exhibitions" },
                    { label: "Engagement in creativity" },
                    { label: "Spend time with pets" },
                    { label: "Solitude" },
                    { label: "Care about self: massage, spa, baths, saunas, beauty salon" },
                    { label: "Rest on nature" },
                    { label: "Study of esoteric knowledge" },
                    { label: "Practice of yoga, meditation, breathing practices" },
                    { label: "Constantly try new: hobbies, rearrangement, cooking" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThese actions will help to bring your energy to plus.",
                description: "Trust your intuition. Learn to distinguish your true desires from imposed ones. Be open and honest with yourself and others. Manifest kindness and compassion. Use your gift of diplomacy to resolve conflicts. Engage in self-development and study secret knowledge. Find time for solitude and rest in nature. Avoid gossiping and hypocrisy. Work on your internal state, find harmony."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Learn to trust yourself and your internal sensations. You have a unique gift to feel this world and people. Use your wisdom and intuition for good. Your task — to bring harmony and unity to those around. Be a peacemaker and diplomat. Don't be afraid of your depth and sensitivity, this is your strength. Manifest softness and kindness, but remember about your internal core. Your success depends on how much you are in balance with yourself."
            }
        ]
    },
    3: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Third Energy Archetype – The Empress. Energy of abundance, fertility and femininity. People with this energy are natural creators, able to bring beauty and order to the world. They possess high status, charisma and ability to lead.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: ABUNDANCE, CHARM, STATUS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Abundance" },
                    { label: "Prosperity" },
                    { label: "Beauty" },
                    { label: "Harmony" },
                    { label: "Status" },
                    { label: "Charisma" },
                    { label: "Care" },
                    { label: "Fertility" },
                    { label: "Creativity" },
                    { label: "Leadership" }
                ],
                description: "Energy of the Empress. You are a person of status and abundance. You love beautiful things, comfort and luxury. You have a natural charm and charisma that attracts people. You are a natural leader and know how to organize processes. You manifest care and love for others. You are creative and know how to bring your ideas to life. Prosperity and success follow you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CONTROL, GREED\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Pride" },
                    { label: "Desire for total control" },
                    { label: "Greed" },
                    { label: "Arrogance" },
                    { label: "Fixation on material" },
                    { label: "Caprices" },
                    { label: "Suppression of others" }
                ],
                description: "In negative, energy manifests as desire for total control over everything and everyone. You can become proud, arrogant and manifest greed. Fixation on material values and money can lead to loss of spiritual landmarks. Caprices and desire to suppress others can destroy relationships. It's important to learn to delegate and trust others."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Creation of beauty and comfort" },
                    { label: "Shopping, beautiful purchases" },
                    { label: "Visiting spa, beauty salons" },
                    { label: "Engagement in creativity" },
                    { label: "Spending time with children and family" },
                    { label: "Cooking delicious food" },
                    { label: "Gardening, interaction with earth" },
                    { label: "Leadership, organization of processes" },
                    { label: "Rest in luxury and comfort" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: ABUNDANCE, CHARM, STATUS\n\nThese actions will help to bring your energy to plus.",
                description: "Cultivate femininity and softness (for women) or deep respect for women (for men). Create beauty and order around you. Learn to care and manifest love. Don't get fixated only on material, develop spiritually. Learn to trust and delegate. Manifest your creative potential. Be a generous and wise leader."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is path of creation and abundance. Use your energy to bring beauty and prosperity to the world. Be a wise and caring leader. Remember that true abundance starts from internal state of harmony and gratitude. Don't be afraid to manifest your power and status, but do it with love and respect for others."
            }
        ]
    },
    4: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Fourth Energy Archetype – The Emperor. Energy of structure, power and responsibility. People with this energy are natural leaders, able to build empires and manage large systems. They possess strong will and determination.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POWER, STRUCTURE, RESPONSIBILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Leadership" },
                    { label: "Power" },
                    { label: "Structure" },
                    { label: "Responsibility" },
                    { label: "Determination" },
                    { label: "Strategic thinking" },
                    { label: "Confidence" },
                    { label: "Protection" },
                    { label: "Justice" }
                ],
                description: "Energy of the Emperor. You are a natural leader and manager. You have a strong will and the ability to achieve goals. You value structure, order and discipline. You are responsible and able to take important decisions. You protect your interests and the interests of your loved ones. You possess strategic thinking and know how to build long-term plans. Justice and honesty are important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DESPOTISM, AGGRESSION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Despotism" },
                    { label: "Aggression" },
                    { label: "Rigidity" },
                    { label: "Cruelty" },
                    { label: "Total control" },
                    { label: "Inflexibility" },
                    { label: "Stubbornness" }
                ],
                description: "In negative, energy manifests as despotism and desire for total control. You can become aggressive, rigid and manifest cruelty. Inflexibility and stubbornness interfere with finding compromises. Desire to suppress others and impose one's will can lead to conflicts. It's important to learn to be softer and more flexible."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Organization of large projects" },
                    { label: "Engagement in sports, especially power types" },
                    { label: "Building something new" },
                    { label: "Strategic planning" },
                    { label: "Taking responsibility" },
                    { label: "Communication with successful people" },
                    { label: "Rest in places of power" },
                    { label: "Managing processes and people" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: POWER, STRUCTURE, RESPONSIBILITY\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to manage with love and wisdom. Develop flexibility and ability to hear others. Use your power for protection and creation, not for destruction. Be a just and honest leader. Don't be afraid to take responsibility for your actions and the lives of others. Build firm foundations in everything. Learn to relax and let go of control sometimes."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is path of leader and builder. Use your energy to create something significant and long-lasting. Be a reliable support for others. Remember that true power lies in combination of firmness and wisdom. Don't be afraid of challenges, they make you stronger. Your success depends on your ability to build structure and order with respect for the freedom of others."
            }
        ]
    },
    5: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Fifth Energy Archetype – The Hierophant. Energy of knowledge, traditions and order. People with this energy are natural teachers and mentors, able to transmit wisdom and preserve values. They possess deep internal ethics.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: KNOWLEDGE, TRADITIONS, TEACHING\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Wisdom" },
                    { label: "Knowledge" },
                    { label: "Teaching" },
                    { label: "Traditions" },
                    { label: "Order" },
                    { label: "Ethics" },
                    { label: "Responsibility" },
                    { label: "Reliability" },
                    { label: "Spirituality" }
                ],
                description: "Energy of the Hierophant. You possess deep wisdom and a thirst for knowledge. You love to study and constantly self-improve. You are a natural teacher and know how to transmit information. Traditions, family values and order are important for you. You have strong internal ethics and a sense of duty. You are a reliable person on whom others can rely. Spirituality and deep meanings drive you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DOGMATISM, PRIDE, CATEGORICALNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Dogmatism" },
                    { label: "Pride" },
                    { label: "Categoricalness" },
                    { label: "Imposing one's opinion" },
                    { label: "Teacher's complex" },
                    { label: "Resistance to new" },
                    { label: "Hypocrisy" }
                ],
                description: "In negative, energy manifests as dogmatism and categoricalness. You can become proud and start to impose your opinion on others. Teacher's complex interferes with being a student and receiving new information. Resistance to changes and everything new can lead to stagnation. Hypocrisy and formal adherence to rules without internal content can destroy trust."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Studying new knowledge, reading books" },
                    { label: "Teaching others, sharing experience" },
                    { label: "Following family traditions" },
                    { label: "Restoring order in space" },
                    { label: "Visiting spiritual places" },
                    { label: "Communication with mentors" },
                    { label: "Participation in educational projects" },
                    { label: "Practices of mindfulness and ethics" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: KNOWLEDGE, TRADITIONS, TEACHING\n\nThese actions will help to bring your energy to plus.",
                description: "Be open to new knowledge, don't limit yourself only to old schemes. Share your wisdom with love and without imposing. Respect other people's views even if they differ from yours. Cultivate family values and traditions. Be an honest and reliable mentor. Develop your internal ethics. Learn to be a student at any age."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is path of teacher and guardian of traditions. Use your knowledge to enlighten others and help them find their path. Be a wise and honest mentor. Remember that true knowledge is only that which is used for good. Your success depends on your ability to combine adherence to traditions with openness to changes."
            }
        ]
    },
    6: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Sixth Energy Archetype – The Lovers. Energy of love, relationships and choice. People with this energy are communicative, kind and loving, often becoming the heart of social groups. They possess natural charm and a deep appreciation for beauty.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CHOICE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Sociable and charming" },
                    { label: "Aesthetically-minded, loves beauty" },
                    { label: "Unites people, creates harmony" },
                    { label: "Makes choices with the heart" },
                    { label: "Good taste in everything" },
                    { label: "Surrounded by many friends" },
                    { label: "Youthful appearance" },
                    { label: "Hospitable and welcoming" },
                    { label: "Popular and well-liked" },
                    { label: "Skilled in networking" },
                    { label: "Finds joy in communication" },
                    { label: "Emotionally open and expressive" }
                ],
                description: "Energy of the Lovers. You are a communicative, kind and loving person. You often become the heart of any social group, creating a warm and pleasant atmosphere around you. You are aesthetically inclined, appreciating beauty in all its forms. You are skilled at making connections and building relationships. You value harmony and are adept at resolving conflicts."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INDECISION, VANITY, DEPENDENCY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Indecisive, fears making choices" },
                    { label: "Superficial and vain" },
                    { label: "Unfaithful, emotionally immature" },
                    { label: "Overly attached to external beauty" },
                    { label: "Lacks self-love and acceptance" },
                    { label: "Prone to making mistakes in relationships" },
                    { label: "Critical and judgmental of others' appearance" },
                    { label: "Creates idols for themselves" },
                    { label: "Dependent on others' approval" },
                    { label: "Can be frivolous and unreliable" },
                    { label: "Avoids responsibility" },
                    { label: "Prone to gossip and idle chatter" }
                ],
                description: "In negative, energy manifests as indecisiveness and fear of making the wrong choice. You may become overly focused on appearances, leading to vanity and superficiality. You might struggle with commitment, flitting from one person to another without fully investing. Dependency on others' opinions and desire to be liked by everyone can lead to a lack of authenticity."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Cultivate self-love and acceptance" },
                    { label: "Make choices based on inner guidance" },
                    { label: "Develop authenticity and be true to yourself" },
                    { label: "Focus on inner qualities over outer appearance" },
                    { label: "Build relationships based on genuine connection" },
                    { label: "Learn to be decisive and trust your intuition" },
                    { label: "Appreciate the beauty in imperfection" },
                    { label: "Practice self-care and emotional nourishment" },
                    { label: "Let go of the need for everyone's approval" },
                    { label: "Take responsibility for your own happiness" },
                    { label: "Surround yourself with people who uplift you" },
                    { label: "Find a creative outlet to express your love for beauty" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOVE, RELATIONSHIPS, CHOICE\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to love and accept yourself unconditionally. Make choices from a place of inner knowing, not fear. Embrace authenticity and focus on inner qualities rather than just external appearances. Develop a strong inner compass to guide you toward choices aligned with your heart's desires. Practice being decisive and trust your intuition. Let go of the need for everyone's approval and take responsibility for your own happiness."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of love and conscious choice. Use your ability to unite people and create harmony. Learn to choose with your heart while staying true to yourself. Remember that true beauty comes from within. Your success depends on your ability to love yourself first, then extend that love to others. Be authentic, decisive, and build relationships based on genuine connection rather than external validation."
            }
        ]
    },
    7: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Seventh Energy Archetype – The Chariot. Energy of victory, leadership and movement. People with this energy are natural-born leaders who are not afraid to take charge and move forward with determination. They possess strong will, ambition and a drive to succeed.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: VICTORY, LEADERSHIP, MOVEMENT\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Leader, charismatic" },
                    { label: "Goal-oriented and ambitious" },
                    { label: "Energetic and active" },
                    { label: "Loves to travel and be in motion" },
                    { label: "Strives for success and recognition" },
                    { label: "Takes initiative and responsibility" },
                    { label: "Confident and self-assured" },
                    { label: "Inspires and motivates others" },
                    { label: "Strategic thinker" },
                    { label: "Resilient and persistent" },
                    { label: "Not afraid of challenges" },
                    { label: "Achieves goals quickly" }
                ],
                description: "Energy of the Chariot. You embody leadership, ambition and a drive to succeed. You are a natural-born leader who is not afraid to take charge and move forward with determination. You are goal-oriented, energetic and possess a strong will to win. You are an excellent strategist capable of leading teams to victory. You thrive on movement and progress, always looking for the next challenge to conquer."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, AUTHORITARIANISM, IMPATIENCE\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Aggressive and confrontational" },
                    { label: "Authoritarian and controlling" },
                    { label: "Lazy and passive" },
                    { label: "Sets goals but doesn't achieve them" },
                    { label: "Fears taking responsibility" },
                    { label: "Struggles with discipline" },
                    { label: "Creates chaos and disorganization" },
                    { label: "Wastes energy on pointless conflicts" },
                    { label: "Reluctant to delegate" },
                    { label: "Impatient and impulsive" },
                    { label: "Prone to burnout" },
                    { label: "Can be ruthless to get ahead" }
                ],
                description: "In negative, energy manifests as aggression, authoritarianism and a tendency to control others. The desire to win can become all-consuming, leading to a 'win at all costs' mentality. You may lack patience and rush into things without proper planning. This can lead to burnout from constant activity and a reluctance to delegate tasks, believing you are the only one who can do things right."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Set clear and achievable goals" },
                    { label: "Learn to delegate and trust others" },
                    { label: "Practice patience and strategic thinking" },
                    { label: "Channel energy into productive activities" },
                    { label: "Choose your battles wisely" },
                    { label: "Embrace a collaborative leadership style" },
                    { label: "Find healthy outlets for competitiveness" },
                    { label: "Learn to rest and recharge" },
                    { label: "Focus on the journey, not just the destination" },
                    { label: "Celebrate the successes of others" },
                    { label: "Develop self-discipline" },
                    { label: "Lead with inspiration, not intimidation" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: VICTORY, LEADERSHIP, MOVEMENT\n\nThese actions will help to bring your energy to plus.",
                description: "Temper your ambition with patience and strategic planning. Set realistic goals and delegate tasks to others, trusting in their abilities. Channel your energy constructively and choose your battles wisely. Embrace a collaborative leadership style rather than a dictatorial one. Find healthy outlets for your competitive nature, such as sports or challenging activities. Learn to rest and recharge to avoid burnout."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of the victorious leader and warrior. Use your strength to inspire and motivate others, not to control or intimidate. Remember that true victory is not just about winning, but about how you lead and who you become along the way. Your success depends on your ability to balance ambition with patience, action with strategy, and leadership with collaboration. Lead with heart, and you will achieve lasting triumph."
            }
        ]
    },
    8: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Eighth Energy Archetype – Justice. Energy of karma, balance and truth. People with this energy have a deep understanding of cause and effect and the importance of fairness. They are wise, responsible and able to see the bigger picture of how the universe works.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: JUSTICE, KARMA, BALANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Understands cause and effect" },
                    { label: "Fair and just" },
                    { label: "Responsible and reliable" },
                    { label: "Sees the truth of situations" },
                    { label: "Drawn to official systems and laws" },
                    { label: "Strives for balance and equilibrium" },
                    { label: "Honest and ethical" },
                    { label: "Good at resolving disputes" },
                    { label: "Has a strong sense of duty" },
                    { label: "Learns from past mistakes" },
                    { label: "Advocate for justice" },
                    { label: "Wise and discerning" }
                ],
                description: "Energy of Justice. You understand the laws of cause and effect and the importance of fairness and justice. You are often wise, responsible and have a deep understanding of how the universe works. You are able to see the bigger picture and understand the consequences of actions. You are drawn to systems, laws and structures, and you strive to create balance and order in your life and in the world."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: JUDGMENTAL, VICTIMHOOD, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Judgmental and critical" },
                    { label: "Blames others, avoids responsibility" },
                    { label: "Feels like a victim" },
                    { label: "Struggles with legal issues" },
                    { label: "Constantly fights for 'justice'" },
                    { label: "Cannot see the lessons in situations" },
                    { label: "Repeats the same mistakes" },
                    { label: "Cynical and pessimistic" },
                    { label: "Rigid and inflexible" },
                    { label: "Prone to arguments and conflicts" },
                    { label: "Feels that life is unfair" },
                    { label: "Holds onto grudges" }
                ],
                description: "In negative, energy manifests as a rigid and judgmental attitude. You may tend to blame others for your problems without taking personal responsibility. This can appear as feeling like a victim of circumstances, constantly fighting against perceived injustices. You may struggle with legal issues or a sense of being unfairly treated by the system. This can also lead to a cynical and pessimistic outlook on life."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Take responsibility for your life" },
                    { label: "Study the laws of cause and effect" },
                    { label: "Act with integrity and honesty" },
                    { label: "Learn to forgive and let go" },
                    { label: "Focus on creating positive outcomes" },
                    { label: "Cultivate a sense of inner balance" },
                    { label: "Seek to understand, not just to judge" },
                    { label: "Be fair in all your dealings" },
                    { label: "Find the lesson in every challenge" },
                    { label: "Let go of the victim mentality" },
                    { label: "Practice compassion for yourself and others" },
                    { label: "Strive to be a force for good in the world" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: JUSTICE, KARMA, BALANCE\n\nThese actions will help to bring your energy to plus.",
                description: "Take full responsibility for your life and choices. Understand that every action has a reaction. Cultivate a sense of inner justice and act with integrity in all situations. Learn to forgive, both yourself and others, to break free from cycles of blame and resentment. Focus on creating positive causes so you can expect positive effects. Embrace a more compassionate and understanding perspective to dissolve rigidity and judgment."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of justice and cosmic balance. Use your understanding of cause and effect to create a life of integrity and purpose. Remember that true justice begins with self-responsibility. Your success depends on your ability to see the lessons in every situation, to forgive rather than hold grudges, and to act as a fair and compassionate force for good in the world. What you put out returns to you — so put out wisdom, fairness and love."
            }
        ]
    },
    9: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Ninth Energy Archetype – The Hermit. Energy of wisdom, introspection and solitude. People with this energy are deep thinkers, philosophers and seekers of truth. They are self-sufficient and possess a great deal of inner wisdom, often sought out for their advice and guidance.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: WISDOM, INTROSPECTION, KNOWLEDGE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Wise and philosophical" },
                    { label: "Self-sufficient and independent" },
                    { label: "Enjoys solitude and introspection" },
                    { label: "Seeks knowledge and truth" },
                    { label: "Gives wise advice" },
                    { label: "Not attached to material possessions" },
                    { label: "Deep and thoughtful" },
                    { label: "Healer of soul and body" },
                    { label: "Trustworthy and reliable" },
                    { label: "Loves to read and learn" },
                    { label: "Has a rich inner world" },
                    { label: "Calm and composed" }
                ],
                description: "Energy of the Hermit. You represent wisdom, introspection and the pursuit of knowledge. You are a deep thinker, philosopher and seeker of truth. You are self-sufficient and enjoy spending time alone to reflect and recharge. You possess a great deal of inner wisdom and are often sought out for your advice. You are not interested in superficial matters, preferring to delve into the deeper meaning of life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ISOLATION, ARROGANCE, DISTRUST\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Lonely and isolated" },
                    { label: "Untrusting and closed-off" },
                    { label: "Neglects their physical health" },
                    { label: "Lives in their head, disconnected from reality" },
                    { label: "Intellectually arrogant" },
                    { label: "Fears relationships" },
                    { label: "Overly cautious and indecisive" },
                    { label: "Can be stingy and ungenerous" },
                    { label: "Lacks self-care" },
                    { label: "Depressive and pessimistic" },
                    { label: "Stuck in the past" },
                    { label: "Unwilling to share their wisdom" }
                ],
                description: "In negative, energy manifests as isolation, loneliness and a withdrawal from society. You may tend to be overly critical of yourself and others, with a reluctance to trust or open up to people. This can also appear as intellectual arrogance, where you look down on those perceived as less intelligent. There may be neglect of the physical body and material responsibilities in favor of purely intellectual pursuits."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Share your wisdom with others" },
                    { label: "Find a balance between solitude and socializing" },
                    { label: "Learn to trust and open up to people" },
                    { label: "Take care of your physical body" },
                    { label: "Ground yourself in the present moment" },
                    { label: "Find practical ways to apply your knowledge" },
                    { label: "Let go of intellectual pride" },
                    { label: "Engage in activities that bring you joy" },
                    { label: "Connect with nature" },
                    { label: "Practice generosity and kindness" },
                    { label: "Seek out like-minded companions" },
                    { label: "Create a comfortable and nurturing home environment" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: WISDOM, INTROSPECTION, KNOWLEDGE\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to bridge your inner world with the outer world. Share your wisdom and knowledge with others rather than keeping it to yourself. Cultivate meaningful relationships and learn to trust others. Pay attention to your physical well-being and find a balance between mental and physical activities. Engage with the world and find practical applications for your knowledge. Let go of intellectual pride and practice generosity."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of the wise sage and seeker of truth. Use your deep wisdom to illuminate the way for others, but remember to also stay connected to the world around you. True wisdom is not just found in solitude — it is tested and strengthened in relationships. Your success depends on your ability to balance introspection with engagement, knowledge with action, and solitude with connection. Share your light, and you will never walk alone."
            }
        ]
    },
    10: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Tenth Energy Archetype – The Wheel of Fortune. Energy of luck, cycles and destiny. People with this energy are often in the right place at the right time. They are adaptable, easy-going and able to go with the flow, trusting that the universe will support them.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LUCK, FLOW, DESTINY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Lucky and fortunate" },
                    { label: "In the flow of life" },
                    { label: "Trusts the universe" },
                    { label: "Easy-going and adaptable" },
                    { label: "Attracts opportunities easily" },
                    { label: "Sociable and enjoys being in a team" },
                    { label: "Financially prosperous" },
                    { label: "Moves through life with ease" },
                    { label: "Always in a good mood" },
                    { label: "Surrounded by helpful people" },
                    { label: "Finds success without struggle" },
                    { label: "Has a knack for being in the right place at the right time" }
                ],
                description: "Energy of the Wheel of Fortune. You are associated with luck, good fortune and being in the flow of life. You often find yourself in the right place at the right time. You are adaptable and able to go with the flow, trusting that the universe will support you. You are often part of a collective and enjoy being in a team. You are easy-going, sociable and attract opportunities without much effort."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PASSIVITY, RESISTANCE, STAGNATION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Passive and lazy" },
                    { label: "Resists change and movement" },
                    { label: "Gets stuck in negative cycles" },
                    { label: "Lacks initiative and drive" },
                    { label: "Relies on others to solve their problems" },
                    { label: "Can be easily influenced" },
                    { label: "Struggles with financial instability" },
                    { label: "Feels like a victim of fate" },
                    { label: "Surrounded by negative or draining people" },
                    { label: "Goes against the flow of life" },
                    { label: "Works hard with little result" },
                    { label: "Misses opportunities" }
                ],
                description: "In negative, energy manifests as passivity, laziness and resistance to change. You may get stuck in a rut, repeating the same cycles without learning from them. You might tend to rely too much on luck without putting in the necessary effort. This can also lead to a lack of direction and a feeling of being at the mercy of fate, rather than being the creator of your own destiny."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Take initiative and be proactive" },
                    { label: "Set clear goals and intentions" },
                    { label: "Surround yourself with positive people" },
                    { label: "Trust your intuition to guide you" },
                    { label: "Be open to new opportunities" },
                    { label: "Learn from past cycles and patterns" },
                    { label: "Develop a strong inner core" },
                    { label: "Find a balance between action and allowing" },
                    { label: "Believe in your ability to create your own reality" },
                    { label: "Let go of resistance to change" },
                    { label: "Practice gratitude for your blessings" },
                    { label: "Join a supportive community or team" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LUCK, FLOW, DESTINY\n\nThese actions will help to bring your energy to plus.",
                description: "Become an active participant in your own life. Find the balance between trusting the flow and taking inspired action. Develop a clear sense of purpose and direction. Surround yourself with positive and supportive people who encourage growth. Take initiative and make conscious choices to steer the Wheel of Fortune in your desired direction. Stop relying solely on luck — create your own luck through inspired action."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of fortunate flow and conscious destiny. Use your natural luck as a foundation, but never forget that you are the one who steers the wheel. Trust the universe, but also take inspired action. Your success depends on your ability to balance going with the flow with taking initiative. Be adaptable, stay positive, surround yourself with uplifting people, and remember — luck favors those who are prepared and willing to move when opportunity knocks."
            }
        ]
    },
    11: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Eleventh Energy Archetype – Strength. Energy of power, potential and force. People with this energy are hardworking, resilient and have a great capacity for endurance. They are natural leaders who inspire others with their passion and drive, capable of achieving great things.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: STRENGTH, POWER, POTENTIAL\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Strong and powerful" },
                    { label: "Hardworking and resilient" },
                    { label: "High potential for success" },
                    { label: "Loves to work and be active" },
                    { label: "Inspiring and charismatic leader" },
                    { label: "Passionate and driven" },
                    { label: "Physically strong and enduring" },
                    { label: "Achieves great results" },
                    { label: "Generous and kind-hearted" },
                    { label: "Protector of the weak" },
                    { label: "Has a zest for life" },
                    { label: "Capable of handling large volumes of work" }
                ],
                description: "Energy of Strength. You possess immense strength, power and potential. You are hardworking, resilient and have a great capacity for endurance. You are a natural leader who inspires others with your passion and drive. You are not afraid of hard work and are capable of achieving great things. You have a strong connection to your physical body and enjoy activities that challenge you physically."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, BURNOUT, POWERLESSNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Aggressive and forceful" },
                    { label: "Workaholic, prone to burnout" },
                    { label: "Imposes their will on others" },
                    { label: "Weak and powerless" },
                    { label: "Lacks motivation and drive" },
                    { label: "Pressures and controls others" },
                    { label: "Rude and abrasive" },
                    { label: "Wastes their potential" },
                    { label: "Doubts their own strength" },
                    { label: "Prone to exhaustion and illness" },
                    { label: "Can be brutal and merciless" },
                    { label: "Clings to power" }
                ],
                description: "In negative, energy manifests as aggression, burnout or a feeling of powerlessness. You may tend to push yourself too hard, leading to exhaustion and health problems. This can lead to a 'workaholic' mentality where your self-worth is tied to productivity. You may struggle with controlling your strength, leading to outbursts of anger or a tendency to dominate others. Conversely, it can also manifest as weakness, apathy and lack of motivation."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Learn to manage your energy and avoid burnout" },
                    { label: "Find work that you are passionate about" },
                    { label: "Balance hard work with rest and play" },
                    { label: "Channel your strength into positive outlets" },
                    { label: "Practice kindness and compassion" },
                    { label: "Recognize the power in gentleness" },
                    { label: "Let go of the need to control everything" },
                    { label: "Trust in your own abilities" },
                    { label: "Delegate and work in a team" },
                    { label: "Take care of your physical and mental health" },
                    { label: "Use your strength to help and protect others" },
                    { label: "Find joy in the process, not just the result" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: STRENGTH, POWER, POTENTIAL\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to manage your power wisely. Find the 'golden mean' — knowing when to push forward and when to rest. Channel your strength into activities aligned with your values and passions. Work smarter, not just harder. Cultivate inner strength based on self-love and compassion rather than brute force. Recognize that true strength lies in kindness and the ability to uplift others. Let go of the need to control everything and trust your own abilities."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of tempered strength and wise power. Use your immense potential to achieve great things, but never forget that true power is gentle, not brutal. Your success depends on your ability to balance hard work with rest, action with reflection, and force with kindness. Be a protector, not a dominator. Be passionate, but not reckless. Remember — the strongest people are those who uplift others, not those who push them down."
            }
        ]
    },
    12: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Twelfth Energy Archetype – The Hanged Man. Energy of service, different perspective and new direction. People with this energy see the world from a different angle, endowed with kindness, mercy and altruism. They find their own unique way and help others look at the world differently.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SERVICE, PERSPECTIVE, SPIRITUALITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Mercy" },
                    { label: "Compassion" },
                    { label: "Altruism" },
                    { label: "Kindness" },
                    { label: "Serving people" },
                    { label: "Creative thinking" },
                    { label: "Originality" },
                    { label: "Diplomacy" },
                    { label: "Openness" },
                    { label: "Intuition" },
                    { label: "Search for new" }
                ],
                description: "Energy of the Hanged Man. You possess a unique vision of the world and find non-standard solutions. You are kind, merciful and ready to help. Serving people and society is your natural state. You don't like to be like everyone else, you have your own path. You are distinguished by high sensitivity and well-developed intuition. You are a natural diplomat and know how to find a common language with anyone. Spirituality and internal harmony are important for you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: SACRIFICE, STAGNATION, DEPRESSION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Sacrifice" },
                    { label: "Stagnation" },
                    { label: "Inability to say no" },
                    { label: "Feeling of guilt" },
                    { label: "Depression" },
                    { label: "Apathy" },
                    { label: "Laziness" },
                    { label: "Dependencies" },
                    { label: "Grudges" },
                    { label: "Complaintiveness" }
                ],
                description: "In negative, energy manifests as sacrifice. You put interests of others above your own, even to your detriment. You don't know how to say 'no', which leads to exhaustion. Feeling of guilt and constant grudges take away your strength. Stagnation in life, inability to find a way out of a difficult situation. Apathy, laziness and lack of goals. You can fall into dependencies or start to complain about life, expecting pity from others."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Engagement in creativity and art" },
                    { label: "Helping others, charity" },
                    { label: "Solitude and meditation" },
                    { label: "Rest on nature, especially near water" },
                    { label: "Yoga and breathing practices" },
                    { label: "Viewing world from unusual perspective (e.g. traveling)" },
                    { label: "Learning something new and non-standard" },
                    { label: "Care for your body, relax" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SERVICE, PERSPECTIVE, SPIRITUALITY\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to say 'no' and protect your boundaries. Serve people from a set state, not from sacrifice. Develop your unique vision and don't be afraid to be different. Find creative ways for self-expression. Learn to receive as well as give. Work through feeling of guilt and grudges. Stay in a state of flow and trust the life. Be more active and don't get stuck in one place."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of service and unique vision. Use your kindness and mercy for good. Show the world a different perspective on usual things. Remember that you can only truly help others when you take care of yourself first. Don't be afraid to go your own way, even if it seems strange to others. Your success depends on your ability to find balance between serving society and personal freedom. Be a source of light and non-standard ideas."
            }
        ]
    },
    13: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Thirteenth Energy Archetype – Death (Rebirth). Energy of transformation, change and renewal. People with this energy are extreme, unpredictable and energetic. They easily let go of the old and are ready for radical changes, constantly transitioning to new levels.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TRANSFORMATION, FEARLESSNESS, REBIRTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Energeticness" },
                    { label: "Fearlessness" },
                    { label: "Love for risk" },
                    { label: "Activity" },
                    { label: "Decisiveness" },
                    { label: "Creativity" },
                    { label: "Adaptability" },
                    { label: "Endurance" },
                    { label: "Passion" },
                    { label: "Clairvoyance" }
                ],
                description: "Energy of Death (Rebirth). You are a person of action and change. You possess enormous life force and are not afraid of risks. You easily adapt to new conditions and are ready to start from zero. You have an innate feeling for when something needs to be completed and something new started. Your life is full of transformations and transitions to new levels. You are brave, decisive and energetic. You can have a strong intuition and interest in esoterics."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HOT TEMPER, FEAR OF CHANGE, AGGRESSION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Hot temper" },
                    { label: "Aggressiveness" },
                    { label: "Fear of changes" },
                    { label: "Holding on to old" },
                    { label: "Obsession with death/past" },
                    { label: "Unpredictability" },
                    { label: "Lack of stability" },
                    { label: "Fussiness" },
                    { label: "Cruelty" }
                ],
                description: "In negative, energy manifests as fear of changes and holding on to the old. You can become hot-tempered, aggressive and unpredictable. You have difficulties in letting go of what has already outlived itself. Obsession with past events or the theme of death. Lack of stability in actions and emotions. You can manifest cruelty and indifference. Fussiness and inability to concentrate on one thing."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Extreme sports, adrenaline" },
                    { label: "Traveling, visiting new places" },
                    { label: "Radical changes in life (moving, change of work)" },
                    { label: "Meditation on fire, purification" },
                    { label: "Spiritual practices, yoga" },
                    { label: "Decluttering, throwing away old things" },
                    { label: "Engagement in creativity, transformation of space" },
                    { label: "Active rest" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: TRANSFORMATION, FEARLESSNESS, REBIRTH\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to let go of the old with gratitude. Don't be afraid of changes, they open new possibilities for you. Develop your flexibility and adaptability. Direct your energy for creation, not destruction. Learn to control your emotions and hot temper. Engage in creativity, transform the world around you. Trust your intuition. Lead an active way of life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of transformation and rebirth. Use your fearlessness and energy to bring changes to the world. Be a catalyst for development for yourself and others. Remember that death is always followed by birth. Your success depends on your ability to move forward, not looking back. Be a pioneer, don't fear difficulties. Your life is a constant process of renewal."
            }
        ]
    },
    14: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Fourteenth Energy Archetype – Temperance. Energy of maturity, art and moderation. People with this energy have a thin soul organization, are creative and balanced. They possess high sensitivity, a gift for healing, and strive for harmony in everything.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MODERATION, ART, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Moderation" },
                    { label: "Balance" },
                    { label: "Creativity" },
                    { label: "Sensitivity" },
                    { label: "Kindness" },
                    { label: "Patience" },
                    { label: "Artistry" },
                    { label: "Wisdom" },
                    { label: "Healing abilities" },
                    { label: "Diligence" }
                ],
                description: "Energy of Temperance. You possess deep internal wisdom and a sense of measure. You are a creative person, sensitive and kind. You know how to find balance where others see conflicts. Art and beauty play a large role in your life. You have the gift of healing — both through word and through your state. You are patient, diligent and strive for maturity in everything. Your energy is calm and balanced."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: GREED, IMPATIENCE, DEPENDENCIES\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Lack of measure" },
                    { label: "Greed" },
                    { label: "Impatience" },
                    { label: "Dependencies" },
                    { label: "Closedness" },
                    { label: "Vulnerability" },
                    { label: "Apathy" },
                    { label: "Gossiping" },
                    { label: "Arrogance" }
                ],
                description: "In negative, energy manifests as lack of measure and greed. You can become impatient and demanding. Tendency to fall into dependencies (alcohol, etc.). Excessive vulnerability and touchiness. Closedness and unwillingness to share your internal state. You can become arrogant or vice versa, fall into apathy. Loss of internal balance and harmony. Gossiping and dissatisfaction with life."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Engagement in art and creativity" },
                    { label: "Listening to quality music" },
                    { label: "Rest near water, swimming" },
                    { label: "Solitude and meditation" },
                    { label: "Communication with soul-friends" },
                    { label: "Reading books, self-development" },
                    { label: "Visiting theaters, exhibitions" },
                    { label: "Following mode of the day and healthy lifestyle" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: MODERATION, ART, HARMONY\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to maintain measure in everything: in nutrition, emotions, work. Develop your creative talents and don't be afraid to show them. Find your internal balance and trust your soul. Be patient and kind to yourself and others. Avoid extremes and dependencies. Engage in self-realization through art. Learn to hear your intuition. Spend more time near water."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of maturity and harmony. Use your sensitivity and creative gift to make the world more beautiful. Be a source of calm and balance for others. Remember that true maturity comes through internal work and patience. Don't be afraid of your depth. Your success depends on your ability to live in harmony with your soul. Be a guardian of beauty and moderation."
            }
        ]
    },
    15: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Fifteenth Energy Archetype – The Devil. Energy of manifestation, temptation and earthly pleasures. People with this energy have powerful charisma and see through people and the world. They possess enormous potential for success and influence.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHARISMA, INFLUENCE, BUSINESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Charisma" },
                    { label: "Influence" },
                    { label: "Sexuality" },
                    { label: "Business skills" },
                    { label: "Brightness" },
                    { label: "Intuition" },
                    { label: "Optimism" },
                    { label: "Oratory art" },
                    { label: "Leadership" }
                ],
                description: "Energy of the Devil. You are a very bright and charismatic person. You see through everyone; hidden flaws or possibilities are not a secret for you. You have strong internal energy and sexuality. You are a natural leader and entrepreneur. Success and material benefits are easily attracted to you. You know how to influence people and the world. You have a good sense of humor and love for life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, GREED, DEPENDENCIES\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Manipulation" },
                    { label: "Greed" },
                    { label: "Aggression" },
                    { label: "Pride" },
                    { label: "Vanity" },
                    { label: "Dependencies" },
                    { label: "Jealousy" },
                    { label: "Cruelty" },
                    { label: "Secretiveness" }
                ],
                description: "In negative, energy manifests as manipulation and desire for power. You can become greedy, aggressive and arrogant. Tendency to fall into different kinds of dependencies. Excessive vanity and pride. You can start to search for flaws in others, forgetting about yourself. Cruelty and inability to forgive. Jealousy and desire for total control. Fixation only on the material and pleasures."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Success and public recognition" },
                    { label: "High status, beautiful things, luxury" },
                    { label: "Large-scale projects, business" },
                    { label: "Manifesting your sexuality and charisma" },
                    { label: "Leadership and management" },
                    { label: "Visiting bright events, parties" },
                    { label: "Traveling in luxury" },
                    { label: "Spiritual practices, work with shadow sides" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHARISMA, INFLUENCE, BUSINESS\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to use your power and influence for good. Work through your dependencies and shadow sides. Be more merciful and kind to the flaws of others. Direct your energy into business and creativity. Avoid pride and manipulation. Develop your spiritual side. Learn to be grateful for everything you have. Be an honest and worthy leader."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of manifestation and influence. Use your charisma to help the world see the truth. Be a wise leader and mentor. Remember that true success starts with internal honesty. Don't be afraid of your power, but learn to manage it with love. Your success depends on your ability to combine material and spiritual. Be a source of transformation for others."
            }
        ]
    },
    16: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Sixteenth Energy Archetype – The Tower. Energy of spiritual awakening, destruction of the old and new foundation. People with this energy have a strong internal core and have experienced deep internal changes. They are not afraid to destroy what is outdated to build something new and firm.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AWAKENING, CORE, CREATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Strong will" },
                    { label: "Spiritual depth" },
                    { label: "Bravery" },
                    { label: "Activity" },
                    { label: "Decisiveness" },
                    { label: "Ability to lead" },
                    { label: "Transformation" },
                    { label: "Energy" },
                    { label: "Internal core" },
                    { label: "Optimism" }
                ],
                description: "Energy of the Tower. You possess a strong character and internal core. You are not afraid to destroy what has already outlived itself to build something better. You are a person of action, energetic and brave. You have deep spiritual wisdom. You know how to lead people through crises. You possess optimism and faith in yourself. Your life is full of transformations that make you stronger. You are a natural builder and creator."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DESTRUCTION, AGGRESSION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Destruction" },
                    { label: "Aggressiveness" },
                    { label: "Rigidity" },
                    { label: "Fear of changes" },
                    { label: "Strong attachments" },
                    { label: "Stubbornness" },
                    { label: "Explosiveness" },
                    { label: "Narrowness of thinking" },
                    { label: "Apathy" }
                ],
                description: "In negative, energy manifests as destruction and aggression. You can become too rigid and stubborn. Explosive character and hot temper. Fear of changes and strong attachments to material things or old scenarios. You can start to destroy relationships or projects from internal tension. Narrowness of thinking and refusal of spirituality. Apathy and loss of meaning of life after crises."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Spiritual practices, meditation" },
                    { label: "Construction and renovation, order in space" },
                    { label: "Physical activity, sport" },
                    { label: "Leading a group of people" },
                    { label: "Traveling, change of environment" },
                    { label: "Learning something new and deep" },
                    { label: "Engagement in creativity" },
                    { label: "Assistance to people in crisis situations" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AWAKENING, CORE, CREATION\n\nThese actions will help to bring your energy to plus.",
                description: "Don't be afraid to let go of the old — it's necessary for building something new. Develop your spiritual side. Work with your aggressiveness and hot temper. Be more flexible and open to compromises. Direct your energy into construction and creation. Learn to find peace within yourself. Trust life and its transformations. Be a leader who inspires by example."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of spiritual awakening and transformation. Use your internal core to help others through their own changes. Be a source of stability and wisdom in times of crisis. Remember that every destruction is an opportunity for a new, firmer foundation. Don't be afraid to let go of the old. Your success depends on your spiritual depth and ability to stay calm in any storm. Be a spiritual leader."
            }
        ]
    },
    17: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Seventeenth Energy Archetype – The Star. Energy of creativity, brightness and talent. People with this energy are bright personalities who have realized their talents. They possess soft and creative energy, needing to follow their star, listen to themselves and go for their dreams. It is important for them to shine and gather attention through their creativity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
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
                description: "Energy of the Star. From birth you are a bright personality: you stand out from the crowd, you have a multitude of talents, an attractive appearance and powerful charisma. You realize your creative impulses, go for your dream and listen only to your internal voice. You shine for those around you, you are in the center of attention, you are admired and imitated. You like publicity and fame. You possess a unique imagination and creative thinking. You draw inspiration from nature and from communication with like-minded people. You are a kind and open person. You can heal others through your abilities, intuition and high sensitivity. You like spiritual practices, secret knowledge and esoterics."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
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
                description: "In negative, energy manifests as unrealizedness: you stay in the shade, hide your talents and doubt your abilities. You might lead a closed lifestyle, fearing the center of attention and implementation of your dreams. Creative crises are common. Another manifestation is 'star sickness': pride, vanity and arrogance. You may become selfish, manipulative and fixated on material success while ignoring the spiritual. Withdrawal from reality through illusions or dependencies can occur. You might also struggle with self-acceptance."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Creative activities: dances, drawing, singing" },
                    { label: "Freedom in manifestation" },
                    { label: "Public speeches" },
                    { label: "Spending time in large companies, staying in center of attention" },
                    { label: "Visiting bright events" },
                    { label: "Implementing creative ideas, creating unique product" },
                    { label: "Sport, active rest" },
                    { label: "Success, public recognition, fame" },
                    { label: "Shopping, beautiful purchases for self" },
                    { label: "Visiting spa, beauty salon, massage" },
                    { label: "Traveling" },
                    { label: "Interesting conversations with creative people" },
                    { label: "Meeting new people, getting acquainted" },
                    { label: "Team work" },
                    { label: "Performing on stage" },
                    { label: "Learning new" },
                    { label: "Watching inspiring films, listening to music" },
                    { label: "Filming content, video, sharing in social networks" },
                    { label: "Leading your blog" },
                    { label: "Spending time with family" },
                    { label: "Meditations, yoga, spiritual practices" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThese actions will help to bring your energy to plus.",
                description: "Write down your goals and specific ways to implement them. Reveal your creative potential and show your talents to the world. Find a favorite matter that truly inspires you. Follow the impulses of your heart and develop your intuition. Communicate with like-minded people, get acquainted with different people, be open to communication. Don't fear to experiment with your style and be bright. Refuse pride and vanity; be open and give love. Allow yourself to be successful and famous, becoming an example for many."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of the shining star and creative expression. Live a real life without refusing your creative abilities. Develop your strong sides, but remember that success is based on diligence and hard work. Set clear goals choosing activities that resonate with your soul. If you choose a public profession, do it to help and inspire people rather than just for fame. Look at situations with optimism, maintain calm and avoid extremes. Balance your physical and spiritual well-being."
            }
        ]
    },
    18: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Eighteenth Energy Archetype – The Moon. Energy of mystery, intuition and imagination. People with this energy have a mysterious and deep internal world. They possess powerful creative potential, strong intuition and the ability to materialize their thoughts.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTUITION, IMAGINATION, MYSTERY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Intuition" },
                    { label: "Imagination" },
                    { label: "Mystery" },
                    { label: "Creativity" },
                    { label: "Kindness" },
                    { label: "Sensitivity" },
                    { label: "Empathy" },
                    { label: "Artistry" },
                    { label: "Romanticism" },
                    { label: "Psychology" },
                    { label: "Materialization of thoughts" }
                ],
                description: "Energy of the Moon. You possess deep intuition and a unique imagination. You are a mysterious and sensitive person. Your internal world is very rich and diverse. You easily feel the state of other people. Creativity and art are your natural environment. You have the ability to materialize your thoughts and dreams. Sensitivity and romanticism make you attractive to others. You are interested in psychology and secret knowledge."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, ILLUSIONS, DECEITS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Fears" },
                    { label: "Illusions" },
                    { label: "Deceits" },
                    { label: "Dependencies" },
                    { label: "Closedness" },
                    { label: "Gossiping" },
                    { label: "Pessimism" },
                    { label: "Apathy" },
                    { label: "Internal tension" },
                    { label: "Phobias" }
                ],
                description: "In negative, energy manifests as many fears and phobias. You can live in your own illusions and deceptions. Tendency to fall into different kinds of dependencies. Closedness and unwillingness to share your internal state. You can become pessimistic and fall into apathy. Gossiping and intrigues. Internal tension and anxiety. Materialization of negative thoughts and fears in real life."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Rest near water, evening walks under the moon" },
                    { label: "Engagement in creativity and art" },
                    { label: "Studying psychology and esoteric knowledge" },
                    { label: "Meditation and work with subconscious" },
                    { label: "Solitude and rest" },
                    { label: "Viewing high-quality films, reading books" },
                    { label: "Communication with interesting people" },
                    { label: "Aromatherapy and relaxing procedures" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTUITION, IMAGINATION, MYSTERY\n\nThese actions will help to bring your energy to plus.",
                description: "Work through your fears and phobias. Trust your intuition and follow its prompts. Develop your creative imagination and direct it towards creation. Learn to distinguish your true desires from illusions. Be more open and honest. Engage in spiritual practices and work with the subconscious. Create a cozy and harmonious space around you. Materialize positive thoughts."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of mystery and intuition. Use your imagination to create something unique. Be a source of inspiration and sensitivity. Remember that your thoughts have enormous power of materialization. Don't be afraid of your depth and mystery. Your success depends on your ability to live in harmony with your internal world and trust life. Be a guide to the world of subconscious and beauty."
            }
        ]
    },
    19: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Nineteenth Energy Archetype – The Sun. Energy of scale, action and ideology. People with this energy are natural leaders, creative and shining. They are endowed with warmth and creative potential, carrying light to many. They possess optimism, generosity and the ability to inspire others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, LEADERSHIP, OPTIMISM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Leadership" },
                    { label: "Optimism" },
                    { label: "Success" },
                    { label: "Creativity" },
                    { label: "Abundance" },
                    { label: "Activity" },
                    { label: "Generosity" },
                    { label: "Oratory art" },
                    { label: "Sociality" },
                    { label: "Gratitude" }
                ],
                description: "Energy of the Sun. You are a very bright and large-scale person. You possess natural leadership and know how to lead people. Optimism and love for life are your main qualities. You are creative and possess a multitude of talents. Success and prosperity are attracted to you naturally. You are a generous and open person. You know how to inspire and carry light to many. Your energy is warm and attractive. Scale and global projects motivate you."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, AGGRESSION, BURNOUT\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Demandingness" },
                    { label: "Vanity" },
                    { label: "Aggressiveness" },
                    { label: "Pride" },
                    { label: "Burning out" },
                    { label: "Arrogance" },
                    { label: "Egoism" },
                    { label: "Fixation on material" },
                    { label: "Dissatisfaction" }
                ],
                description: "In negative, energy manifests as excessive demandingness towards self and others. You can become proud, arrogant and aggressive. Tendency to 'burn out' yourself or others from internal tension. Vanity and desire for total recognition. Egoism and fixation only on your interests. Dissatisfaction with life and what has been achieved. You can start to suppress people with your energy."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Solar energy, rest in the sun" },
                    { label: "Communication with children and family" },
                    { label: "Large-scale projects and business" },
                    { label: "Public speeches and recognition" },
                    { label: "Gratitude and spiritual practices" },
                    { label: "Engagement in creativity, hobby" },
                    { label: "Success and reaching goals" },
                    { label: "Travels to bright and sunny countries" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SCALE, LEADERSHIP, OPTIMISM\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to direct your energy into several projects, don't get fixated on one thing. Manifest generosity and kindness. Work through your pride and vanity. Be more patient with the flaws of others. Develop your creative potential and share it with the world. Practice gratitude daily. Be a leader who inspires, not suppresses. Allow yourself to be successful and bright."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of scale and success. Use your warmth and leadership to help many find their path. Be a source of light and optimism. Remember that true success starts from internal state of abundance. Don't be afraid of large-scale goals and global projects. Your success depends on your ability to live in a state of flow and trust. Be a sunny person for the world."
            }
        ]
    },
    20: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Twentieth Energy Archetype – Judgment. Energy of integrity, ancestry and clairvoyance. People with this energy have a deep connection to their ancestry and possess deep wisdom. They unite families and systems, carrying information between generations.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, WISDOM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Intuition" },
                    { label: "Wisdom" },
                    { label: "Family-orientedness" },
                    { label: "Healing" },
                    { label: "Adaptability" },
                    { label: "Connection with ancestry" },
                    { label: "Oratory art" },
                    { label: "Patriotism" },
                    { label: "Mediation" },
                    { label: "Integrity" }
                ],
                description: "Energy of Judgment. You possess deep internal wisdom and well-developed intuition. You have a strong connection with your ancestry and traditions. You are a person of integrity who knows how to see the whole picture. You easily adapt to new conditions and know how to heal — through word or state. You are a natural mediator and peacemaker. Family and relationships play a large role in your life. You possess oratory art and can transmit information to many."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: JUDGMENT, GRUDGES, PRIDE\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Judgment" },
                    { label: "Grudges" },
                    { label: "Problems with relatives" },
                    { label: "Pride" },
                    { label: "Fear of changes" },
                    { label: "Categoricalness" },
                    { label: "Aggression" },
                    { label: "Closedness" },
                    { label: "Complexity of relationships" }
                ],
                description: "In negative, energy manifests as judgment of other people, especially relatives. You can become proud, categorical and aggressive. Grievances and problems with the family and ancestry take away your strength. Fear of changes and holding on to old scenarios. Closedness and inability to find a common language with people. Internal tension and dissatisfaction. You can start to blame everyone around for your problems."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Communication with family and relatives" },
                    { label: "Studying genealogy and ancestry history" },
                    { label: "Spiritual practices, meditation" },
                    { label: "Solitude and rest" },
                    { label: "Traveling to places of origin" },
                    { label: "Creation of family traditions" },
                    { label: "Helping people in difficult situations" },
                    { label: "Public speaking and sharing experience" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTEGRITY, ANCESTRY, WISDOM\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to forgive and accept your relatives. Work through your grudges and judgment. Strengthen the connection with your ancestry. Be more flexible and open to everything new. Develop your intuition and trust yourself. Share your wisdom and experience. Be an honest and worthy person. Learn to see the whole picture of life, without dividing it into 'good' and 'bad'."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of integrity and wisdom. Use your connection with ancestry to find strength and support. Be a source of harmony and knowledge for others. Remember that everything in the world is interconnected. Don't be afraid to change and develop. Your success depends on your ability to live in peace with your family and yourself. Be a guardian of ancestry secrets and wisdom."
            }
        ]
    },
    21: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Twenty-first Energy Archetype – The World. Energy of diplomacy, expansion and adaptation. People with this energy are peacemakers, open to the whole world. They unite nations and global projects, possessing a global scale of thinking.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, TOLERANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Diplomacy" },
                    { label: "Openness" },
                    { label: "Scale" },
                    { label: "Travel" },
                    { label: "Adaptability" },
                    { label: "Tolerance" },
                    { label: "Peacemaking" },
                    { label: "Foreign languages" },
                    { label: "Creativity" },
                    { label: "Optimism" }
                ],
                description: "Energy of the World. You are a person of global scale and thinking. You possess natural diplomacy and know how to find a common language with anyone. You are open to the world, other cultures and religions. Travels and expansion of boundaries are your natural state. You easily adapt to new conditions and people. You are a peacemaker and strive for harmony. Success and global projects are attracted to you naturally. Use your talents for the good of the whole world."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, CONFLICTS, CLOSEDNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Militance" },
                    { label: "Categoricalness" },
                    { label: "Conflictness" },
                    { label: "Fear of scale" },
                    { label: "Closedness" },
                    { label: "Dissatisfaction" },
                    { label: "Inflexibility" },
                    { label: "Intolerance" },
                    { label: "Phobias" }
                ],
                description: "In negative, energy manifests as militance and conflictness. You can become categorical, intolerant and aggressive. Fear of scale and large projects. Closedness and unwillingness to see anything beyond your boundaries. Dissatisfaction with life and the world around. You can start to conflict with people of other views or religions. Internal tension and phobias. Loss of flexibility and adaptability."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Traveling all over the world" },
                    { label: "Studying foreign languages and cultures" },
                    { label: "Global projects and business" },
                    { label: "Meditation and spiritual practices" },
                    { label: "Peacemaking activity" },
                    { label: "Viewing high-quality films, reading world classics" },
                    { label: "Communication with different people" },
                    { label: "Rest in nature, in places of power" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DIPLOMACY, EXPANSION, TOLERANCE\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to be tolerant and open to everything new. Develop your global thinking and don't be afraid of scale. Travel and expand your boundaries. Work through your militance and conflictness. Be a peacemaker and diplomat. Share your experience with the world. Practice meditation and find peace within yourself. Be grateful for everything that happens in your life."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of peacemaker and global actor. Use your diplomacy and scale to help the world find unity. Be a source of harmony and openness. Remember that all of us are citizens of one planet. Don't be afraid of large-scale goals. Your success depends on your ability to live in harmony with the whole world. Be a world-person."
            }
        ]
    },
    22: {
        title: "My energy source",
        intro: "The energy source is the energy with which you came into this life. Usually, it shines brightly when we are left alone with ourselves. The resource zone is responsible for replenishing our energy source. When we need to restore our inner strength, it's the energy of the resource zone that helps us to do so.\n\nThe resource zone is also your business card. This energy radiates from you and largely contributes to the feeling of \"being yourself.\"",
        archetype: "Twenty-second Energy Archetype – The Fool. Energy of freedom, lightness and activity. People with this energy are free from frames and social norms. They follow their own rules and trust the world, carrying innovation and optimism wherever they go.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, INNOVATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states.",
                items: [
                    { label: "Freedom" },
                    { label: "Lightness" },
                    { label: "Innovation" },
                    { label: "Optimism" },
                    { label: "Adventurism" },
                    { label: "Creativity" },
                    { label: "Activity" },
                    { label: "Sense of humor" },
                    { label: "Openness" },
                    { label: "Simplicity" }
                ],
                description: "Energy of the Fool. You are a person free from frames and conventions. You possess natural lightness and optimism. You are creative and love everything new and unusual. Adventurism and playfulness are your natural states. You follow your own path and trust the world. You are a very open and simple person in communication. You have a great sense of humor. Your energy is active and mobile. You know how to live 'here and now' and enjoy life."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IRRESPONSIBILITY, DEPENDENCIES, ATTACHMENTS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states.",
                items: [
                    { label: "Irresponsibility" },
                    { label: "Dependencies" },
                    { label: "Attachments" },
                    { label: "Jealousy" },
                    { label: "Inadequacy" },
                    { label: "Lawlessness" },
                    { label: "Frivolity" },
                    { label: "Lack of goals" },
                    { label: "Internal tension" }
                ],
                description: "In negative, energy manifests as total irresponsibility and frivolity. You can become lawless and manifest inadequacy. Tendency to fall into different kinds of dependencies. Strong attachments (to people, things, scenarios) that take away your freedom. Jealousy and desire to limit the freedom of others. Lack of goals and sense of life. Internal tension and anxiety. You can start to live only for today, forgetting about the future."
            },
            {
                id: "resource",
                label: "What can energise me?",
                intro: "These life actions fill your resource zone and activate your vitality.",
                items: [
                    { label: "Traveling, long walks, trips" },
                    { label: "Engagement in creativity, hobby" },
                    { label: "Healthy habits and activity" },
                    { label: "Communication with interesting and free people" },
                    { label: "Humor and light communication" },
                    { label: "Freedom in expression and action" },
                    { label: "Rest in nature, camping" },
                    { label: "Spiritual practices, meditation" }
                ],
                description: "Here are described actions that can fill your resource zone"
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: FREEDOM, LIGHTNESS, INNOVATION\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to be free without violating the freedom of others. Work through your dependencies and attachments. Develop your creative potential. Be more responsible for your life and actions. Maintain your lightness and optimism. Lead an active way of life. Trust the world but don't forget about prudence. Find your favorite matter and manifest innovation in it."
            },
            {
                id: "guidance",
                label: "Life guidance",
                description: "Your path — this is the path of freedom and lightness. Use your creativity and optimism to help the world see new possibilities. Be a source of freedom and joy. Remember that true freedom starts from within. Don't be afraid to be yourself and follow your heart. Your success depends on your ability to live in a state of flow and trust. Be a free person in everything."
            }
        ]
    }
};

// WEAKNESSES SECTIONS
export const weaknessesData: Record<number, SectorCardDetail> = {
    1: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the first arcana is the Magician, which symbolizes mastery, unique vision and global ideas. Such people possess special self-perception and high value of their work. They love when they are noticed and admired. The archetype of the Magician prefers not to serve someone, but to act independently, fulfill their ideas and projects. These people easily generate new thoughts and quickly implement them in life.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Mastery" },
                    { label: "Adventurism" },
                    { label: "Spontaneity" },
                    { label: "Ideas" },
                    { label: "Creativity" },
                    { label: "Uniqueness" },
                    { label: "Ideology" },
                    { label: "Confidence" },
                    { label: "Decisiveness" },
                    { label: "Initiative" },
                    { label: "Courage" },
                    { label: "Communicativeness" },
                    { label: "Independence" },
                    { label: "Oratory art" }
                ],
                description: "Magician energy. You are a person of IDEAS. They appear quickly and also easily you implement them in life. You are creative, love to create unique things with your own hands. You possess high intelligence, love to study and constantly self-improve. You are very active, decisive and initiative. You possess oratory art and know how to infect those around with your ideology. You are always in center of events, love to communicate and share experience."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Egoism" },
                    { label: "Manipulations" },
                    { label: "Arrogance" },
                    { label: "Aggression" },
                    { label: "Envy" },
                    { label: "Revengefulness" },
                    { label: "Secretiveness" },
                    { label: "Distrust" },
                    { label: "Theft of ideas" },
                    { label: "Understated self-esteem" },
                    { label: "Overstated self-esteem" }
                ],
                description: "Energy in minus can manifest as overstated self-esteem. You can behave aggressively, arrogantly, infringe upon and condemn everyone around. Or understated self-esteem: you constantly doubt your ideas, are afraid to share thoughts, are not confident in yourself. You grab everything from fear of missing opportunity and cannot enjoy interesting business. You may start to manipulate people for selfish goals. You are vindictive and keep grudge for long time. Painfully perceive criticism."
            },
            {
                id: "howToOvercome",
                label: "How to overcome",
                description: "Develop positive thinking, work on your thoughts, track events that happen in your life, make conclusions and trust the Universe. Learn to work in a team, unite and help each other. Learn to forgive and do not keep evil. Develop your creative abilities and creativity. Study secret knowledge: work with the subconscious, esotericism, hypnosis, visualization of desires, meditations, practices, spiritual teachings. Develop intuition and feeling. Do not devalue ideas, even if they seem frivolous. Support and give opportunity to try hand in different directions."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CONFIDENCE, DECISIVENESS, INITIATIVE\n\nThese actions will help to bring your energy to plus.",
                description: "Realize your ideas. If a new thought came, write it down and start implementation immediately. Believe in yourself and your talents. Do not doubt your abilities. Be decisive, initiative and active. Focus on your self-realization. Share your experience and knowledge. Tell your ideas. Learn to work in a team. Learn to forgive. Develop creative abilities. Study secret knowledge, work with subconscious, esotericism."
            }
        ]
    },
    2: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development. This is a female archetype that leaves its mark even if it is in the Matrix of men. For this energy, stature is characteristic, which manifests itself in a special attitude toward oneself. Such people love and understand themselves, walking with their heads held high. They are sensitive, calm, wise and deep. They can sense the thoughts of other people, feel tension or joy 'in the air'.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around. You have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative. Energy of openness and kindness emanates from you, and thanks to well-developed intuition you understand how best to behave in this or that situation."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. Thanks to increased sensitivity you see people through, including their bad qualities, because of which you stop trusting. Sometimes you behave hypocritically, gossip and condemn. You doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view."
            },
            {
                id: "howToOvercome",
                label: "How to overcome",
                description: "Your main task consists in freeing energy and learning to manage it. Explore your feelings, achieve inner calm and wisdom, and also develop the ability to see what is hidden. Strive for spiritual and emotional growth, work through an exclusively material approach. Develop sensitivity, curbing caprices and achieving harmony. Overcome distrust, self-doubt, doubts, passivity. Get rid of life for show, boasting, gossip and empty conversations. Learn to trust your intuition and inner feelings more than logic. Inner peace will become your unshakable strength."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: HARMONY, FLEXIBILITY, CALM\n\nThese actions will help to bring your energy to plus.",
                description: "Develop your intuition. Listen to your inner voice. Study spiritual practices, meditations, yoga. Move, travel, go for walking tours. Engage in sports, spend time in nature. Take care of yourself and your body: visit spa, massage, beauty salons. Try to be in calm and harmony. Do not make hasty conclusions, do not hang labels and patterns on people. Do not participate in intrigues and gossip. Be honest. Openly state your feelings and desires."
            }
        ]
    },
    3: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the third arcana is the Empress (female energy). People with the energy of 'Empress' love beauty, style and comfort. They will strive to surround themselves with good and high-quality things, to achieve a high position in society. The third energy is the energy of fertility, continuation of the family, creation of family and children. She is sexual, sensual and tender, however behind this tenderness lies strength and an inner core. This is a calm, but confident leadership energy directed at housekeeping.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Femininity" },
                    { label: "Housekeeping" },
                    { label: "Calm and softness" },
                    { label: "Order in affairs" },
                    { label: "Sexuality" },
                    { label: "Generosity" },
                    { label: "Taste and sense of style" },
                    { label: "Love for beauty" },
                    { label: "Respect for men" },
                    { label: "Good relations with women" },
                    { label: "Love for plants, animals" },
                    { label: "Organizational abilities" },
                    { label: "Self-love" },
                    { label: "Success in business" },
                    { label: "Natural charm" },
                    { label: "Creativity" }
                ],
                description: "Female energy. Empress. You love beauty, luxury and comfort. Possess excellent taste and a pull toward the beautiful. Treat yourself with respect: surround with beautiful interior objects and create a pleasant atmosphere around. Success in all spheres of life is important for you: family, business and self-realization. You have leadership energy by nature. Can organize people, engage in management and create order. You easily earn money, luck accompanies you. Be a caring keeper of the home hearth, gather relatives together, support traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Pride" },
                    { label: "Arrogance" },
                    { label: "Hyper-control" },
                    { label: "Hyper-responsibility" },
                    { label: "Despotism" },
                    { label: "Tyranny" },
                    { label: "Merchantilism" },
                    { label: "Problems with money" },
                    { label: "Egoism" },
                    { label: "Conflicts with women" },
                    { label: "Caprices" },
                    { label: "Negligence" },
                    { label: "Workaholism" },
                    { label: "Loneliness" }
                ],
                description: "You may lash out at loved ones due to hysteria and emotionality. Don't know how to forgive, condemn others and behave arrogantly. A frequent problem is inability to combine business and family. You may consider yourself better and smarter than others. Can start to intrude into others' affairs and give unasked advice. May pressure men, don't respect their decisions. Try to manage and manipulate. Often choice between professional realization and family leads to loneliness and closedness."
            },
            {
                id: "howToOvercome",
                label: "How to overcome",
                description: "It is important to learn to manage your emotions, strive for a state of calm and balance. One of the key tasks is developing maturity, readiness to make decisions and carry care for loved ones. Avoid too material thinking and striving for profit. Refrain from desire for total control over family members and suppression of their will. Respect individuality of each, develop trust and cooperation. Ability to manage emotions, take responsibility and make decisions will help implement potential to the full extent. Gain ability to firmly make decisions and get rid of excessive soft-bodiedness."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: GENEROSITY, CREATIVITY, FAMILY\n\nThese actions will help to bring your energy to plus.",
                description: "Manage people through wisdom and softness. Develop femininity, accept men and material benefits from them. Support your partner. Devote time to yourself, take care of your body: massage, spa, sport. Engage in creativity. Don't use commanding tone in speech. Fix relations with mom, let go of all childhood grudges. Create your family, raise children. Develop generosity, help others to grow. Delegate work and domestic affairs. Spend time in nature. Combine career, raising children and household."
            }
        ]
    },
    4: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision. People born with this energy love when they are admired and respected, and when their opinion is considered. The Emperor symbolizes stability and steadiness in life, as well as a striving for organization and control. They have strategic thinking, success in planning and forecasting. Good leaders, managers, owners of own business. High work capacity and striving for achieving goals are characteristic.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Strong male energy. You possess a global vision of things and strategic thinking, which allows you to successfully implement large projects and quickly advance. You value and respect yourself and your work. Logic and consistency prevail in your actions, and you prefer order and organization. You are a calm and self-confident person, acting clearly and rationally. Skilled in conducting negotiations. Your priority is to provide for family and relatives materially. You are authority for loved ones."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: TYRANNY, WEAKNESS, CHAOS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Authoritativeness" },
                    { label: "Tyranny" },
                    { label: "Obsession with material" },
                    { label: "Hyper-control" },
                    { label: "Aggression" },
                    { label: "Inaction" },
                    { label: "Whining" },
                    { label: "Irresponsibility" },
                    { label: "Weakness" },
                    { label: "Uncertainty" },
                    { label: "Stubbornness" },
                    { label: "Jealousy" },
                    { label: "Cruelty" }
                ],
                description: "Energy in minus can manifest as tyranny and despotism. You may abuse power, show authoritarian behavior and hyper-control. You can get too obsessed with money, which leads to greed and excessive accumulation. Another option is inaction and weak-character: constant doubts, passivity and laziness. You may set unfulfillable goals and deadlines. In relationships you may suppress partner and order around loved ones. Excessive harshness at work creates tension and financial losses."
            },
            {
                id: "howToOvercome",
                label: "How to overcome",
                description: "To overcome uncertainty and strengthen motivation, it is important to work on self-esteem and confidence in own abilities. Understand sources of doubts and develop strategies for overcoming. Start acting gradually. It is also important to strive to develop femininity, accept your nature, and consciously listen to emotions. Softness and tolerance in communication will help establish harmony. Achieve balance between inner strength and softness. Accept support and help from others without losing independence."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LEADERSHIP, SUCCESS, HOUSEKEEPING\n\nThese actions will help to bring your energy to plus.",
                description: "Establish relations with father and respect his advice. Help people grow professionally. Respect needs and opinion of others. Learn to recognize and fix mistakes. Take responsibility for your life. Get rid of aggression, don't suppress people. Become keeper of the hearth and caring parent. Devote time to yourself, take care of your body. Spend more time in nature and with other women. Engage in sports. Develop creative skills."
            }
        ]
    },
    5: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest. These are people of high intellect, they understand more than others, and are ready to teach and give advice when necessary. In the minus of this energy, a person can be too arrogant and so self-confident in their knowledge, rules and principles, that they become closed to other points of view and to accepting new information.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Strong male energy. You know more than others and therefore justly perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws and call others to this. Your calling card is smiling nature, openness and harmony.\n\nYou are open to different teachings and systems, constantly learn new things and don't get stuck on one and the same thing. You like being in the position of a student, you are diligent and responsible. You can be a good guide, teacher or mentor for others.\n\nYou love to structure everything, are interested in exact sciences and plan your daily routine in advance. All sorts of tables, charts, notes - this is all about you. Spontaneity, disorder and chaos can knock you out of balance.\n\nAnother way of manifesting energy is family orientation. You create harmonious relationships and maintain traditions."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "You may be prone to conflicts, since you are often convinced that you know how to act correctly, and express your thoughts straightforwardly and persistently. You always know how it's better and start to teach others, pointing out mistakes in an aggressive form. You don't tolerate and judge others' choices. Sometimes emotions can overflow you and become the reason for hot-tempered reactions that can damage relationships with loved ones. You may start to control everyone around, stop trusting people, acknowledge only your truth.\n\nYou are limited in your knowledge, fixated on one truth and believe only in it. You change your opinion with difficulty and skeptically listen to alternative arguments. You are not ready for the new, which leads to closedness and secrecy. You refuse to learn and stubbornly hold on to the old. You fear competition, as you often compare yourself with others. Your energy has a brightly manifested imposter syndrome: you are unsure of your own competence, deepen into study of theory and fear to apply knowledge in practice."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "People with the fifth energy in the work-through zone often manifest arrogance and pride, considering their opinion the only correct one and rejecting ideas and suggestions of others. They are sometimes stubborn, don't want to recognize their mistakes and insist on their opinion even in case of obvious wrongness. Such stubbornness and unwillingness to go for compromises can lead to conflicts and breaks in relationships with those around.\n\nAnother manifestation of fifth energy in the work-through zone is rebellion and disagreement with established norms and rules. People possessing this energy may strive for independence and freedom of thought and actions, sometimes even manifesting stubbornness and unwillingness to acknowledge authorities and leadership. Such behavior can cause conflicts in the team and create problems in interaction with other people.\n\nFifth energy can also lead to constant doubts in own abilities. People with this energy can underestimate themselves and their achievements, often thinking that there will always be someone better. They may strive for constant learning and accumulation of knowledge to reach confidence and recognition, but not use them in practice."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThese actions will help to bring your energy to plus.",
                description: "Acknowledge different knowledge and systems. Don't get fixated on one thing. Study new information, expand your horizon. Learn. Think positively. Pass accumulated knowledge to others. Develop oratory skills. One can engage in vocals or oratory art. Create and maintain family traditions. Spend time with family. Don't go for next learning until started using previous knowledge. Listen to your intuition. Reduce control regarding loved ones, relate to others with patience and respect. Inspire and motivate people."
            }
        ]
    },
    6: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the sixth energy is the Lovers. This is a structureless, soft, enveloping energy directed at relationships and manifestation of love for oneself, others, a cause, a process. Most of the minus manifestations are related to the excessive sensitivity of this energy. They can be extremely vulnerable, take criticism hard, and be touchy. In minus, the sixth energy can manifest in the form of uncertainty in self and a constant feeling of judgment from those around.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Energy of love and celebration. For you relationships in any form stand in first place - with self, those around, family, work. You are a very soft and sensitive person. You don't have structure and systematicity. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships, and family - from love.\n\nLove to arrange holidays, give gifts, dress up brightly and gather friends together. You have strong charisma that attracts many to you. You like to communicate with different people, you feel them well and easily find common language.\n\nYou like to take care of yourself and your body: sport, spa, massage, beauty salons. This all fills you with energy and makes you happier. Engage in creativity, don't be shy to demonstrate your talents, create beauty in everything you touch."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CLOSEDNESS, VULNERABILITY, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "Main minuses go due to high sensitivity. You idealize and too quickly fall in love, then for a long time stay in your delusions, which can lead to disappointment. Often fixate on one relationship, surviving departure with difficulty. You may start to chaotically change partners, friends or projects, fearing to remain lonely.\n\nYou may have a habit to complain about life, avoiding responsibility and doubting your decisions. This leads to apathy and lack of direction. If you go too much into idleness, financial problems and debts appear. In minus, you may not love people, lead a closed lifestyle, and evaluate others only by appearance."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "Sixth energy in main work-through implies striving for development of love and soulfulness. Often problems with self-respect arise. Criticism toward oneself, doubts in one's abilities and feeling of unworthiness become daily companions. It is important to learn to accept and love yourself - accept your uniqueness, with all qualities and disadvantages. Care for your physical, emotional and spiritual well-being.\n\nYou may be prone to restraint and closedness, fearing to be vulnerable and open. Emotional detachment can become a barrier in development of mutual understanding. Work on self-acceptance, openness to communication and realistic vision of self and others can help in development of healthy relationships. Stop idealizing people, understanding that they also have weaknesses. Idealization and 'pink glasses' can create unreal expectations."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThese actions will help to bring your energy to plus.",
                description: "Don't strive for ideal — this will lead you to disappointment. Do everything through love for self and world. Focus on positive qualities in people. Develop own taste and style. Manifest love for self and care for your body: shopping, spa, massage, sport. Give self and others gifts. Visit bright events and arrange thematic parties. Gather together with friends, celebrate holidays. Learn to make independent choice, stop depending on opinion of those around. Learn to forgive people and accept them such as they are. In relationships be sincere and open. Help selflessly and from heart. Don't hold on to past."
            }
        ]
    },
    7: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy). Classical Tarot calls this arcana 'The Chariot', symbolizing movement and new opportunities. The owner of the seventh energy needs to be in movement, both in physical plan (sport, travels) and in astral-mental plan (career, self-realization). Negative manifestation includes aggression, destruction, and stagnation.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Male volitional energy. You are a leader and lead people. You set clear goals and quickly reach them. You throw a challenge to yourself and follow the dream. If there is no challenge, the Universe itself will create it for you through difficulties. You love activity, it charges you. You are easy on the rise, charge everyone with optimism. Main thing - don't doubt yourself, continue movement."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "Main minuses are warrior-likeness, aggressiveness and excessive toughness. You suppress people, going to goals through force. You may suffer from workaholism and remain dissatisfied with results. Absence of movement leads to stagnation. If you have no concrete goal, you start to lead meaningless struggle and fuss much. You may fear taking responsibility and role of leader, staying in apathy for a long time."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "People with the seventh energy in the work-through zone often face challenges related to absence of activity and motivation. It may be hard for them to take responsibility, as it requires effort and risk. Avoiding obligations can become preferred choice. Often low self-esteem and lack of confidence lead to passivity. Laziness and apathy can cause stagnation. Lack of openness and avoiding collective work can also be barriers. It is important to actively work on motivation and strengthening self-esteem. Search for sources of inspiration and establishing clear goals."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThese actions will help to bring your energy to plus.",
                description: "Use your potential for peaceful goals. Refuse from meaningless struggle. Make emphasis on your leadership qualities. Manage your emotions and restrain warrior-likeness. Carefully plan and think through strategy. Share achievements with people. Delegate obligations. Engage in spiritual practices like meditation and yoga. Engage in active sport. Lead active and healthy way of life."
            }
        ]
    },
    8: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the eighth energy is Justice and Balance. This energy is dual: it has a light (calm) and a dark (destructive) side. Positive manifestation is harmony, pacification, and logic. Negative manifestation includes aggression, cruelty, and revengefulness. For people with the eighth energy, searching for balance within is crucial.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Energy of justice and calmness. You are a peaceful person, and it's important for you to find balance in all spheres. You help others find balance through meditation or heart-to-heart conversations. You value honesty and law, always searching for truth through acceptance and kindness. You protect the rights of others. You perceive the world through depth and logic, reaching the essence of every detail. You are reliable and always keep your word."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: IMBALANCE, DECEPTION, CRUELTY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Conflictness" },
                    { label: "Categoricalness" },
                    { label: "Aggression" },
                    { label: "Sharpness" },
                    { label: "Pride" },
                    { label: "Hot-temperedness" },
                    { label: "Loss of balance" },
                    { label: "Irresponsibility or hyper-responsibility" },
                    { label: "Self-criticalness" },
                    { label: "Touchiness" },
                    { label: "Manipulations" },
                    { label: "Lie" },
                    { label: "Revengefulness" },
                    { label: "Cruelty" },
                    { label: "Infidelity" }
                ],
                description: "In an aggressive manner, you prove your rightness, leading to frequent quarrels. Pride may prevent you from recognizing mistakes. Without balance, you are thrown from extreme to extreme. You may suppress people, judge actions, and try to control loved ones through manipulation. If situations repeat, it's a sign to search for balance. Dishonesty and deception block your energy. If you engage in business, it must be legal and honest."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "One main difficulty is a proclivity to dishonesty and manipulation to reach goals. Hiding true intentions can cause conflicts as others doubt your sincerity. Eighth energy can also manifest through cruelty and emotional destruction, using insults or threats to subordinate others. When out of balance, you may become hot-tempered, violating structure and order. To reach harmony, learn to realize your actions, develop emotional tolerance, and strive for spiritual growth. Conscious efforts toward balance contribute to healthy relationships."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThese actions will help to bring your energy to plus.",
                description: "Don't judge acts of others. Preserve inner balance through breathing practices, meditation, or yoga. Study deep knowledge and cause-and-effect links. Observe laws, be honest and open. Keep your word, don't deceive. Avoid debts and credits. Search for justice through wisdom and dialogue. Show true feelings. Convey your knowledge to others. Create a family. Learn to see the truth and hidden motives in people and events."
            }
        ]
    },
    9: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the ninth energy is the Sage-Hermit. This is a closed energy that loves solitude and diving into the inner world. People with this energy are endowed with deep wisdom and light. They understand the essence of people and life processes subtly. However, this wisdom can lead to arrogance or excessive reservedness. The task is to shine and convey wisdom to others without becoming a hermit.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Sage. You love to dive into self and your thoughts. You lead a secluded way of life but must avoid closing off from the world. You have rich life experience and know how to give useful advice. You pick words carefully and are tactful. You fill with energy in solitude and silence. You are a responsible person who approaches every question thoroughly."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: PRIDE, CLOSEDNESS, ASCETICISM\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "Seclusion can lead to reservedness and closedness. Excessive asceticism might lead you to refuse material benefits, causing financial problems. Wisdom may provoke arrogance and pride, leading you to judge others and refuse help. You may suffer from impostor syndrome, doubting your ideas and fearing to convey knowledge, which prevents realization of your talents."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The ninth energy in the work-through zone often manifests as impostor syndrome. Despite significant knowledge, you may doubt your competence and feel unworthy of achievements. This uncertainty brakes your ability to manifest wisdom. You might avoid challenges, fearing criticism. To overcome this, gradually come out of your comfort zone, strengthen self-esteem, and boldly use your knowledge for the benefit of others. Don't fear attracting attention; your wisdom is precious for society."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThese actions will help to bring your energy to plus.",
                description: "Search for depth in everything. Study secret philosophical knowledge to help others. Open your heart and share accumulated experience. Work with emotions and learn to speak openly. Trust people. Don't fear solitude; enjoy seclusion. Draw strength from nature and solitude. Be loyal to yourself and your intuition. Lead a diary of your insights. Communicate only with pleasant people. Look at past experience as lessons."
            }
        ]
    },
    10: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the tenth energy is the Wheel of Fortune. This is the only energy in the matrix that symbolizes luck. It represents a startupper, player, and inspirer. For the tenth energy, lightness and joy are crucial. When manifested in plus, luck accompanies the person in all undertakings. In minus, it leads to heaviness, passivity, and failure.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "Energy of luck and inspiration. You act from the flow, and movement is vital for you. You generate new ideas and can be a leader without striving for it. You don't bother with routine; any idea can inspire you, attracting success and the right people unexpectedly. You know how to relax and let go of situations, remaining cheerful and open even in difficulties."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "Main minuses come from absence of movement and initiative. You lose inspiration and luck, potentially developing harmful habits or financial problems. You may become apathetic, pessimistic, and complain about life. Fears prevent you from starting new things. Even if lazy, any movement is better than stagnation to activate your energy."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The tenth energy in the work-through zone is marked by fears of mistakes and failure, preventing easy action. Perfectionism and constant analysis can make decision-making slow and fatiguing. You may struggle to relax and enjoy life, preferring familiar paths to avoid risk. This Preparation and analysis can slow your life's movement. It's important to learn to trust your intuition and the world. When you flow with the universe, things turn out in your favor; when you feel heavy or fearful, progress stalls. Act from a state of lightness and acceptance."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThese actions will help to bring your energy to plus.",
                description: "Avoid stagnation and motivate yourself to move. Travel spontaneously. Engage in creativity and interesting projects. Communicate and make new acquaintances. Refuse 'easy money' offers that seem dishonest. Concentrate on main goals. Let go of hypercontrol and live in the 'now'. Care for your family's well-being. Relax regularly through spa, massage, or yoga. Watch inspiring content. Work on self-discipline and record plans in a diary. Fulfill work easily but responsibly. Listen to your intuition and desires."
            }
        ]
    },
    11: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the eleventh energy is Strength (masculine energy). At plus manifestation, a person is endowed with physical and/or internal strength and a strong internal core. This is leadership energy, open and sincere. Most minuses associated with this energy manifest as an excessive manifestation of strength or, on the contrary, an unwillingness to manifest it—a weakness of spirit.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                    { label: "Skill to lead" },
                    { label: "Charisma" },
                    { label: "Sincerity" },
                    { label: "Integrity" },
                    { label: "Desire to create new" }
                ],
                description: "Masculine volitional energy. You have a strong character and internal core. Love for work and huge life energy motivate you. You are practical and build processes effectively. You have the ability to see and reveal potential in people and projects. You love to be in first place and feel like a winner. You are a charismatic, bright personality with good physical strength. You can inspire others to improve their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "Due to workaholism, you overstrain and rest little. You may press on people or, conversely, lack willpower and be lazy. You may fear conflicts but still quarrel without reason. You might not accept your body or sexuality and could have tense relationships with your mother. Rudeness and imperiousness are signs of minus energy."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "Eleventh energy in the work-through zone speaks about possible problems with strength and the physical body. You may experience weakness or powerlessness. Low self-esteem can lead to laziness and avoiding responsibility. It's important to reveal your body's potential and work over your health. You may unconsciously deny your potential or underestimate yourself. Work over awareness, self-control, and motivation to overcome these challenges and move forward with confidence."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThese actions will help to bring your energy to plus.",
                description: "Manage your strength and use it for good. Engage in sports and a healthy lifestyle. Communicate with successful people for inspiration. Manage your emotions and avoid imperative tones. Be calm and patient; don't judge others' pace. Become a leader in your sphere. Learn to yield and compromise. Interact with people without suppressing them. Spend time in nature and practice relaxation like meditation or yoga. Delegate tasks to avoid overstrain."
            }
        ]
    },
    12: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the twelfth energy is 'Different Vision' or 'Suspendedness'. A person with this energy sees the world differently, as if upside down. This leads to innovation, creativity, and the creation of something unique. They are innovators and creative souls whose heart is open to serving others. However, in minus, they can slide into victimhood, neglecting their own needs for the sake of others' approval.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You look at the world differently, interpreting signs and symbols unique to you. You are an idea-person, working in a flow of improvisation and inventiveness. Your heart is open and kind, always ready to help. You make people's lives better, serving selflessly and accepting others as they are. You act from a sincere impulse of the soul rather than cold logic."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VICTIMHOOD, DOUBTS, NEGATIVITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In the role of a victim, you feel you give everything but get nothing back. You are vulnerable and touchy, which can lead to self-destruction like depression or dependencies. You try to be good for everyone, unable to say 'no'. Dependency on others' approval can turn into self-hatred if praise isn't received. Creative crises and doubts may prevent you from realizing your unique vision."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The twelfth energy in the work-through zone points to a lack of confidence in your unusual vision. Fear of failure and a strong need to be needed can push you into victimhood. It's vital to learn to set healthy boundaries and say 'no' without guilt. You may painfully react to criticism, holding onto grudges for a long time. Work over self-confidence and learn to establish boundaries. Your non-standard thinking is a strength—realize your potential despite doubts."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to look at habitual things in a new way. Develop your creativity and non-standard problem-solving. Say 'no' in time and don't take on others' work. Build clear personal boundaries. Don't devalue your labor; set a fair price. Raise your self-esteem and live for yourself, not just for others' sake. Exit the state of victimhood. Do kind deeds without expecting approval. Support social projects or volunteer, but only from a state of abundance."
            }
        ]
    },
    13: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the thirteenth energy is Rebirth and Transformation. It is structureless and represents renewal. It symbolizes getting rid of the old and the birth of the new. People with this energy are 'daring heroes' who discarded obsolete patterns to make space for innovation. However, in minus, they may fear changes, get stuck in the past, or become recklessly aggressive.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You are an unusual person surrounded by mystery. You are capable of transforming thinking and processes, inspiring others to embrace the new. You know how to refuse the obsolete and don't like predictability. Confident in extreme situations, you act without panic. You are curious, creative, and easily get involved in everything new and unusual."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "If in minus, you fear changes and get stuck, clutching at the past. You might accumulate junk and avoid realizing your talents. Doubts and unnecessary fussiness appear. Alternatively, you may be overly harsh or aggressive, forcing changes where they aren't ready. You might take on too many matters at once and finish none, or take stupid risks."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "Thirteenth energy in the work-through zone speaks about a deep fear of the unknown. You may avoid changes even when dissatisfied, fearing loss of control. To overcome this, realize that changes provide growth opportunities. Take small steps to expand your horizons. You may react to stress with excessive anxiety or manifest emotional coldness in relationships. Learn to manage stress through relaxation and activity. You have the potential to be a leader in positive changes if you use your transformational power for good."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThese actions will help to bring your energy to plus.",
                description: "Set order in matters and relationships. Fix your plans and dreams in writing. Engage in creativity. Get rid of anything that doesn't lead to results. Don't take on too many matters; concentrate on one and finish it. Learn to be calm and peaceful. Live in the 'here and now'. Stop worrying excessively about relatives. Experiment in all spheres of life. Work over positive thinking and bravely start new stages."
            }
        ]
    },
    14: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the fourteenth energy is the Artist and Creator. This is a refined, soft, and creative energy connected to the spiritual flow. For creators, inspiration and self-manifestation are more important than societal assessment. They are intellectuals and connoisseurs of beauty. However, in minus, they can become vulnerable, capricious, or slide into rigidity and callousness.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You are a refined nature with strong spiritual and healing energy. You live and create in flow, inspiring others. You possess internal peace and harmony, understanding your own desires. You are a soulful person, an intellectual who studies the new and shares knowledge. Honesty and nobility guide your interactions, as you value decency above all."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: CALLOUSNESS, IMMODERATION, VULNERABILITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you become excessively vulnerable and capricious, thrown from one extreme to another. You may react to criticism with offense or manifest harshness and rudeness. There is a risk of developing dependencies or harmful addictions. You might clutch at the past or become overly attached to material values, losing your creative flow and sense of measure."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The fourteenth energy in the work-through zone emphasizes the need for internal harmony and contact with your soul. Without this, you may become impulsive or callous, damaging relationships through lack of tact. Capriciousness can lead to constant dissatisfaction regardless of others' efforts. It's vital to develop emotional self-regulation and establish clear boundaries. You have unique spiritual potential; use it to inspire yourself and others for growth rather than withdrawing into emotional armor."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThese actions will help to bring your energy to plus.",
                description: "Express your emotions openly—don't suppress them. Fight bad habits and lead a healthy lifestyle. Manifest honesty in all dealings. Learn moderation and patience. Meditate and engage in spiritual practices. Draw inspiration from art: music, literature, and painting. Visit new places and spend time in nature. Listen to your internal voice and take decisions based on intuition. Combine your creativity with your income for true satisfaction."
            }
        ]
    },
    15: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the fifteenth energy is the Devil and Tempter. This is a powerful energy of sexuality, attractiveness, and charisma that can 'strike with current'. These individuals are 'X-ray people' who see the weaknesses and vices of others through and through. In plus, they are energetic leaders who value luxury and have the gift of clairvoyance. In minus, they can become manipulative, greedy, or succumb to various temptations and dependencies.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energetic" },
                    { label: "Positive" },
                    { label: "Love for pleasures" },
                    { label: "Love for material values" },
                    { label: "Good intuition" },
                    { label: "Clairvoyance" },
                    { label: "Wisdom" },
                    { label: "Understanding essence" },
                    { label: "Luck" },
                    { label: "Fascination" },
                    { label: "Attractiveness" },
                    { label: "Style" },
                    { label: "Oratorical abilities" },
                    { label: "Openness to adventures" },
                    { label: "Compassion" },
                    { label: "Kindness" },
                    { label: "Ability to help" },
                    { label: "Sexuality" }
                ],
                description: "You have a strong energy of temptation and act as an 'X-ray person', seeing defects and knowing how to fix them. You help others become better by highlighting their painful points. You love luxury, comfort, and money but maintain a balance with the spiritual. Your deep knowledge and intuition make you a wise advisor. You are charming, stylish, and charismatic, drawing people to you with ease."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                    { label: "Suppression" },
                    { label: "Rigidity" },
                    { label: "Deception" },
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
                description: "In minus, you may fall into dependencies or use your charm to manipulate and wound others for selfish goals. You might be arrogant, power-hungry, and critical of others' opinions. Selfishness and pride can make you disregard others. A fixation on money can block your talents, leading to greed and potentially even betraying those close to you for the sake of your own desires."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The fifteenth energy in the work-through zone often manifests as rigidity, criticality, and a desire for control through manipulation. You have an analytical mind that sees weaknesses, but you must learn to use this vision to help others grow rather than just pointing out defects. You may devalue non-material aspects of life in favor of wealth. The challenge is to redirect your strong qualities into a peaceful, ethical channel, finding a balance between your determination and moral values."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThese actions will help to bring your energy to plus.",
                description: "Learn to see the world through the prism of good. Work over internal aggression and remove cynicism and sarcasm. Accept and forgive others, learning to be flexible. Open your heart for love and help the needy. Don't manipulate people; instead, engage in spiritual practices like meditation. Activate your sexual energy and engage in creativity. Take care of your body and pamper yourself. Free yourself from bad habits and handle money with ease and gratitude."
            }
        ]
    },
    16: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the sixteenth energy is the Revolutionary. This energy symbolizes the destruction of the old to create the new. These individuals are ideological leaders who draw inspiration from a spiritual flow. In plus, they are bold innovators and spiritual mentors. In minus, they can become destructive, overly rigid, or fear changes, getting stuck in outdated beliefs and material attachments.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You live in the 'here and now', possessing powerful strength and energy to inspire others. You are an ideological leader who destroys the insincere to build the new. You don't get fixated on material values, focusing instead on ambitious ideas and spiritual growth. With non-standard thinking and a rich imagination, you boldly experiment and adapt to any conditions to achieve your goals."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LACK OF SPIRITUALITY, DESTRUCTION, RIGIDITY\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may manifest excessive rigidity, cutting from the shoulder and bearing destruction instead of creation. You might focus solely on material values, leading to dependencies or fraud. Alternatively, you could become indecisive and sluggish, fearing changes and clutching to the old. If you refuse to develop, life may force changes through sharp and unpredictable losses."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The sixteenth energy in the work-through zone often manifests as a state of 'de-energizedness', where you feel disconnected and lack motivation. You may avoid deep reflection or turn to deception to cope with internal emptiness. It's vital to find your internal source of inspiration and meaning. Strive for flexibility in relationships and avoid the desire to destroy everything around. Accept changes as opportunities for growth, and work over your internal strength and ethical values to lead others toward spiritual enlightenment."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThese actions will help to bring your energy to plus.",
                description: "Act decisively and boldly—don't doubt yourself. Work over yourself to become better every day. Cleanse your space and do regular decluttering. Travel and study new cultures for inspiration. Practice various austerities and meditate. Strengthen your physical health through sports and body care. Calmly accept any changes in life with gratitude. Share your knowledge with others and be open to the new, letting go of the past without regret."
            }
        ]
    },
    17: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the seventeenth energy is the Star Person. This is a soft, creative energy that follows its own 'star' or dream. These individuals are ambitious and strive for recognition, often possessing powerful charisma and multiple talents. In plus, they are bright, intuitive, and inspire others. In minus, they can suffer from 'star sickness', vanity, and pride, or conversely, stay in the shade due to a lack of confidence and unrealized potential.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" },
                    { label: "Desire for attention" },
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
                description: "You are a bright personality with powerful charisma and a multitude of talents. You stand out from the crowd and thrive in the center of attention, motivated by large-scale goals and public recognition. Your creative thinking and unique imagination allow you to create art that pleases many. You are kind, open, and intuitive, often drawn to spiritual practices and secret knowledge."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may stay in the shade, doubting your talents and fearing the unknown, which leads to a creative crisis. Alternatively, you might succumb to pride and vanity, behaving selfishly and manipulating others. You could get fixated on material success while neglecting the spiritual, or go away from reality through illusions and dependencies. A lack of self-acceptance regarding your appearance may also manifest."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The seventeenth energy in the work-through zone often manifests as a lack of confidence and staying unrealized. You may hide your talents, thinking they have no value, and constantly compare yourself to others. Fear of failure, often from past experiences, might make you avoid new challenges. It's vital to believe in yourself and exit the shade. Your internal sensitivity is a source of inspiration; learn to direct it constructively. Avoid over-fixating on material wealth and instead focus on spiritual and emotional growth to achieve a balanced, satisfying life."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThese actions will help to bring your energy to plus.",
                description: "Reveal your creative potential and show your talents to the world. Follow the impulses of your heart and develop your intuition. Share your ideas with close people for support. Find a favorite matter that inspires you and allow yourself to be successful and even famous. Communicate with like-minded people and be open to new experiments. Refuse from pride and vanity, instead gifting love and becoming an example for others. Monetize your talents and approach every task with creativity and feeling."
            }
        ]
    },
    18: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the eighteenth energy is Magic and the Moon. It is a structureless, esoteric energy associated with the subconscious, intuition, and mystery. These individuals are often 'flown away' from the real world, deeply reflective and imaginative. In plus, they materialize their desires through positive thinking and creativity. In minus, they can succumb to fears, illusions, and social isolation.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You possess strong intuition and the unique ability to attract what you desire through your thoughts. You are a mysterious and attractive person, often fond of esoteric and spiritual practices. Your imagination allows you to create your own 'magic' in work and creativity, following your own path regardless of others' opinions. You are soft, kind, and adapt easily, often being the one people turn to for deep advice."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may withdraw from reality into addictions or deep depression, refusing to contact the real world. Fears and doubts can paralyze you, leading to inaction and a persistent victim state where you complain without taking responsibility. Because your thoughts are so powerful, focusing on the negative or harboring resentment can accidentally attract the very misfortunes you fear."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The eighteenth energy in the work-through zone carries a high potential for sensitivity, but it is often blocked by intense anxiety and imaginary fears. You may isolate yourself in an attempt to find protection, avoiding social contact and decisions. Negative scenarios can become self-fulfilling if you dwell on them. It's vital to engage in self-knowledge and conscious thinking. Spiritual practices and meditation can help you manage stress and redirect your energy from fear toward wisdom and acceptance, opening wide horizons for personal growth."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThese actions will help to bring your energy to plus.",
                description: "When feeling anxiety, let the worries pass through you to understand their root cause. Work through your fears by living them and letting them go. Focus on specific actions that lead to results. Develop your intuition and maintain a gratitude diary to fixate on the positive. Spend time near water to find internal harmony. Visualize success and use your non-standard, creative approach in every matter. Communicate with creative people and don't close yourself off from the world."
            }
        ]
    },
    19: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the nineteenth energy is the Sun. This is a leadership and creative energy endowed with warmth and global potential. These individuals possess immense internal strength and inspire others through their optimism and devotion to their cause. In plus, they shine brightly and bring warmth. In minus, they can 'burn' others with aggression and arrogance, or 'fade' into apathy and lack of energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You are a natural leader and a team player who carries warmth, light, and goodness to others. With big ambitions and global goals, you inspire those around you through your charming presence and positive thinking. You are an ideological person who burns with passion for your projects, especially those aimed at helping people or nature. You are a 'battery' person, capable of passing powerful streams of energy to achieve grand achievements."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Demandingness" },
                    { label: "Vanity" },
                    { label: "Hypercontrol" },
                    { label: "Egoism" },
                    { label: "Hot temper" },
                    { label: "Aggressiveness" },
                    { label: "Fixation on material" },
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
                description: "In minus, you may manifest rigidity and excessive demandingness, pressuring others aggressively. You might become a 'burning sun', reaching fanaticism or behaving despotically. Alternatively, you could 'fade' into apathy and self-doubt, fearing to take responsibility for large-scale projects. Fixation on money and financial success can lead you to forget your higher goals, while an inflated ego makes you focus only on your own desires."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The nineteenth energy in the work-through zone often involves overcoming the 'faded sun' state—a temporary loss of motivation and internal light. You may avoid risky or large projects due to anxiety and fear of failure. To shine again, you must dive into a cause that truly ignites you. Break large tasks into smaller stages to build confidence. It's vital to distribute your energy across different life aspects to avoid burnout. Learn to manage your 'internal fire' so that anger or greed doesn't take control, and work on your self-esteem to realize your broad potential."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThese actions will help to bring your energy to plus.",
                description: "Set an example for others through positive thinking and benevolence. Engage in charity and support your loved ones. Regularly rest and care for yourself through spa or meditation. Wake up early to harness your peak energy times. Be grateful for what you have and lead an active lifestyle. Develop your oratory talents and think globally. Work through childhood traumas to heal your internal child and learn to rejoice in simple things. Distribute your energy wisely and don't judge others' choices."
            }
        ]
    },
    20: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the twentieth energy is Connection and Judgment. This is a complex energy associated with combining spiritual and physical aspects, as well as uniting people. These individuals are 'integrators' who can create whole products from diverse components. They have a deep connection with their ancestry and intuition. In plus, they are stable, authoritative, and systemic. In minus, they lack integrity, becoming fragmented, judgmental, or overly rigid.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You have a unique talent for uniting people and ideas to create integral systems and products. You find balance between the material and spiritual, often receiving insights through your powerful intuition and clairvoyance. You are a wise advisor, drawn to sacred knowledge and psychology. Your connection with your family and ancestry is a source of strength, and you easily adapt to new conditions, remaining stable even in stressful situations."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: LOSTNESS, PRIDE, MERCANTILISM\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may feel fragmented and lost, unable to find a soul-appealing direction. Fear of change and criticism can lead to a weak character or harmful dependencies. You might become rigid and authoritarian, demanding too much from others while hiding your own vulnerabilities. Problems with relatives—quarrels, conflicts, or misunderstandings—can disconnect you from your internal support system, leading to anger and categorical judgments."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The twentieth energy in the work-through zone challenges you to find internal unity and harmony within a 'fragmented' self. You must develop your intuitive skills to understand your world and restore your integrity. Conflicts or resentments within your family can be deep sources of pain; it's vital to heal these ancestral programs and let go of fears associated with past generations. Your heightened sensitivity means you experience life deeply; learning to manage these strong emotional reactions through self-work and professional support will help you achieve the stability you need."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThese actions will help to bring your energy to plus.",
                description: "Practice deep forgiveness and acceptance, especially regarding your parents. Study your ancestry and genealogy to strengthen your family ties and traditions. Engage in spiritual practices like yoga or meditation to develop your intuition and clairvoyance. Transmit your wisdom to others and help them find their own integrity. Maintain a healthy lifestyle and set clear goals. Communicate openly with relatives and use your unique knowledge to break negative family scenarios, becoming a peacemaker."
            }
        ]
    },
    21: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the twenty-first energy is the Diplomat and Peacemaker (female energy). This is a Person of the World who unites everyone around through diplomacy, love, and expansion. They are harmonious and ready for the new, with a strong ability to adapt and a love for scale. In plus, they are global thinkers and healers. In minus, they can become militant, categorical, and destructive, or succumb to a fear of scale and limitation.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You are a cheerful, kind, and open person who acts as a peacemaker, smoothing over conflicts and finding compromises. You think globally and are inspired by large-scale projects that go beyond usual frames. Your flexible thinking allows you to adapt easily to new cultures and conditions, often through travel and studying foreign languages. You possess strong healing energy, intuition, and the ability to inspire a team toward a common, world-significant goal."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MILITANCE, LIMITATION, DESTRUCTION\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may behave aggressively and judgmentally, becoming a 'militant' who creates conflicts instead of resolving them. A desire to dominate or a categorical attitude can block your ability to form trusting relationships. Alternatively, you may suffer from a fear of the new and global, staying in a state of self-doubt and unconfidence. This can lead to being aloof and closed-off, refusing to travel or master new skills, and potentially carrying destruction instead of creation."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The twenty-first energy in the work-through zone emphasizes the need for scale and expansion while overcoming the fear of leaving your comfort zone. You may find it difficult to abandon habitual routines, which can lead to anxiety. It's vital to develop flexibility and open yourself to new possibilities. You might also have a tendency to defend your point of view too stubbornly; learning effective communication and the art of compromise will help you avoid tense relationships. Overcoming internal closedness through social interaction and new experiences is key to your personal and professional growth."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThese actions will help to bring your energy to plus.",
                description: "Think globally and go beyond usual frames, setting ambitious goals. Learn foreign languages and study other cultures to expand your horizon. Practice diplomacy and always strive for peaceful solutions and compromises. Be grateful for everything you have and maintain a healthy, eco-friendly lifestyle. Share your ideas openly, perhaps through a blog, and don't be afraid of modern technologies. Travel more to enrich your experience and work through your fears by living them and letting them go. Use your healing potential to help others expand their own consciousness."
            }
        ]
    },
    22: {
        title: "My weaknesses",
        intro: "Main learning curve. The energy through which life learning and problems occur in a person's life, as if stumbling through life over this energy. From birth, this energy is manifested in a negative way.",
        archetype: "The archetype of the twenty-second energy is the Fool. This is the energy of lightness, flow, and absolute freedom. These individuals follow their own rules and do not limit themselves with social norms or traditions. They are independent, adventurous, and possess a zero-boundary mindset. In plus, they are creative innovators and open-hearted travelers. In minus, they can be irresponsible, unreliable, or succumb to heaviness and tension, feeling internally unfree.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nEnergy on the plus side – are all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
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
                description: "You live in a state of full freedom and flow, unburdened by prohibitions or rigid schedules. You possess a limitless perception of life and a creative mind that brings innovation to any project. Active and easy on the rise, you adapt quickly to new conditions and love to travel, meeting interesting people along the way. Your optimism and non-standard thinking allow you to transform the consciousness of others, showing them a path beyond usual frames."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in the negative – are all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
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
                description: "In minus, you may manifest a lack of seriousness and extreme irresponsibility, breaking promises and missing deadlines. You might slide into a dissolute way of life, dependencies, or problems with debts. Alternatively, you could become overly tense and serious, losing your natural lightness and worrying constantly. A sense of internal non-freedom can lead to apathy, as you get fixated on material values while forgetting the inspiration and ideas that truly drive you."
            },
            {
                id: "howToOvercome",
                label: "How to overcome?",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThe point of main working out in the personality matrix is usually called the “karmic tail” and is explained as unresolved karma from past lives that needs to be resolved in this life. This is the main energy in a person’s life that is used to work through the main problems, it’s as if we stumble over it in life, that’s why it is at the bottom.",
                description: "The twenty-second energy in the work-through zone requires you to find freedom and lightness while managing the weight of material cares. You may feel limited by circumstances or past burdens; it's vital to develop trust in the world and take responsibility for your actions. Overcoming irresponsibility through better planning and self-discipline is crucial. You must review and replace limiting convictions with positive ones, learning to laugh at yourself and the absurdities of life. Your mind is capable of finding unusual, time-ahead solutions once you free it from narrow frames."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThese actions will help to bring your energy to plus.",
                description: "Trust the Universe and accept life with lightness and optimism, even when starting from a clean slate. Travel more and spend time in nature to recharge your energy. Engage in creativity and public performance to express your unique vision. Avoid toxic people and lead a healthy lifestyle, free from dependencies. Don't load yourself with heavy tasks; instead, choose flexible work formats like freelance. Be kind and independent, and learn to let go of unnecessary material attachments and grudges without regret."
            }
        ]
    },
};

// MY LIFE PURPOSE SECTION
export const lifePurposeData: Record<number, SectorCardDetail> = {
    1: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the first energy is the Magician. This energy makes a person focused, capable of immersing themselves in work and creative processes. Such people can be closed, slightly detached from the world, being inside themselves for a long time. Secret knowledge, esotericism attract people with the first energy.",
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
                description: "You are a master and creator. You easily transfer an idea to matter and create reality by the power of your thought. You have a high speed of generating and implementing ideas. Great creative potential develops your creativity, and endless energy helps to implement plans. You are an optimist for life and ready to go for risk if necessary. Often possess extrasensory abilities: you thinly feel people and understand them on an intuitive level."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: DARK MAGIC, EGOISM, MANIPULATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Overstated/understated self-esteem" }, { label: "Inflated ego" }, { label: "Closedness" },
                    { label: "Suppression of others" }, { label: "Powerfulness" }, { label: "Conflictness" }, { label: "Aggression" },
                    { label: "Uncertainty" }, { label: "Pride" }, { label: "Indecisiveness" }, { label: "Intolerance" },
                    { label: "Self-interest" }, { label: "Manipulations" }, { label: "Secretiveness" }, { label: "Impatience" },
                    { label: "Loneliness" }, { label: "Vindictiveness" }, { label: "Envy" }
                ],
                description: "Energy in minus can manifest as overstated or understated self-esteem. You can behave aggressively, arrogantly, infringe upon and condemn everyone around. You constantly doubt your ideas, are afraid to share thoughts with others, are not confident in yourself. You want to try everything at once and do not bring anything to the finish. You are vindictive and keep a grudge for a long time. Painfully perceive any criticism of your ideas."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe first energy symbolizes mastery, adventurism and the generation of ideas.",
                description: "For you it is important to believe in yourself and your forces. Go your own way, not comparing yourself with other people. Express yourself in everything, even in small things. Develop positive thinking, work on your thoughts, track events in your life, make conclusions and trust the Universe. Engage in creativity, develop creative vision. Be sure to embody your ideas in life. Learn, get new knowledge, check everything in practice. Search for new approaches, experiment. Develop feeling, listen to your intuition. Engage in sports, devote time to your body."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: MASTERY, ADVENTURISM, IDEAS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe first energy symbolizes mastery, adventurism and the generation of ideas.",
                description: "Realize your ideas. If a new thought came, write it down and start implementation immediately. Believe in yourself and your talents. Do not doubt your abilities. Be decisive, initiative and active. Focus on your self-realization. Share your experience and knowledge. Tell your ideas. Learn to work in a team. Learn to forgive. Develop creative abilities. Study secret knowledge, work with subconscious, esotericism."
            }
        ]
    },
    2: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the second arcana is the High Priestess, embodying true, soft power, secret knowledge, wisdom and spiritual development. This is a female archetype that leaves its mark even if it is in the Matrix of men. For this energy, stature is characteristic, which manifests itself in a special attitude toward oneself.",
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
                description: "Female esoteric energy. High Priestess. You possess increased sensitivity: you feel people, read any tension, which helps you easily harmonize the space and those around. You have a gift for uniting people of different beliefs, religions, nationalities and ages. You are diplomatic, attentive to details and communicative."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ANGER, HYPOCRISY, CAPRICES\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Distrust" }, { label: "Uncertainty" }, { label: "Doubts" }, { label: "Inconstancy" },
                    { label: "Caprices" }, { label: "Conflictness" }, { label: "Malice" }, { label: "Confusion" },
                    { label: "Secretiveness" }, { label: "Tearfulness" }, { label: "Hypocrisy" }, { label: "Jealousy" },
                    { label: "Gossip" }, { label: "Manipulations" }, { label: "Coldness" }, { label: "Untidiness" }, { label: "Dependency" }
                ],
                description: "You may have hysteria in your character. When something does not go according to plan, you begin to whine, be capricious and complain about life. You conflict with others instead of solving the problem. You doubt yourself and cannot make a choice. Inconstancy and indecisiveness make you often change your point of view."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe second energy symbolizes natural human energy and harmony.",
                description: "Your main task consists in freeing this energy and learning to manage it. Explore your feelings, achieve inner calm and wisdom, develop the ability to see what is hidden. Strive for spiritual and emotional growth. Develop sensitivity, curb caprices and achieve harmony. Overcome distrust, self-doubt, doubts, passivity. Learn to trust your intuition and inner feelings more than logic. Inner peace will become your unshakable strength."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: COMPASSION, UNITY, HARMONY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe second energy symbolizes natural human energy and harmony.",
                description: "Develop your intuition. Listen to your inner voice. Study spiritual practices, meditations, yoga. Move, travel, go for walking tours. Engage in sports, spend time in nature. Take care of yourself and your body. Try to be in calm and harmony. Do not participate in intrigues and gossip. Be honest. Openly state your feelings and desires."
            }
        ]
    },
    3: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the third arcana is the Empress (female energy). People with the energy of Empress love beauty, style and comfort. They strive to surround themselves with good and high-quality things, to achieve a high position in society. The third energy is the energy of fertility, continuation of the family, creation of family and children.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Leadership" }, { label: "Organizational abilities" }, { label: "Self-love" }, { label: "Care for others" },
                    { label: "Responsibility" }, { label: "Success in business" }, { label: "Generosity" }, { label: "Order in affairs" },
                    { label: "Love for comfort" }, { label: "Material prosperity" }, { label: "Taste and sense of style" }, { label: "Authority" },
                    { label: "Natural charm" }, { label: "Attractiveness" }, { label: "Creativity" }, { label: "Kindness" }
                ],
                description: "Soft energy. You love luxury and comfort. Possess excellent taste and a pull toward the beautiful. Success in all spheres of life is important for you: family, business and self-realization. You have leadership energy by nature. You easily earn money, luck accompanies you. You get along well with children and value family."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: ARROGANCE, UNTIDINESS, STINGINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Pride" }, { label: "Arrogance" }, { label: "Hysteria" }, { label: "Emotionality" },
                    { label: "Soft-bodiedness" }, { label: "Indecisiveness" }, { label: "Irresponsibility" }, { label: "Lack of money and career" },
                    { label: "No relationships" }, { label: "Rejection of women" }, { label: "Loneliness" }, { label: "Stinginess" },
                    { label: "Closedness" }, { label: "Untidiness" }, { label: "Infantilism" }
                ],
                description: "You lash out at loved ones due to your emotionality. Don't know how to forgive, often condemn others and behave arrogantly. A frequent problem is the inability to combine business and family. In relationships behave merchantile and show cold calculation, which leads to discord and frequent quarrels."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe third energy symbolizes awareness and recognition of female energy.",
                description: "For women it is important to accept and understand deep female essence: be a faithful spouse, a wonderful mother, a caring housekeeper or an entrepreneur. For men it is necessary to transform this energy into more masculine. Creation of a strong and harmonious family is important. Take responsibility for family and children. Develop maturity, readiness to make decisions and carry care for loved ones. Avoid too material thinking and striving for profit. Be generous and open."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, FERTILITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe third energy symbolizes awareness and recognition of female energy.",
                description: "For women: Manage people through wisdom and softness. Develop femininity. Support your partner. Devote time to yourself, take care of your body. Engage in creativity. Fix relations with mom. Create your family, raise children. Develop generosity. For men: Develop male qualities, take responsibility. Provide for family, become head and support. Be generous. Don't conflict with women. Learn respect and trust."
            }
        ]
    },
    4: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the fourth arcana is the Emperor (male energy). It is distinguished by stateliness, calm and global vision. People born with this energy love when they are admired and respected, and when their opinion is considered. The Emperor symbolizes stability and steadiness in life, as well as a striving for organization and control.",
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
                description: "Strong male energy. You possess a global vision of things and strategic thinking. You value and respect yourself and your work. High work capacity and energy help you realize ambitious goals. People around can rely on you. You are a calm and self-confident person. You are a strong leader and a charismatic person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: TYRANNY, WEAKNESS, CHAOS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Authoritativeness" }, { label: "Tyranny" }, { label: "Obsession with material" }, { label: "Hyper-control" },
                    { label: "Aggression" }, { label: "Inaction" }, { label: "Whining" }, { label: "Irresponsibility" },
                    { label: "Weakness" }, { label: "Uncertainty" }, { label: "Stubbornness" }, { label: "Jealousy" }, { label: "Cruelty" }
                ],
                description: "Energy in minus can manifest as tyranny and despotism. You abuse power and show authoritarian behavior. You can get too obsessed with money, which leads to greed. Another option is inaction and weak-character: constant doubts, passivity and laziness. In relationships you may suppress partner and order around loved ones."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fourth energy symbolizes power, confidence, authority and order.",
                description: "One of the key tasks is acceptance of responsibility for your life. Develop financial independence. Overcome uncertainty, fear of mistakes and new challenges. Practice delegation and trust. Avoid despotic attitude toward people. Believe in your strength. Release excessive control over your life. Develop spiritually. Learn to forgive, accept, thank, yield and achieve goals without tension. Pay attention to your physical body."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: AUTHORITY, HOUSEKEEPING, MULTIPLICATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fourth energy symbolizes power, confidence, authority and order.",
                description: "For men: Establish relations with father. Help people grow professionally. Respect needs of other people. Take responsibility for your life. Get rid of aggression. Become defender and reliable support for family. For women: Establish relations with father. Take responsibility for your life. Become keeper of the hearth and caring mom. Be a support for your man. Engage in sports. Develop creative skills. Devote time to yourself."
            }
        ]
    },
    5: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the fifth arcana is the Hierophant, Priest (male energy). This archetype imposes a certain perception of oneself, when a person feels higher than the rest. These are people of high intellect, they understand more than others, and are ready to teach and give advice when necessary.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Love for learning" }, { label: "Oratory skills" }, { label: "Management skills" }, { label: "Conservatism" },
                    { label: "Desire to teach" }, { label: "Help to loved ones" }, { label: "Family orientation" }, { label: "Love for traditions" },
                    { label: "Professionalism" }, { label: "Correctness" }, { label: "Systematic nature" }, { label: "Pedantry" },
                    { label: "Accuracy" }, { label: "Logicality" }, { label: "Order in affairs" }, { label: "Responsibility" }, { label: "Reliability" }, { label: "Kindness" }
                ],
                description: "Strong male energy. You know more than others and perceive yourself as higher than those around. You have deep fundamental knowledge and logical thinking. You love order and traditions, follow laws. You are open to different teachings and constantly learn new things. You can be a good guide, teacher or mentor for others."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: REBELLION, DISORDER, INTOLERANCE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Intolerance" }, { label: "Conflict nature" }, { label: "Emotionality" }, { label: "Egoism" },
                    { label: "Hyper-control" }, { label: "Judgment" }, { label: "Pride" }, { label: "Desire to suppress and teach" },
                    { label: "Limitation" }, { label: "Categoricalness" }, { label: "Harshness" }, { label: "Arrogance" },
                    { label: "Unwillingness to pass knowledge" }, { label: "Uncertainty" }, { label: "Fear of competition" }, { label: "Rebellion" }
                ],
                description: "You are prone to conflicts, as you are convinced that you know how to act correctly. You always know how it is better and start to teach others, pointing out mistakes in an aggressive form. You are limited in your knowledge, fixated on one truth. You refuse to learn and stubbornly hold on to the old. You fear competition and often compare yourself with others."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fifth energy symbolizes family ties, learning and openness to new knowledge.",
                description: "It is important to establish harmonious relationships within your family. Do not impose your principles on loved ones. Each person lives their own life and has their own experience. Accumulate information and life experience. Share knowledge and develop your authority. Find a balance between knowledge and practical application. Show respect and tolerance to everyone. Master the skill of attentive listening. Overcome uncertainty, excessive conservatism, fear of competition."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: TEACHER, ORDER, FAMILY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fifth energy symbolizes family ties, learning and openness to new knowledge.",
                description: "Acknowledge different knowledge and systems. Don't get fixated on one thing. Study new information, expand your horizon. Learn. Think positively. Pass accumulated knowledge to others. Develop oratory skills. Create and maintain family traditions. Spend time with family. Listen to your intuition. Reduce control regarding loved ones. Inspire and motivate people."
            }
        ]
    },
    6: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the sixth energy is the Lovers. This is a structureless, soft, enveloping energy directed at relationships and manifestation of love for oneself, others, a cause, a process. Most of the minus manifestations are related to the excessive sensitivity of this energy.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Loving nature" }, { label: "Communicability" }, { label: "Artistry" }, { label: "Charm" },
                    { label: "Attractiveness" }, { label: "Sensuality" }, { label: "Communication skills" }, { label: "Sense of taste and style" },
                    { label: "Amorousness" }, { label: "Ability to organize" }, { label: "Loyalty" }, { label: "Adaptability" },
                    { label: "Carefulness" }, { label: "Selflessness" }, { label: "Festivity" }, { label: "Emotionality" }
                ],
                description: "Energy of love and celebration. For you relationships stand in first place. You are a very soft and sensitive person. Everything is built on love and feelings. You choose work only by heart, create team through trustful relationships. Love to arrange holidays, give gifts, dress up brightly and gather friends together. You like to take care of yourself and your body."
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
                    { label: "Problems with finances" }, { label: "Apathy" }, { label: "Loneliness" }
                ],
                description: "Main minuses go due to high sensitivity. You idealize and too quickly fall in love, then stay in your delusions. Often fixate on one relationship and then with difficulty survive the departure. You have a habit to complain about life. You don't want to take responsibility, doubt, fear and cannot take a decision. In the end you slide into apathy."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe sixth energy symbolizes all-penetrating love for oneself, partner, those around, profession, Universe.",
                description: "Your soul task is establishing harmonious relationships with the inner self and mastering the art of loving oneself, and then the world. Make all significant decisions from the state of love. Accept and see beauty and perfection in the world. Stop idealizing people. See the world as it is. Be open to self-knowledge. Overcome indecisiveness, touchiness, doubts, closedness. Choose profession where you can realize your creative potential. Develop financial literacy. Create a holiday around yourself."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOVE, RELATIONSHIPS, CELEBRATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe sixth energy symbolizes all-penetrating love for oneself, partner, those around, profession, Universe.",
                description: "Don't strive for ideal. Do everything through love for self and world. Focus on positive qualities in people. Develop own taste and style. Manifest love for self and care for your body. Give self and others gifts. Visit bright events and arrange thematic parties. Gather together with friends, celebrate holidays. Learn to make independent choice. Learn to forgive people and accept them as they are. Help selflessly and from heart. Don't hold on to past."
            }
        ]
    },
    7: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the seventh energy is the Warrior (male energy). In classic Tarot, this arcana is called The Chariot, which symbolizes movement and heralds changes and new opportunities. The owner of the seventh energy needs to be in movement, both in physical plan and in career and self-realization.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Goal-orientedness" }, { label: "Leadership" }, { label: "Responsibility" }, { label: "Skill to lead" },
                    { label: "Recognition" }, { label: "Teamwork" }, { label: "Decisiveness" }, { label: "Activity" },
                    { label: "Ambition" }, { label: "Flexibility" }, { label: "Organizedness" }, { label: "Control of emotions" },
                    { label: "Respect for people" }, { label: "Optimism" }, { label: "Work capacity" }
                ],
                description: "Male volitional energy. You are a leader and lead people. You set clear goals and quickly reach them. You throw a challenge to yourself and follow the dream. You love activity, it charges you. It is simply necessary for you to be in movement. Your energy is entrepreneurial. You are easy on the rise, charge with optimism and energy everyone around."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: AGGRESSION, UNCERTAINTY, STAGNATION\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Destructiveness" }, { label: "Desire to reach goal at any cost" }, { label: "Struggle" }, { label: "Aggression" },
                    { label: "Categoricalness" }, { label: "Overstrain" }, { label: "Workaholism" }, { label: "Dissatisfaction with achievements" },
                    { label: "Loss of goals and sense" }, { label: "Irresponsibility" }, { label: "Fear of leadership" }, { label: "Stagnation" },
                    { label: "Laziness" }, { label: "Apathy" }, { label: "Emotionality" }, { label: "Non-realization" }, { label: "Uncertainty" }
                ],
                description: "Main minuses are warrior-likeness, aggressiveness and excessive toughness. You suppress people, go to your goal through force. Suffer from workaholism. When reach set goal, remain dissatisfied with result. Absence of movement leads to stagnation. If you have no concrete goal, you start to lead meaningless struggle and fuss much."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe seventh energy symbolizes active movement forward, persistence in reaching goals, discipline and ability to control circumstances.",
                description: "It is important to set constant conscious challenges for yourself. Develop leadership qualities and skill of working in team. Be ready to lead and inspire others. Great attention should be devoted to taking decisions and active actions. High tempo of life and constant flow of events will help remain in movement. Sports activities and travels will contribute to development of physical and psychological endurance."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHALLENGE, MOVEMENT, SELF-SUFFICIENCY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe seventh energy symbolizes active movement forward, persistence in reaching goals, discipline and ability to control circumstances.",
                description: "Use your potential for peaceful goals. Refuse from meaningless struggle. Make emphasis on your leadership qualities. Manage your emotions and restrain aggressiveness. Carefully plan, write down stages of reaching goal. Share your achievements with people. Listen to self and trust intuition. Delegate obligations. Engage in spiritual practices and active sport. Lead active and healthy way of life."
            }
        ]
    },
    8: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The eighth energy, by its nature, does not yield to rigid definition of archetype. Owners of the eighth energy can convey to those around state of harmony and pacification, but also easily can slide into aggression and destruction. This energy can be considered the most dual in the matrix.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Reliability" }, { label: "Responsibility" }, { label: "Openness" }, { label: "Kindness" },
                    { label: "Honesty" }, { label: "Loyalty" }, { label: "Courage" }, { label: "Confidence" },
                    { label: "Logicalness" }, { label: "Insightfulness" }, { label: "Adaptability" }, { label: "Pedantry" },
                    { label: "Intuition" }, { label: "Diplomacy" }, { label: "Correctness" }
                ],
                description: "Energy of justice and calmness. You are a peaceful and kind person. For you it is important to find balance in all spheres of life. You can help others find their balance. For you it is important that everything is honest and by law. You protect rights of other people and are ready to stand on side of the weak. You are consistent, reliable, always keep your word."
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
                description: "You in aggressive manner prove your rightness, which leads to frequent quarrels. If there is no balance, you are thrown from extreme to extreme. You suppress people, often argue. Judge actions of others. Try to control loved ones and manipulate them. Often same situations in life repeat. Always search for your balance."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eighth energy is a symbol of law, justice, balance and insightfulness.",
                description: "Your task is to reach balance in chaos of surrounding world, gain harmony with yourself. Observe moral and legal principles. Develop honesty, avoiding lie, deception, manipulations. Develop skills of control over emotionality and aggression. Find way to reach inner balance, harmony and justice. Strive to balance all spheres of your life. Stick to legal norms and moral principles. Develop logical thinking, study cause-and-effect links."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: LOGIC, JUSTICE, DEPTH\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eighth energy is a symbol of law, justice, balance and insightfulness.",
                description: "Don't judge acts of other people. Preserve inner balance. Study deep knowledge and cause-and-effect links. Observe laws, be honest and open. Keep your word. Don't deceive and don't betray. Search for justice through wisdom and open dialogue. Show your true feelings. Convey your knowledge further. Create your family. Learn to see truth and hidden motives that drive people."
            }
        ]
    },
    9: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of the ninth energy is sage-hermit. This is a closed energy which loves to go into self, into its inner cave, where person can be alone with self. From birth people with ninth energy are endowed with light of wisdom, which they can convey to others.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Wisdom" }, { label: "Depth" }, { label: "Sensitivity" }, { label: "Loyalty" },
                    { label: "Calmness" }, { label: "Seclusion" }, { label: "Learning new" }, { label: "Understanding people" },
                    { label: "Tactfulness" }, { label: "Thoroughness" }, { label: "Responsibility" }, { label: "Reliability" },
                    { label: "Carefulness" }, { label: "Attentiveness" }, { label: "Desire to convey knowledge" }, { label: "Modesty" }
                ],
                description: "Sage. You love to dive into self and your thoughts. You lead a secluded way of life. Your main task is not to close from world, but shine and convey your knowledge further. From birth you are endowed with special wisdom. You know how to interpret situations, give useful advice. You like solitude and silence. You are a responsible person who approaches any question thoroughly."
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
                description: "Secluded way of life leads to reservedness and closedness. You go into asceticism, refusing from all material benefits, which leads to problems with finances. Wisdom provokes you to arrogance and pride, you judge people and their actions. Your energy is subject to impostor syndrome: you constantly doubt your ideas, fear to convey knowledge to others, and as a result do not realize your talents."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe ninth energy symbolizes life experience, wisdom, knowledge and spirituality, seclusion and solitude.",
                description: "It is important to pass through process of self-determination, accumulate knowledge, experience and wisdom, and share knowledge with others. Spend time alone with yourself, but this seclusion should have boundaries. Do not refuse material benefits, observe balance between spiritual and material. Overcome reservedness and uncertainty. Work on arrogance, pride and neglectful relation to other people. Do not resist new, be open to modern technologies."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SAGE, SOLITUDE, TACTFULNESS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe ninth energy symbolizes life experience, wisdom, knowledge and spirituality, seclusion and solitude.",
                description: "Search for depth in everything you engage in. Study secret philosophical knowledge. Open your heart to people, share accumulated experience. Work with emotions, learn to speak openly. Trust people. Don't fear solitude, enjoy seclusion. Draw strength in walks in solitude. Learn to be loyal to self, listen to your intuition. Communicate only with people pleasant for you. Look at past experience as lessons."
            }
        ]
    },
    10: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of this energy is startupper, player, inspirer. This is the only energy of the matrix that symbolizes luck. In presence of this energy in matrix it is necessary to pay attention to it in first place, since at minus manifestation it will lead person into heaviness.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" }, { label: "Inspiration" }, { label: "Luck" }, { label: "Openness" },
                    { label: "Leadership" }, { label: "Adventurism" }, { label: "Ideality" }, { label: "Success in matters" },
                    { label: "Persistence" }, { label: "Intuition" }, { label: "Movement" }, { label: "Sociability" },
                    { label: "Communicativeness" }, { label: "Kindness" }, { label: "Optimism" }
                ],
                description: "Energy of luck and inspiration. Rules and systems are not important for you, you act only from flow. Constant movement and development is important for you. You are open to new people, knowledge and experience. Any idea can inspire you. You suddenly encounter right people, money comes unexpectedly. Maintain state of inspiration. Know how to relax and let go of situation."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: HEAVINESS, PASSIVITY, FAILURE\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Heaviness" }, { label: "Tension" }, { label: "Unwillingness to move" }, { label: "Laziness" },
                    { label: "Passivity" }, { label: "Apathy" }, { label: "Suggestibility" }, { label: "Worries" },
                    { label: "Pessimism" }, { label: "Disrespect to people" }, { label: "Inconsistency" }, { label: "Unsystematicness" },
                    { label: "Stubbornness" }, { label: "Harmful habits" }, { label: "Lack of independence" }, { label: "Debts" }, { label: "Fears" }
                ],
                description: "Your main minuses are absence of movement. You have no initiative, no ideas and desire to move forward. You lose inspiration and luck. If there is no movement in life, you go into apathy. You fear to take on new matters, don't believe that luck will be on your side. Main rule: even if lazy, continue at least some movement. Activity will lead your energy into plus."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe tenth energy symbolizes luck, positive attitude, active life position and trust in fate.",
                description: "Your main task is to overcome feeling of heaviness and unwillingness to move forward. Search for inspiration and lightness. Approach life with light and inspired mood. Act, do not reflect endlessly. Discover source of inspiration. Never lose heart, don't complain on life. Catch your flow, notice signs and hints. Do not take everything too seriously. Be calm, relaxed and open to new opportunities. Develop positive thinking."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INSPIRATION, MOVEMENT, LIGHTNESS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe tenth energy symbolizes luck, positive attitude, active life position and trust in fate.",
                description: "Avoid stagnation, eradicate laziness and motivate self to move forward. Travel, go on spontaneous trips. Engage in creativity. Take part in interesting projects. Communicate with different people. Concentrate on your main goals. Let go of hypercontrol. Live in moment here and now. Care about well-being of your family. Regularly rest, relax. Watch inspiring films. Lead healthy way of life. Work over self-discipline."
            }
        ]
    },
    11: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of the eleventh energy is Strength (masculine energy). At plus manifestation, a person with the eleventh energy is endowed with physical and internal strength. This energy gives the person a strong internal core. Such people possess the gift of seeing potential in people and projects.",
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
                description: "Masculine volitional energy. You have a strong character and internal core. Love for work and huge life energy motivate you. You are practical, build processes effectively. Possess ability to see and reveal potential. You love to be in first place and feel yourself a winner. You have good physical strength. Can inspire others for improvement of their physical form."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: POWERLESSNESS, RUDENESS, OVERSTRAIN\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Workaholism" }, { label: "Overstrain" }, { label: "Ignoring problems" }, { label: "Impatience" },
                    { label: "Aggressiveness" }, { label: "Irritability" }, { label: "Suppressing others" }, { label: "Laziness" },
                    { label: "Whining" }, { label: "Rudeness" }, { label: "Powerlessness" }, { label: "Weakness" },
                    { label: "Indecisiveness" }, { label: "Conflictness" }, { label: "Hysteria" }, { label: "Greed" }
                ],
                description: "Due to workaholism you overstrain and rest little. Press on people. Become impatient, lead self rudely. Or on the contrary, lack of will power makes you lazy and complain on life. You fear conflicts but cannot control your emotions. Likely, in childhood there was strong role model in person of mom, who suppressed you. You don't accept your body and sexuality."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eleventh energy symbolizes powerful energy, serious potential, protection and power.",
                description: "Your task is realization of own strength and revealing of maximum potential. Choose correct direction so that strength is used for good. Avoid state of apathy, laziness and exhaustion. Develop confidence in yourself. Use your strength constructively and responsibly. Maintain flexibility and skill to find compromises. Learn to cooperate and respect rights of others. Care for your body. Practice healthy and active way of life. Find balance between activity and rest."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: POTENTIAL, LEADERSHIP, CONFIDENCE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eleventh energy symbolizes powerful energy, serious potential, protection and power.",
                description: "Learn to manage your strength, use it for good. Engage in sports and lead active healthy way of life. Communicate with successful people. Learn to be in state of here and now. Manage your emotions. Think through strategy, record plans and follow them. Be calm and patient. Become leader in your sphere. Learn to yield and go for compromise. Interact with people, not suppress. Rest, relax, meditate."
            }
        ]
    },
    12: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Twelfth energy means suspendedness. Person sees the world as if upside down, differently, not like others. Exactly because of this this energy is the energy of different vision, innovation and creation of something unique and unusual.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Kindness" }, { label: "Serving" }, { label: "Responsiveness" }, { label: "Innovation" },
                    { label: "Creativity" }, { label: "Compassion" }, { label: "Support" }, { label: "Healing" },
                    { label: "Generation of ideas" }, { label: "Self-discipline" }, { label: "Openness" }, { label: "Love for learning" },
                    { label: "Easy resolution of problems" }, { label: "Amorousness" }, { label: "Inventiveness" }, { label: "Individuality" }
                ],
                description: "You look at world differently. You have a different look on processes and events. You love to do everything in your own way, creatively approach resolution of any task. You are an idea-person. You work in flow, come up with ideas on the go. You have an open and kind heart. You like to make people's lives better. You know how to serve selflessly."
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
                description: "You are in the role of victim. You think you do everything for people but get nothing in return. You are vulnerable and touchy. You forget about yourself and your desires. You try to be good for everyone. You don't know how to say no. You depend on opinion of others. There can be problems with creativity. It's difficult for you to realize your own ideas."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twelfth energy reflects unique look on world, kindness and creativity.",
                description: "Your task is to realize your different vision in life, find path of serving, believe in your creative abilities. Get rid of victimhood, touchiness, desire to please everyone. Stop doubting your abilities. Give only from state of abundance. Maintain balance between love for self and care for others. Learn to say no. Bring more good, mercy and compassion into the world. Create something new. Develop empathy and desire to help those in need."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, SERVING, CREATIVE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twelfth energy reflects unique look on world, kindness and creativity.",
                description: "Learn to look at habitual things in a new way. Develop creativity. Learn to approach resolution of tasks non-standardly. Say no in time. Clearly build personal boundaries. Don't devalue your labor, set fair price. Raise self-esteem. Make yourself presents and learn to live for yourself. Exit from state of victim. Do kind deeds not expecting approval. Support social projects, help those in need."
            }
        ]
    },
    13: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Thirteenth energy does not have a specific archetype, it is structureless. This is energy of renewal and transformation. In classic Tarot energy is represented by arcana Death, but it's important to understand that death is a designation of transformation, getting rid of old and birth of new.",
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
                description: "You are an interesting and unusual person. You are capable of transforming thinking of people or working processes. It is important for you to constantly change something in your life, receive new experience. You know how to refuse from old and obsolete. You don't like predictability. You are interested in different aspects of life, curious and creative."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEAR, RECKLESSNESS, HARSHNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Harshness" }, { label: "Pessimism" }, { label: "Aggressiveness" }, { label: "Fear of death" },
                    { label: "Recklessness" }, { label: "Fussiness" }, { label: "Timidity" }, { label: "Passivity" },
                    { label: "Stagnation" }, { label: "Coldness" }, { label: "Calculativeness" }, { label: "Carelessness" }, { label: "Riskiness" }
                ],
                description: "If energy is in minus zone, you fear changes. You get stuck on one place and don't realize your talents. You clutch at past. Doubts and fears appear. If you don't act independently, your energy will attract forced changes. On other hand, you can behave harshly and aggressively. There can be mood swings. You can take on several matters at once and not lead any to end."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe thirteenth energy symbolizes radical changes in life, transformation of internal world.",
                description: "Learn to perceive changes with positive perspective. Overcome fear before change. Be brave and ready for transformations. Help other people in their transformation. Get rid of harshness and aggressiveness. Become more calm and peaceful. Accept changes as integral part of life. Free yourself from past. Bravely create global changes in spheres that worry you. Don't be afraid to exit beyond frameworks of habitual."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CHANGES, COURAGE, TRANSFORMATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe thirteenth energy symbolizes radical changes in life, transformation of internal world.",
                description: "Set order in matters, things and relationships. Get rid of what doesn't lead you to result. Don't take on many matters at once. Lead any matter to end. Learn to be more calm and peaceful. Live here and now. Stop being afraid for relatives. Be joyful and optimistic. Experiment in all spheres. Work over positive thinking. Bravely start new stages in your life."
            }
        ]
    },
    14: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of fourteenth energy is artist and creator. This is very creative, refined, soft energy. Lightness, spirituality and connection with higher, connection with flow is inherent to it. For representatives of this energy it's important to be in state of inspiration.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: SENSITIVITY, CALM, ART\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" }, { label: "Softness" }, { label: "Sensitivity" }, { label: "Intellectuality" },
                    { label: "Soulfulness" }, { label: "Healing" }, { label: "Morality" }, { label: "Wisdom" },
                    { label: "Calm" }, { label: "Harmoniousness" }, { label: "Modesty" }, { label: "Patience" },
                    { label: "Decency" }, { label: "Nobility" }, { label: "Delicate taste" }, { label: "Refinement" }
                ],
                description: "Soft creative energy. You are a refined nature with strong spiritual and healing energy. You live and create in flow. You inspire people. You like to create in solitude and calm. You understand own desires and strivings. You have internal core and strength of spirit. You are a soulful person with whom it's always interesting to talk."
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
                description: "You are very vulnerable and capricious. You are thrown from extreme to extreme. You are easy to offend. Or on contrary, you manifest harshness and callousness. You are closed from people. There is risk to acquire strong dependency. You hold onto past, don't know how to forgive. You get attached to money and material values. You don't realize yourself in creativity."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fourteenth energy endows its owner with calm, harmony, modesty and sensitivity.",
                description: "Your task is to understand yourself, reach harmony and equilibrium in basic aspects of life: finances, relationships, health and spiritual development. Accept your sensitive, delicate creative nature. Develop patience, self-control, creative abilities and empathy. Fight with closedness, rudeness and harmful habits. Learn to control your feelings. Open for yourself different forms of art. Go on travels. Don't fall into extremes. Engage in matter that truly you like."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SENSITIVITY, CALM, ART\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fourteenth energy endows its owner with calm, harmony, modesty and sensitivity.",
                description: "Express emotions openly. Fight bad habits, lead healthy way of life. Manifest honesty and openness. Learn moderation and patience. Meditate, engage in spiritual practices. Inspire yourself through art. Rest, take hot bath, visit saunas. Walk in parks. Visit your places of power. Combine creativity and income. Listen to your internal voice, develop intuition."
            }
        ]
    },
    15: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of fifteenth energy is devil and tempter (masculine energy). This is energy of sexuality and attractiveness, which can literally strike with current and charge people. Owners of this energy can be dual: they can provide help to people, or under guise of help start to manage and manipulate.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Energetic" }, { label: "Positive" }, { label: "Love for entertainment and pleasures" }, { label: "Love for material values" },
                    { label: "Good intuition" }, { label: "Clairvoyance" }, { label: "Wisdom" }, { label: "Understanding of essence of things" },
                    { label: "Luck" }, { label: "Fascination" }, { label: "Attractiveness" }, { label: "Style" },
                    { label: "Oratorical abilities" }, { label: "Openness to trips" }, { label: "Compassion" }, { label: "Kindness" }, { label: "Sexuality" }
                ],
                description: "You have strong energy of temptation. You see all subtleties and defects in another person or work process, you know how to fix it. You love pleasures, luxury and comfort. You know how to find approach to person. You have good connection with intuition and higher forces. Possess gift of clairvoyance. You are sexual and charming."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: MANIPULATION, TEMPTATION, GREED\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Aggressiveness" }, { label: "Jealousy" }, { label: "Envy" }, { label: "Vulnerability" },
                    { label: "Dependencies" }, { label: "Arrogance" }, { label: "Thirst for power" }, { label: "Pride" },
                    { label: "Fixation on material" }, { label: "Suppression of people" }, { label: "Rigidity" }, { label: "Deception" },
                    { label: "Greed" }, { label: "Selfishness" }, { label: "Betrayal" }, { label: "Manipulations" }
                ],
                description: "You can fall into different dependencies. Manipulate people, press on their weak points. Deceive for selfish goals. Can be arrogant, want power over people. Critically relate to opinion of others. Love for luxury and excessive striving for material benefits make you greedy. Can excessively guard loved ones, even manifest aggression."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fifteenth energy symbolizes desires and passion, determination and independence.",
                description: "Your task is realization of hidden desires, acceptance of own defects and turning them into virtues. Overcome temptations in power, relationships, money. Don't resort to manipulations, anger, dependencies. Use your ability to see problematic points for help in development. Recognize dark desires. Master skills of management of anger and rage. Find healthy ways of expression of negative energy through sport, art or meditation."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: CORRECTION, LUXURY, CHARM\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe fifteenth energy symbolizes desires and passion, determination and independence.",
                description: "Learn to see world and people through prism of good. Develop spiritually. Work over internal aggression. Get rid of cynicism and selfishness. Accept and forgive people. Open your heart for love. Don't manipulate people. Engage in spiritual practices. Activate your sexual energy. Engage in creativity. Take care of your body. Free yourself from bad habits. Hold balance between spiritual and material."
            }
        ]
    },
    16: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of sixteenth energy is revolutionary. By classic of Tarot, sixteenth arcana is called tower, which symbolizes support and confidence. To people with this energy it's important to be on their path, otherwise life can start to direct them through destruction of habitual way.",
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
                description: "You live here and now, look differently at things. You are not afraid to go into new, open to changes. You destroy old and create new in its place. You are a self-confident person. You can inspire others, lead behind you. You have a kind and honest heart. You don't get fixated on money. You have non-standard thinking and rich imagination."
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
                description: "First important minus is excessive rigidity. You cut from shoulder, are categorical. You bear destruction instead of creation. Material values drive you, you refuse from spiritual and can fall into dependencies. Other side is sluggishness, indecisiveness, strong attachment to old. You fear changes, not ready to go into new. If you won't develop, life will force you through loss."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe sixteenth energy symbolizes trials and challenges, firmness of character, will and determination.",
                description: "You need to become more steadfast and confident, free yourself from fears. Engage in self-knowledge, develop your ideas, act energetically and inspire others. Develop resilience to blows of fate. Learn not to depend on material, adapt to changes. Fight with laziness. Accept change as opportunity for growth. Strive for flexibility and softening of rigidity in relationships. Develop ethical values and skill to lead others on path of spiritual growth."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INNOVATION, ENERGY, IDEOLOGY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe sixteenth energy symbolizes trials and challenges, firmness of character, will and determination.",
                description: "Act decisively and boldly. Work on yourself. Learn to live consciously. Cleanse your space, do decluttering. Travel, study new cultures. Meditate, engage in yoga. Work over internal aggression. Strengthen your physical health. Take care of your body. Calmly accept any changes. Share new knowledge with people. Don't regret about past."
            }
        ]
    },
    17: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "Archetype of seventeenth energy is star person, who realized one's talents (feminine energy). This is a soft and creative energy, which needs to follow one's star, listen to self, go for one's dream. For people with this energy it's important to shine and gather attention thanks to their creativity.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Creativity" }, { label: "Desire to be in center of attention" }, { label: "Brightness" }, { label: "Emotionality" },
                    { label: "Artistry" }, { label: "Charm" }, { label: "Love for self" }, { label: "Lightness" },
                    { label: "Sensitivity" }, { label: "Intuition" }, { label: "Individuality" }, { label: "Imagination" },
                    { label: "Optimism" }, { label: "Persistence" }, { label: "Ambitiousness" }, { label: "Openness" }
                ],
                description: "Soft creative energy. From birth you are a bright personality. You stand out from the crowd, have many talents, attractive appearance and powerful charisma. You shine for those around you. You like publicity and fame. Ambitiousness and large-scale goals motivate you. You have unique imagination and creative thinking. You are a kind and open person."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: VANITY, UNREALIZEDNESS, ILLUSIONS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Unrealizedness" }, { label: "Lack of confidence" }, { label: "Pride" }, { label: "Stardom" },
                    { label: "Vanity" }, { label: "Fixation on material" }, { label: "Withdrawal from reality" }, { label: "Deception" },
                    { label: "Illusions" }, { label: "Selfishness" }, { label: "Fear of unknown" }, { label: "Problems with sexuality" }
                ],
                description: "First variant is unrealizedness. You stay in shade, don't reveal your talents, doubt yourself. You are shy to be in center of attention. Second variant is pride, vanity, star sickness. You go away from reality, behave selfishly, manipulate. Get fixated on success and money. Live in illusions. Don't accept your appearance. Often there are problems with sexuality."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe seventeenth energy calls to believe in one's gift, find true dream and follow it, exit from shade and gain confidence.",
                description: "Develop confidence in yourself, understand your value and uniqueness. Work through vanity. Learn to take money for your work. Don't despair if you think you lack talent. Try yourself in different directions. Listen to intuition. Don't strive to copy someone. Follow your hobbies. Overcome apathy, doubts, indecisiveness. Believe in your giftedness. Allow yourself to be successful and famous. Develop creative talents and sensitivity."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: BRIGHTNESS, CREATIVITY, SENSITIVITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe seventeenth energy calls to believe in one's gift, find true dream and follow it, exit from shade and gain confidence.",
                description: "Write down your goal. Share your thoughts with close people. Reveal your creative potential. Find favorite matter that inspires you. Follow impulses of your heart. Communicate with like-minded people. Don't fear to experiment. Visit parties and events. Accept your uniqueness. Refuse from pride and vanity. Allow yourself to be successful and famous."
            }
        ]
    },
    18: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The eighteenth energy does not have a defined archetype. It is a structureless energy associated with the astral body, intuition, sensing. In the classical Tarot, this arcana is called The Moon, which speaks of attraction, mystery, and mysticism of this energy.",
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
                description: "You have strong intuition and ability to attract what you desire. You like to study everything related to unconscious and magical. You are mysterious and attractive. You can fly away from real world into your subconscious. You create your magic in work or creativity. You go your own way. You are soft and kind, easily adapt."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: FEARS, NEGATIVE, CLOSEDNESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Withdrawal from reality" }, { label: "Addictions" }, { label: "Depressiveness" }, { label: "Anxiety" },
                    { label: "Hypocrisy" }, { label: "Doubts" }, { label: "Closedness" }, { label: "Victim state" },
                    { label: "Destruction" }, { label: "Inaction" }, { label: "Unrealizedness" }, { label: "Vindictiveness" },
                    { label: "Resentfulness" }, { label: "Laziness" }, { label: "Apathy" }, { label: "Indecisiveness" }
                ],
                description: "First direction of minuses is excessive closedness and withdrawal from reality, addictions, depressions. Second direction is fears. You constantly doubt, fear, cannot take decision. You stay in victim state, complain. It's difficult to make first step. It's important to maintain positive thinking. Your energy attracts everything you think about."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eighteenth energy symbolizes creative principle, empathy, and materialization of thoughts.",
                description: "Learn to manage your imagination. Develop internal world and gain faith in your creative potential and intuition. Overcome your fears. Do not withdraw from reality. Take responsibility for your life. Reveal your intuition and sensitivity. Free yourself from fears and doubts. Study laws of karma and cause-and-effect relationships. Develop intuition. Learn to live in present moment, be here and now."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DEPTH, INTUITION, ATTRACTION, LIBERATION FROM FEARS\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe eighteenth energy symbolizes creative principle, empathy, and materialization of thoughts.",
                description: "In moments of anxiety, let worries through yourself. Work through your fears. Focus on specific tasks. Develop intuition. Think positively, make vision boards. Trust others, speak truth. Be more often in nature near water. Lead healthy way of life. Stop doubting your possibilities. Visualize positive images. Think creatively. Communicate with creative people."
            }
        ]
    },
    19: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of the nineteenth energy is the Sun, the leader of a creative club (male energy). This is leadership and creative energy. People with this energy are endowed with warmth, creative potential, they can engage in global projects. They possess internal strength and move forward.",
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
                description: "Leadership energy. You are a team player and authority for others. You carry warmth, light, and goodness to people. You have positive thinking and huge life energy. You love to engage in charitable projects. You are an ideological person. You are ready to take on large-scale projects. You like to engage in creativity. You have strong connection with nature."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: RIGIDITY, FADING, MATERIALISM\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Demandingness" }, { label: "Vanity" }, { label: "Hypercontrol" }, { label: "Egoism" },
                    { label: "Hot temper" }, { label: "Aggressiveness" }, { label: "Fixation on material" }, { label: "Irresponsibility" },
                    { label: "Fear of big projects" }, { label: "Pride" }, { label: "Fanaticism" }, { label: "Envy" },
                    { label: "Powerfulness" }, { label: "Rudeness" }, { label: "Feeling of guilt" }, { label: "Illnesses" }
                ],
                description: "First manifestation is rigidity and excessive demandingness. You set impossible goals, pressure subordinates. You manifest hypercontrol. You often envy, comparing yourself with others. Second manifestation is fading, apathy, doubts. You are not ready to take responsibility. Fear to start big projects. In childhood, bad relationships with father could have formed."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe nineteenth energy symbolizes healthy ambitions, soul warmth, and life progress.",
                description: "Set serious goals and achieve them. Distribute your energy, not focusing only on one goal. Avoid inaction. Maintain internal fire and do not let anger, aggression, or greed control you. Work on increasing self-esteem. Accept responsibility for your actions. Develop breadth of thinking. Overcome fear of big projects. Learn to set ideological, creative and big goals."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: SCALE, ACTION, IDEOLOGY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe nineteenth energy symbolizes healthy ambitions, soul warmth, and life progress.",
                description: "Be an example for others. Communicate, get acquainted with new people. Support loved ones. Regularly rest and care for yourself. Think positively. Engage in creativity. Engage in charity. Wake up early, meditate. Be grateful. Engage in sport. Develop oratory talents. Get rid of aggression and feeling of guilt. Learn to rejoice in simple things."
            }
        ]
    },
    20: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "This energy is one of the most complex to understand. The twentieth energy lacks a clear structure and archetype. According to classical Tarot, this is the Judgment arcana, which hints that a person with this energy can be just, knows how to judge and condemn.",
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
                description: "You have talent for uniting and creating something integral. You find balance between spiritual and material. You have strong sensitivity and gift of clairvoyance. You possess deep life wisdom. You easily adapt to new conditions. You have strong connection with family and ancestry."
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
                description: "You lack integrity and balance. You cannot find a soul-appealing cause. You cannot assemble yourself. You fixate on material values. Or you behave as rigid and authoritarian person. Not infrequently there are problems with family: quarrels, conflicts, misunderstanding."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twentieth energy symbolizes ancestry and family, wisdom and awakening.",
                description: "Your task is to unite something into a single whole. Develop sensitivity and direct it to creative creation. Maintain good relationships with relatives. Be ready for changes. Strive for personal and spiritual growth. Heal problems of past. Strengthen self-esteem and confidence. Work through relationships with parents. Accept and forgive. Maintain harmony and warm contact with relatives."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: INTEGRITY, ANCESTRY, CLAIRVOYANCE\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twentieth energy symbolizes ancestry and family, wisdom and awakening.",
                description: "Engage in spiritual practices. Lead healthy way of life. Engage in creativity. Transmit your wisdom to others. Develop sensuality, intuition, clairvoyance. Help people find integrity. Write down your goals. Practice forgiveness and acceptance. Communicate with relatives. Study your ancestry. Maintain family traditions."
            }
        ]
    },
    21: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The archetype of this energy is a diplomat (female energy), who is tuned to peaceful solution of problems and harmonization of everything around. The twenty-first energy is open to the world and surrounding people, ready to accept and respect other points of view and cultures.",
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
                description: "Soft female energy. You are open to new and unknown. You have flexible thinking. You are cheerful, kind, and smiling. You always smooth over conflict situations. You know how to negotiate, find compromise. Healing, clairvoyance, and intuition are well-developed. You think globally. You travel often, study other cultures."
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
                description: "You behave aggressively, often argue. You judge others. Categoricalness and desire to dominate prevent trust. Second variant is fear to go into new, constant doubts. You are unconfident. Everything global scares you. You are not ready to master new professions, refuse to travel."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twenty-first energy symbolizes large-scale thinking and global goals.",
                description: "Accept the world in all fullness and people as they are. Set large-scale tasks. Manifest love to whole world and respect to different religions, nations and countries. Overcome template thinking. Learn to accept another's point of view. Get rid of militant attitude. Establish global goals of world significance. Be open to new acquaintances with people of different nations. Travel. Expand your consciousness."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: DIPLOMACY, EXPANSION, ADAPTATION\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twenty-first energy symbolizes large-scale thinking and global goals.",
                description: "Study foreign languages. Travel. Manifest interest in other cultures. Write down your fears. Think about global. Go beyond frames. Be grateful. Engage in sport. Lead healthy, eco-friendly way of life. Develop tolerance. Share with people. Increase qualification. Be patient, manifest flexibility. Lead started cause to end."
            }
        ]
    },
    22: {
        title: "My life purpose",
        intro: "The energy of soul purpose shows the task we came to accomplish in this life. It is through the qualities of this energy that our development and learning lessons in life occur.",
        archetype: "The twenty-second energy is the energy of lightness, flow, and freedom. Representatives of this energy need to be in a state of trust in the world. In classical Tarot the zero arcana (the twenty-second energy) is the Fool, who follows his own rules and does not limit himself with traditions or social norms.",
        tabs: [
            {
                id: "positives",
                label: "My positives",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nPlus energy is all the positive manifestations we receive in the form of specific character traits and our inner states. Describing the energy in plus helps you understand how much of this energy is now showing up in plus for you specifically.",
                items: [
                    { label: "Lightness" }, { label: "Freedom" }, { label: "Innovation" }, { label: "Openness" },
                    { label: "Adaptability" }, { label: "Optimism" }, { label: "Kindness" }, { label: "Communicability" },
                    { label: "Adventurism" }, { label: "Independence" }, { label: "Going beyond frames" }, { label: "Activity" },
                    { label: "Movement" }, { label: "Creativity" }
                ],
                description: "Light female energy. You live in flow and full freedom. You have no frames and limitations. You do not accept prohibitions, do not like work by schedule. You are a free person. Creative thinking helps you approach any task non-standardly. You are active, constantly in movement, travel a lot, easily adapt."
            },
            {
                id: "negatives",
                label: "My negatives",
                intro: "tags: INADEQUACY, ATTACHMENT, HEAVINESS\n\nEnergy in minus is all the negative manifestations we receive in the form of specific character traits and our internal states. Describing the energy in minus helps you understand how much of that energy is now manifesting in minus for you specifically.",
                items: [
                    { label: "Irresponsibility" }, { label: "Heaviness" }, { label: "Lateness" }, { label: "Unreliability" },
                    { label: "Fixation on material" }, { label: "Jealousy" }, { label: "Overpoweringness" }, { label: "Inadequacy" },
                    { label: "Dependencies" }, { label: "Suppression" }, { label: "Debts" }, { label: "Dissoluteness" },
                    { label: "Apathy" }, { label: "Non-freedom" }
                ],
                description: "You have too non-serious and irresponsible attitude to life. You don't fulfill promises, miss deadlines. You can behave inadequately, suppress others. Absence of frames leads to dissolute way of life, dependencies. Second variant is tension and too serious attitude. You lack lightness, constantly worry. Sense of internal non-freedom leads to apathy."
            },
            {
                id: "lifePurpose",
                label: "What is my life purpose?",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twenty-second energy symbolizes freedom, lightness, absence of boundaries.",
                description: "Your task is realization of freedom and lightness, development of creative abilities. Learn to go beyond frames and gain new experiences. Create a more ordered and conscious lifestyle. Simplify your life and tune into lightness. Maintain optimistic mood. Avoid unreasonable spendings, risks and gambling. Strive for diversity and growth. Get rid of internal limitations. Learn to laugh at yourself. Be kind and independent. Trust your intuition."
            },
            {
                id: "recommendations",
                label: "Recommendations",
                intro: "tags: FREEDOM, LIGHTNESS, ACTIVITY\n\nThe soul task point is responsible for the task we came to realize in this life. If a person has not activated the energy of the soul task or it is manifested in minus, then life lessons are not passed successfully and repeat again and again.\n\nThe twenty-second energy symbolizes freedom, lightness, absence of boundaries.",
                description: "Don't fear to go into new and start from zero. Travel. Engage in creativity. Spend time with children. Don't load yourself with heavy tasks. Reduce communication with toxic people. Lead healthy way of life. Choose freelance or project work. Implement your creative ideas. Don't limit freedom of other people. Trust the Universe. Engage in sport, lead active way of life."
            }
        ]
    }
};

export const identityInterpretations: Record<number, SectorCardContent> = {
    1: {
        identitySections: [whoAmIData[1], myStrengthsData[1], myIntellectData[1], selfManifestationData[1], energySourceData[1], weaknessesData[1]]
    },
    2: {
        identitySections: [whoAmIData[2], myStrengthsData[2], myIntellectData[2], selfManifestationData[2], energySourceData[2], weaknessesData[2]]
    },
    3: {
        identitySections: [whoAmIData[3], myStrengthsData[3], myIntellectData[3], selfManifestationData[3], energySourceData[3], weaknessesData[3]]
    },
    4: {
        identitySections: [whoAmIData[4], myStrengthsData[4], myIntellectData[4], selfManifestationData[4], energySourceData[4], weaknessesData[4]]
    },
    5: {
        identitySections: [whoAmIData[5], myStrengthsData[5], myIntellectData[5], selfManifestationData[5], energySourceData[5], weaknessesData[5]]
    },
    6: {
        identitySections: [whoAmIData[6], myStrengthsData[6], myIntellectData[6], selfManifestationData[6], energySourceData[6], weaknessesData[6]]
    },
    7: {
        identitySections: [whoAmIData[7], myStrengthsData[7], myIntellectData[7], selfManifestationData[7], energySourceData[7], weaknessesData[7]]
    },
    8: {
        identitySections: [whoAmIData[8], myStrengthsData[8], myIntellectData[8], selfManifestationData[8], energySourceData[8], weaknessesData[8]]
    },
    9: {
        identitySections: [whoAmIData[9], myStrengthsData[9], myIntellectData[9], selfManifestationData[9], energySourceData[9], weaknessesData[9]]
    },
    10: {
        identitySections: [whoAmIData[10], myStrengthsData[10], myIntellectData[10], selfManifestationData[10], energySourceData[10], weaknessesData[10]]
    },
    11: {
        identitySections: [whoAmIData[11], myStrengthsData[11], myIntellectData[11], selfManifestationData[11], energySourceData[11], weaknessesData[11]]
    },
    12: {
        identitySections: [whoAmIData[12], myStrengthsData[12], myIntellectData[12], selfManifestationData[12], energySourceData[12], weaknessesData[12]]
    },
    13: {
        identitySections: [whoAmIData[13], myStrengthsData[13], myIntellectData[13], selfManifestationData[13], energySourceData[13], weaknessesData[13]]
    },
    14: {
        identitySections: [whoAmIData[14], myStrengthsData[14], myIntellectData[14], selfManifestationData[14], energySourceData[14], weaknessesData[14]]
    },
    15: {
        identitySections: [whoAmIData[15], myStrengthsData[15], myIntellectData[15], selfManifestationData[15], energySourceData[15], weaknessesData[15]]
    },
    16: {
        identitySections: [whoAmIData[16], myStrengthsData[16], myIntellectData[16], selfManifestationData[16], energySourceData[16], weaknessesData[16]]
    },
    17: {
        identitySections: [
            whoAmIData[17],
            myStrengthsData[17],
            myIntellectData[17],
            selfManifestationData[17],
            energySourceData[17],
            weaknessesData[17]
        ]
    },
    18: {
        identitySections: [whoAmIData[18], myStrengthsData[18], myIntellectData[18], selfManifestationData[18], energySourceData[18], weaknessesData[18]]
    },
    19: {
        identitySections: [whoAmIData[19], myStrengthsData[19], myIntellectData[19], selfManifestationData[19], energySourceData[19], weaknessesData[19]]
    },
    20: {
        identitySections: [whoAmIData[20], myStrengthsData[20], myIntellectData[20], selfManifestationData[20], energySourceData[20], weaknessesData[20]]
    },
    21: {
        identitySections: [whoAmIData[21], myStrengthsData[21], myIntellectData[21], selfManifestationData[21], energySourceData[21], weaknessesData[21]]
    },
    22: {
        identitySections: [whoAmIData[22], myStrengthsData[22], myIntellectData[22], selfManifestationData[22], energySourceData[22], weaknessesData[22]]
    },
};
