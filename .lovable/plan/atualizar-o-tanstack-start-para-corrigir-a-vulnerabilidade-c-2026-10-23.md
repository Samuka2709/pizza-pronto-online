## Atualizar o TanStack Start para corrigir a vulnerabilidade (CVE-2026-102989)

O site usa hoje `@tanstack/react-start` 1.168.32, uma versão com uma falha de segurança conhecida. Vamos instalar a versão corrigida e publicar de novo, sem mexer no visual nem nas funções do site.

### Passos
1. Atualizar `@tanstack/react-start` para 1.168.60 ou mais nova, junto com `@tanstack/react-router` e `@tanstack/router-plugin` em versões compatíveis, para que continuem combinando.
2. Conferir se o site compila sem erros e se as 5 páginas abrem normalmente (Início, Cardápio, Nossa história, Pedir, Contato).
3. Rodar a verificação de dependências e confirmar que o alerta sumiu.
4. Depois disso, você publica de novo usando o botão Publicar.

### Fora do plano
- Não vamos ativar `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS=1`, porque essa opção publica o site ainda com a falha.
