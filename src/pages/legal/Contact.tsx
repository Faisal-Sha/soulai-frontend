import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useCopy } from "@/i18n";

export default function Contact() {
  const t = useCopy();
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          {t("legal.contact.title", "Have questions? We are here to help")}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
          {t("legal.contact.subtitle", "Have questions? We are here to help.")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("legal.contact.cardTitle", "Have questions? We are here to help.")}</CardTitle>
            <CardDescription>{t("legal.contact.cardDesc", "Have questions? We are here to help.")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("legal.contact.name", "Name")}</label>
              <Input placeholder={t("legal.contact.name", "Name")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("legal.contact.email", "Email")}</label>
              <Input type="email" placeholder={t("legal.contact.emailPlaceholder", "email@example.com")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("legal.contact.message", "Message")}</label>
              <Textarea placeholder={t("legal.contact.message", "Message")} className="min-h-[120px]" />
            </div>
            <Button className="w-full gap-2">
              <Send className="w-4 h-4" />
              {t("legal.contact.send", "Send Message")}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("legal.contact.infoTitle", "Contact Information")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("legal.contact.emailLabel", "Email")}</p>
                  <p className="text-sm text-muted-foreground">support@soulplusai.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("legal.contact.socialLabel", "Social")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("legal.contact.socialHandle", "@soulplusai_official")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
