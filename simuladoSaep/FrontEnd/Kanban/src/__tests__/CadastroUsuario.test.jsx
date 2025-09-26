import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { CadUsuario } from '../Paginas/CadUsuario'
import { email } from 'zod';
//render: renderiza a minha tela
//screen: eu vejo os elementos que estão sendo exibidos
//fireEvent: simula o que usuário pode fazer em tela
//waitfor: espera o resultado do evento


describe("Cadastro de usuario", () =>{
    it("A tela é exibida", ()=>{
        render(<CadUsuario/>);

        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const botao = screen.getByRole("button", {name:/Cadastrar/});

        expect(nomeInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(botao).toBeTruthy();
    });
})