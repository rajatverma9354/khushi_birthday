from django.conf import settings as django_settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST
from .models import (
    BirthdayLetter,
    BirthdaySettings,
    GalleryPhoto,
    HiddenMemory,
    Reason,
    SurpriseReply,
    TimelineEvent,
)


def home(request):
    settings = BirthdaySettings.objects.first()

    context = {
        "settings": settings,
        "letter": BirthdayLetter.objects.first(),
        "timeline": TimelineEvent.objects.all(),
        "gallery": GalleryPhoto.objects.all(),
        "reasons": Reason.objects.all(),
        "hidden_memories": HiddenMemory.objects.all(),
    }

    return render(request, "surprise/index.html", context)


@require_POST
def save_reply(request):
    answer = request.POST.get("answer", "").strip().lower()
    message = request.POST.get("message", "").strip()

    if answer not in {"yes", "no"}:
        return JsonResponse({"ok": False, "message": "Please choose yes or no."}, status=400)

    reply = SurpriseReply.objects.create(answer=answer, message=message)
    notify_email = getattr(django_settings, "SURPRISE_NOTIFY_EMAIL", "")

    if notify_email:
        cute_answer = "Yes ❤️" if answer == "yes" else "No"
        send_mail(
            subject="Birthday surprise reply received",
            message=(
                f"She replied: {cute_answer}\n\n"
                f"Message: {message or 'No message'}\n\n"
                f"Saved reply id: {reply.id}"
            ),
            from_email=getattr(django_settings, "DEFAULT_FROM_EMAIL", None),
            recipient_list=[notify_email],
            fail_silently=True,
        )

    return JsonResponse({
        "ok": True,
        "message": "Reply saved. Dil tak notification pahunch gaya ❤️",
    })
