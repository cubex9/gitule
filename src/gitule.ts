export const GITULE : string = 'gitule';
export const CONFIG : string = 'gitule.def';
export const SHELL : string = 'gitule.shell';

export const DEFAULT_CONFIG = {
    commands : [
        {
            identifier: 'git.archive',
            description: 'git archive',
            command: 'C:\\Users\\cubex\\code\\git\\gitcopy.ps1 ${out}',
            workingDirectory: './',
            form: [
                {
                    variable: 'out',
                    question: 'Output directory',
                    default: '',
                    password: false,
                    defaultValuePath: false,
                    defaultValueFilename: false,
                    prefix: '-out '
                }
            ],
            showInConsole: true,
        }
    ]
};
