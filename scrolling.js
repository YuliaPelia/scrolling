const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        // scrollTop - це та відстань яку ми вже прогортали і ми його не бачимо
        if(document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');

        }
    });

    // 1) Scrolling width requestAnimationFrame
    // шукаємо всі посилання (лінки) з #
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                // toBlock - верхня межа того елемента до якого будемо скролити
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if(start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
                    // r - к-сть px які необхідне прогорнути протягом цієї анімації
                    // ця операція що належить змінній r виконується для того щоб розуміти на скільки px потрібно просунути нашу анімацію та в яку сторону
                document.documentElement.scrollTo(0, r);

                if(r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    // 2) Pure JS scrolling
    // робимо лавний сткорл
    // const elem = document.documentElement,
    //       body = document.body;
    
    // // створюєм ф-цю яка буде підраховувати скільки треба прогортати і як це зробити
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(e) {
    //         let scrollTop = Math.round(body.scrollTop || elem.scrollTop);

    //         if(this.hash !== "") {
    //             e.preventDefault();
    //             // получаєм той елемент до якого ми будемо скролити (гортати) нашу сторінку
    //             let hashElement = document.querySelector(this.hash),
    //             // створ змінну яка буде визначати скільки ще треба прогортати до батька цього hash елемента
    //                  hashElementTop = 0;
                
    //             while(hashElement.offsetParent) {
    //                 // offsetTop - оприділяє скільки px залишилось до верхньої межі батьківського елемента від hash елемента
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // // from - звідки будемо починати 
    // // to - куда будемо йти
    // // hash - елемент до якого буде йти скролл
    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed; // швидкість скролу

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(body.scrollTop || elem.scrollTop);

    //         if(
    //             prevScrollTop === scrollTop || 
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             elem.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;
