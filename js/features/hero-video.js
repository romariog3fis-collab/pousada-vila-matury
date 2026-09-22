/**
 * Hero Background Video Controller
 * Pousada Vila Matury
 * Garante looping contínuo 100% autônomo, mudo (autoplay garantido)
 * e ausência total de barras de controle e títulos do YouTube.
 */
(function() {
  function setupHeroVideo() {
    const iframe = document.getElementById('heroBgVideo');
    if (!iframe) return;

    // 1. Carrega API oficial do YouTube se ainda não existir
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    let ytPlayer = null;

    function restartVideo(player) {
      if (!player) return;
      try {
        if (typeof player.seekTo === 'function') {
          player.seekTo(0, true);
        }
        if (typeof player.playVideo === 'function') {
          player.playVideo();
        }
      } catch (err) {
        // Fallback postMessage direto no iframe
        sendPostMessageCommand(iframe, 'seekTo', [0, true]);
        sendPostMessageCommand(iframe, 'playVideo', []);
      }
    }

    function sendPostMessageCommand(frame, func, args) {
      try {
        if (frame && frame.contentWindow) {
          frame.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: func,
            args: args || []
          }), '*');
        }
      } catch (_) {}
    }

    // Callback oficial da API do YouTube
    const existingOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      if (typeof existingOnReady === 'function') existingOnReady();

      try {
        ytPlayer = new window.YT.Player('heroBgVideo', {
          events: {
            onReady: function(event) {
              event.target.mute();
              event.target.playVideo();
            },
            onStateChange: function(event) {
              // Estado 0: Vídeo terminou (ENDED) -> loop imediato
              if (event.data === 0 || (window.YT && event.data === window.YT.PlayerState.ENDED)) {
                restartVideo(event.target);
              }
              // Se pausar inesperadamente, retoma
              if (window.YT && event.data === window.YT.PlayerState.PAUSED) {
                event.target.playVideo();
              }
            },
            onError: function() {
              // Em caso de erro, tenta reiniciar
              restartVideo(ytPlayer);
            }
          }
        });
      } catch (err) {
        console.warn('YouTube Player API fallback:', err);
      }
    };

    // 2. Fallback de listener postMessage nativo do YouTube Iframe
    window.addEventListener('message', function(event) {
      try {
        if (!event.data) return;
        let data = event.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (data.event === 'infoDelivery' && data.info) {
          // playerState 0 = ENDED
          if (data.info.playerState === 0) {
            sendPostMessageCommand(iframe, 'seekTo', [0, true]);
            sendPostMessageCommand(iframe, 'playVideo', []);
          }
        }
      } catch (_) {}
    });

    // 3. Heartbeat de segurança a cada 3 segundos: garante que nunca fique parado no final (0:21)
    setInterval(function() {
      if (ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
        const state = ytPlayer.getPlayerState();
        if (state === 0) { // ENDED
          restartVideo(ytPlayer);
        }
      } else {
        // Envia comando de play periódico caso a API não tenha conectado
        sendPostMessageCommand(iframe, 'playVideo', []);
      }
    }, 3000);

    // 4. Retoma reprodução ao focar na janela/aba
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        restartVideo(ytPlayer);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroVideo);
  } else {
    setupHeroVideo();
  }
})();
