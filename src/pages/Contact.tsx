import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
    const { language } = useLanguage();

    const labels = {
        en: { title: "Have questions? We are here to help.", subtitle: "Have questions? We are here to help.", name: "Name", email: "Email", message: "Message", send: "Send Message", success: "Message sent! We will get back to you soon.", info: "Contact Information" },
        ru: { title: "Связаться с нами", subtitle: "Есть вопросы? Мы здесь, чтобы помочь.", name: "Имя", email: "Email", message: "Сообщение", send: "Отправить", success: "Сообщение отправлено! Мы скоро свяжемся с вами.", info: "Контактная информация" }
    };
    const t = (labels as any)[language] || labels.en;

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{t.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.title}</CardTitle>
                        <CardDescription>{t.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t.name}</label>
                            <Input placeholder={t.name} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t.email}</label>
                            <Input type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{t.message}</label>
                            <Textarea placeholder={t.message} className="min-h-[120px]" />
                        </div>
                        <Button className="w-full gap-2">
                            <Send className="w-4 h-4" />
                            {t.send}
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.info}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">support@soulplusai.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Social</p>
                                    <p className="text-sm text-muted-foreground">@soulplusai_official</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
