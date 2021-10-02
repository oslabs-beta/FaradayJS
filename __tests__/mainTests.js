const fs = require('fs');
const path = require('path');
const { OpenFolder } = require('../src/main');

const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');


const testJSFolder = path.resolve(__dirname, '../mockData/mockJSApp');

jest.mock('electron');


describe('main.ts function unit tests', () => {

    describe('OpenFolder', () => {

        it('calls mocked dialog function', () => {
            dialog.showOpenDialog.mockResolvedValue(testJSFolder);
            //console.log(dialog());
            OpenFolder();
            expect(dialog.mock.calls.length).toBe(1);
        });
    });
});
