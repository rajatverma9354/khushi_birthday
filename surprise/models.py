from django.db import models


class BirthdaySettings(models.Model):

    girl_name = models.CharField(max_length=100)

    unlock_password = models.CharField(max_length=100)

    birthday = models.DateTimeField()

    favorite_color = models.CharField(max_length=100)

#    hero_photo = models.ImageField(upload_to="photos/")
    hero_photo1 = models.ImageField(upload_to='photos/', blank=True, null=True)
    hero_photo2 = models.ImageField(upload_to='photos/', blank=True, null=True)
    hero_photo3 = models.ImageField(upload_to='photos/', blank=True, null=True)

    favorite_song = models.FileField(upload_to="music/")

    welcome_title = models.CharField(
        max_length=200,
        default="Happy Birthday ❤️"
    )

    welcome_message = models.TextField()

    countdown_message = models.TextField()

    wait_message = models.TextField()

    # NEW

    browser_title = models.CharField(
        max_length=200,
        default="Someone Left You A Secret ❤️"
    )

    loading_text = models.CharField(
        max_length=200,
        default="Preparing Something Beautiful..."
    )

    login_title = models.CharField(
        max_length=200,
        default="Who's the Birthday Queen?"
    )

    login_subtitle = models.CharField(
        max_length=300,
        default="Only the birthday girl can unlock this surprise ❤️"
    )

    unlock_button_text = models.CharField(
        max_length=100,
        default="Unlock My Surprise ❤️"
    )

    footer_text = models.CharField(
        max_length=300,
        default="Made Especially For You ❤️"
    )

    theme_style = models.CharField(
        max_length=50,
        default="Aurora"
    )

    autoplay_music = models.BooleanField(default=True)

    enable_confetti = models.BooleanField(default=True)

    def __str__(self):
        return self.girl_name


class GalleryPhoto(models.Model):
    image = models.ImageField(upload_to="gallery/")

    caption = models.CharField(max_length=255)

    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.caption

    class Meta:
        ordering = ["order"]


class Reason(models.Model):
    icon = models.CharField(
        max_length=20,
        default="❤️"
    )

    title = models.CharField(max_length=100)

    description = models.TextField()

    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["order"]


class TimelineEvent(models.Model):
    event_date = models.DateField()

    title = models.CharField(max_length=150)

    description = models.TextField()

    image = models.ImageField(
        upload_to="timeline/",
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["order"]


class BirthdayLetter(models.Model):
    title = models.CharField(max_length=200)

    message = models.TextField()

    signature = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class HiddenMemory(models.Model):
    image = models.ImageField(upload_to="hidden/")

    message = models.TextField()

    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.message[:40]

    class Meta:
        ordering = ["order"]


class SurpriseReply(models.Model):
    answer = models.CharField(max_length=10)

    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.answer} - {self.created_at:%Y-%m-%d %H:%M}"

    class Meta:
        ordering = ["-created_at"]
