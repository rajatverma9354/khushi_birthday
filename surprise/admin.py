from django.contrib import admin
from .models import (
    BirthdaySettings,
    GalleryPhoto,
    Reason,
    TimelineEvent,
    BirthdayLetter,
    HiddenMemory,
    SurpriseReply,
)


@admin.register(BirthdaySettings)
class BirthdaySettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Basic Information", {
            "fields": (
                "girl_name",
                "unlock_password",
                "birthday",
                "favorite_color",
            )
        }),
        ("Media", {
            "fields": (
                "hero_photo1",
                "hero_photo2",
                "hero_photo3",
                "favorite_song",
            )
        }),
        ("Messages", {
            "fields": (
                "welcome_title",
                "welcome_message",
                "countdown_message",
                "wait_message",
            )
        }),
        ("Website Settings", {
            "fields": (
                "browser_title",
                "loading_text",
                "login_title",
                "login_subtitle",
                "unlock_button_text",
                "footer_text",
                "theme_style",
                "autoplay_music",
                "enable_confetti",
            )
        }),
    )


admin.site.register(GalleryPhoto)
admin.site.register(Reason)
admin.site.register(TimelineEvent)
admin.site.register(BirthdayLetter)
admin.site.register(HiddenMemory)


@admin.register(SurpriseReply)
class SurpriseReplyAdmin(admin.ModelAdmin):
    list_display = ("answer", "message", "created_at")
    readonly_fields = ("answer", "message", "created_at")
