/**
 * Created by Will on 1/23/2017.
 */

module.exports = (msg, args) =>  {
    const input = ':arrow_right: **Input:**\n```js\n' + args.join(' ') + '\n```';
    return new Promise((resolve, reject) => {
        let ev;

        try {
            ev = eval(args.join(' '));

            if(ev && ev instanceof Promise)   {
                ev.then(resolve).catch(reject);
                return;
            }
            resolve(ev);
        }   catch(err)    {
            reject(err);
        }
    }).then(res => {
        let out;
        if(typeof res == 'object' && typeof res != 'string')  {
            out = require('util').inspect(res);
            if(typeof out == 'string' && out.length > 1900)   {
                out = res.toString();
            }
        }   else {
            out = res;
        }

        return msg.reply(input + ':white_check_mark: **Output:**\n```js\n' + out + '\n```');
    }).catch(err => {
        return msg.reply(input + ':x: **Error:**\n```js\n' + (err.message || err) + '\n```');
    });
};

exports.validator = msg => msg.author.id === '116690352584392704';