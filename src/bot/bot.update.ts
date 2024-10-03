import { Command, Ctx, Hears, Help, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class BootUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply("Welcome to this bot !");
  }

  //   @On("text")
  //   async onText(@Ctx() ctx: Context) {
  //     console.log(ctx);

  //     if ("text" in ctx.message) {
  //       if (ctx.message.text == "hello") {
  //         await ctx.replyWithHTML("<b> Salom </b>");
  //       } else {
  //         await ctx.replyWithHTML(ctx.message.text);
  //       }
  //     }
  //   }

  @On("photo")
  async onPhoto(@Ctx() ctx: Context) {
    if ("photo" in ctx.message) {
      console.log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
      );
    }
  }

  @On("video")
  async onVedio(@Ctx() ctx: Context) {
    if ("video" in ctx.message) {
      console.log(ctx.message.video);
      await ctx.reply(String(ctx.message.video.file_name));
    }
  }

  @On("sticker")
  async onStickker(@Ctx() ctx: Context) {
    if ("sticker" in ctx.message) {
      console.log(ctx.message.sticker);
      await ctx.reply(ctx.message.sticker.file_id);
    }
  }

  @On("animation")
  async onAnimation(@Ctx() ctx: Context) {
    if ("animation" in ctx.message) {
      await ctx.reply("Animation 👌");
    }
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    if ("contact" in ctx.message) {
      await ctx.reply(ctx.message.contact.first_name);
      await ctx.reply(ctx.message.contact.last_name);
      await ctx.reply(ctx.message.contact.phone_number);
    }
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    if ("location" in ctx.message) {
      await ctx.replyWithLocation(
        ctx.message.location.latitude,
        ctx.message.location.longitude
      );
    }
  }

  @On("voice")
  async onVoice(@Ctx() ctx: Context) {
    if ("voice" in ctx.message) {
      await ctx.reply(String(ctx.message.voice.duration));
    }
  }

  @On("document")
  async onDocumnet(@Ctx() ctx: Context) {
    if ("document" in ctx.message) {
      await ctx.reply(String(ctx.message.document.file_name));
    }
  }

  @Hears("hi")
  async hearsHi(@Ctx() ctx: Context) {
    await ctx.reply("Hey, there!");
  }

  @Command("help")
  async commandHelp(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(`
    <b>start</b> - Botni ishga tushirish, \n<b>stop</b> - Botni to'xtatish, \n<b>help</b> - Ushbu buyruqlarni ko'rsatish \n
    `);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat.id);
    console.log(ctx.from);
    console.log(ctx.from.first_name);
  }
}
